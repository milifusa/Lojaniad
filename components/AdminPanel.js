'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { login, saveHome, saveProduct } from '@/app/admin/actions';
import { adminProductPath, homeFields, imageTypes, maxDescriptionLength, maxImageBytes, productDescription } from '@/lib/editor-fields';
import { catalogCategories, productPath } from '@/data/officialCatalog';

function Feedback({ status }) {
  if (status?.error) return <p role="alert" className="editor-notice">{status.error}</p>;
  if (status?.success) return <p role="status" className="editor-notice editor-success">{status.success}</p>;
  return null;
}

export function AdminLogin() {
  const [status, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="editor-card editor-form">
      <p>Ingresa tu clave para editar y publicar cambios en la tienda.</p>
      <label className="editor-field">
        <span>Clave de acceso</span>
        <input name="password" type="password" autoComplete="current-password" required maxLength={128} />
      </label>
      <Feedback status={status} />
      <button type="submit" disabled={pending}>{pending ? 'Ingresando…' : 'Ingresar'}</button>
    </form>
  );
}

export function ProductEditor({ product }) {
  const [status, action, pending] = useActionState(saveProduct, null);
  const [fields, setFields] = useState({
    name: product.name,
    category: product.category,
    size: product.size,
    price: product.price.replace(/[^\d.]/g, ''),
    description: productDescription(product),
    ...Object.fromEntries(product.variants.map(([, price], index) => [`variant-${index}`, price.replace(/[^\d.]/g, '')]))
  });
  function field(name) {
    return {
      name,
      value: fields[name],
      onChange: (event) => setFields((current) => ({ ...current, [name]: event.target.value }))
    };
  }
  return (
    <div className="editor-card editor-product">
      <figure>
        <img src={product.imageUrl} alt={product.name} />
        <figcaption><Link href={productPath(product.id)}>Ver ficha publicada ↗</Link></figcaption>
      </figure>
      <form action={action} className="editor-form">
        <input type="hidden" name="product" value={product.id} />
        <label className="editor-field">
          <span>Nombre del producto</span>
          <input {...field('name')} maxLength={120} required />
        </label>
        <div className="editor-fields">
          <label className="editor-field">
            <span>Categoría</span>
            <select {...field('category')}>
              {catalogCategories.map(({ name }) => <option key={name}>{name}</option>)}
            </select>
          </label>
          <label className="editor-field">
            <span>Gramaje o tamaño</span>
            <input {...field('size')} maxLength={40} required={Boolean(product.size)} placeholder="Ej. 250 g" />
          </label>
        </div>
        {product.variants.length ? (
          <fieldset className="editor-variants">
            <legend>Precios por presentación (USD)</legend>
            <div className="editor-fields">
              {product.variants.map(([label], index) => (
                <label className="editor-field" key={label}>
                  <span>{label}</span>
                  <input {...field(`variant-${index}`)} inputMode="decimal" maxLength={9} required />
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <label className="editor-field">
            <span>Precio (USD)</span>
            <input {...field('price')} inputMode="decimal" maxLength={9} required />
          </label>
        )}
        <label className="editor-field">
          <span>Descripción</span>
          <textarea {...field('description')} rows={6} required maxLength={maxDescriptionLength} />
        </label>
        <label className="editor-field">
          <span>Reemplazar foto</span>
          <input name="photo" type="file" accept={imageTypes.join(',')} aria-describedby="photo-help"
            onChange={(event) => {
              const input = event.currentTarget;
              input.setCustomValidity(input.files[0]?.size > maxImageBytes ? 'Elige una foto de hasta 3 MB.' : '');
              if (!input.validity.valid) input.reportValidity();
            }} />
          <small id="photo-help">JPG, PNG o WebP · hasta 3 MB.</small>
        </label>
        {product.imageUrl.startsWith('/fotos-productos/') && (
          <label className="editor-check">
            <input type="checkbox" name="restorePhoto" /> Volver a la foto original
          </label>
        )}
        <Feedback status={status} />
        <button type="submit" disabled={pending}>{pending ? 'Publicando…' : 'Publicar producto'}</button>
      </form>
    </div>
  );
}

function HomeEditor({ content }) {
  const [status, action, pending] = useActionState(saveHome, null);
  const fieldValues = {
    'hero.title': content.hero.title, 'hero.description': content.hero.description,
    'story.title': content.story.title, 'story.first': content.story.paragraphs[0],
    'story.second': content.story.paragraphs[1],
    'finalCta.title': content.finalCta.title, 'finalCta.description': content.finalCta.description,
    'footer.phone': content.footer.phone, 'footer.email': content.footer.email
  };
  const [values, setValues] = useState(fieldValues);
  return (
    <form action={action} className="editor-form">
      <div className="editor-fields">
        {homeFields.map(([name, label, maxLength, type]) => {
          const attributes = { name, maxLength, required: true, value: values[name],
            onChange: (event) => setValues({ ...values, [name]: event.target.value }) };
          return (
            <label className="editor-field" key={name}>
              <span>{label}</span>
              {type === 'textarea' ? <textarea rows={3} {...attributes} /> : <input type={type || 'text'} {...attributes} />}
            </label>
          );
        })}
      </div>
      <Feedback status={status} />
      <button type="submit" disabled={pending}>{pending ? 'Publicando…' : 'Publicar textos'}</button>
    </form>
  );
}

export function AdminPanel({ content }) {
  const products = content.featuredProducts;

  return (
    <>
      <section className="editor-card editor-form" aria-labelledby="editor-products-title">
        <header className="editor-list-heading">
          <h2 id="editor-products-title">Productos</h2>
          <p>{products.length} {products.length === 1 ? 'producto' : 'productos'}</p>
        </header>
        <ul className="editor-list" role="list">
          {products.map(({ id, name, imageUrl, category, size, price }) => (
            <li key={id} className="editor-list-row">
              <img src={imageUrl} alt="" width="64" height="64" loading="lazy" />
              <div className="editor-list-product">
                <h3>{name}</h3>
                <p>{[category, size, price].filter(Boolean).join(' · ')}</p>
              </div>
              <Link className="editor-edit-link" href={adminProductPath(id)} prefetch={false}
                aria-label={`Editar ${name}`}>Editar</Link>
            </li>
          ))}
        </ul>
      </section>
      <details className="editor-card editor-home">
        <summary>Textos de inicio y contacto</summary>
        <HomeEditor content={content} />
      </details>
    </>
  );
}
