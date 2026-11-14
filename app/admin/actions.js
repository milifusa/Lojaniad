'use server';

import { randomBytes } from 'node:crypto';
import { BlobPreconditionFailedError, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import sharp from 'sharp';
import { hasAdminSession, signIn, signOut } from '@/lib/admin-session';
import { adminProductPath, homeFields, imageTypes, maxDescriptionLength, maxImageBytes, parseEditorPrice } from '@/lib/editor-fields';
import { readEdits, writeEdits } from '@/lib/published-content';
import { catalogCategories, officialProducts, productPath } from '@/data/officialCatalog';

export async function login(_previous, form) {
  if (!await signIn(form.get('password'))) return { error: 'La clave de acceso no es válida.' };
  redirect('/admin');
}

export async function logout() {
  await signOut();
  redirect('/admin');
}

const expired = { error: 'Tu sesión terminó. Vuelve a ingresar para publicar.' };

function saveError(error) {
  if (error instanceof BlobPreconditionFailedError) {
    return { error: 'Se publicó otro cambio al mismo tiempo. Intenta de nuevo.' };
  }
  console.error('No se pudo publicar:', error.name);
  return { error: 'No se pudo publicar. Intenta de nuevo en un momento.' };
}

function refresh(path) {
  revalidatePath('/');
  if (path) {
    revalidatePath(path);
    revalidatePath('/carrito');
  }
  revalidatePath('/admin');
}

export async function saveHome(_previous, form) {
  if (!await hasAdminSession()) return expired;
  const home = {};
  for (const [key, label, limit] of homeFields) {
    const value = form.get(key);
    if (typeof value !== 'string' || !value.trim() || value.length > limit) {
      return { error: `Revisa el campo «${label}».` };
    }
    home[key] = value.trim();
  }
  if (!/^\+[1-9][\d\s().-]{6,34}$/.test(home['footer.phone']) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(home['footer.email'])) {
    return { error: 'Revisa el correo y escribe el teléfono con su código de país (por ejemplo, +593).' };
  }
  try {
    const { edits, etag } = await readEdits();
    await writeEdits({ ...edits, home }, etag);
    refresh();
    return { success: 'Los textos ya están publicados en la página de inicio.' };
  } catch (error) {
    return saveError(error);
  }
}

export async function saveProduct(_previous, form) {
  if (!await hasAdminSession()) return expired;
  const id = form.get('product');
  const product = officialProducts.find((entry) => entry.id === id);
  const description = form.get('description');
  if (!product || typeof description !== 'string' || !description.trim() ||
      description.length > maxDescriptionLength) {
    return { error: 'Selecciona un producto y escribe una descripción válida.' };
  }

  const name = form.get('name');
  const category = form.get('category');
  const size = form.get('size');
  if (typeof name !== 'string' || !name.trim() || name.length > 120 ||
      !catalogCategories.some((entry) => entry.name === category) ||
      typeof size !== 'string' || size.length > 40 || (product.size && !size.trim())) {
    return { error: 'Revisa el nombre, la categoría y el tamaño del producto.' };
  }

  const variants = product.variants.map(([label], index) => [label, parseEditorPrice(form.get(`variant-${index}`))]);
  const price = variants.length ? variants[0][1] : parseEditorPrice(form.get('price'));
  if (price === null || variants.some(([, amount]) => amount === null)) {
    return { error: 'Ingresa los precios en dólares con hasta dos decimales.' };
  }

  const file = form.get('photo');
  let photo;
  if (file instanceof File && file.size) {
    if (!imageTypes.includes(file.type) || file.size > maxImageBytes) {
      return { error: 'Elige una foto JPG, PNG o WebP de hasta 3 MB.' };
    }
    try {
      const source = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 25000000 });
      const { format } = await source.metadata();
      if (!['jpeg', 'png', 'webp'].includes(format)) throw new Error('Unsupported image format');
      photo = await source.rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 }).toBuffer();
    } catch {
      return { error: 'No pudimos abrir esa imagen. Prueba con otra foto de hasta 25 megapíxeles.' };
    }
  }

  try {
    const { edits, etag } = await readEdits();
    let image = form.get('restorePhoto') ? null : edits.products[id]?.image ?? null;
    if (photo) {
      image = `${randomBytes(16).toString('hex')}.webp`;
      await put(`product-images/${image}`, photo, { access: 'private', contentType: 'image/webp' });
    }
    const changes = { name: name.trim(), category, size: size.trim(), price, variants, description: description.trim(), image };
    const next = { ...edits, products: { ...edits.products, [id]: changes } };
    await writeEdits(next, etag);
    refresh(productPath(id));
    revalidatePath(adminProductPath(id));
    return { success: 'Los cambios ya están publicados en el producto.' };
  } catch (error) {
    return saveError(error);
  }
}
