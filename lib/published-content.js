import 'server-only';
import { get, put } from '@vercel/blob';
import { connection } from 'next/server';
import { cache } from 'react';
import { defaultContent } from '@/data/defaultContent';

const pathname = 'editor/content-v1.json';
const empty = () => ({ home: {}, products: {} });

export async function readEdits() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Missing content storage');
  // Compressed responses carry a weak ETag that conditional writes reject.
  const result = await get(pathname, {
    access: 'private',
    useCache: false,
    headers: { 'Accept-Encoding': 'identity' }
  });
  if (!result) return { edits: empty(), etag: null };
  const edits = await new Response(result.stream).json();
  return { edits, etag: result.blob.etag };
}

export async function writeEdits(edits, etag) {
  return put(pathname, JSON.stringify(edits), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: Boolean(etag),
    ...(etag ? { ifMatch: etag } : {})
  });
}

export function applyEdits(edits) {
  const h = edits.home;
  const base = defaultContent;
  return {
    ...base,
    hero: {
      ...base.hero, title: h['hero.title'] ?? base.hero.title,
      description: h['hero.description'] ?? base.hero.description
    },
    story: {
      ...base.story, title: h['story.title'] ?? base.story.title,
      paragraphs: [h['story.first'] ?? base.story.paragraphs[0], h['story.second'] ?? base.story.paragraphs[1]]
    },
    finalCta: {
      ...base.finalCta, title: h['finalCta.title'] ?? base.finalCta.title,
      description: h['finalCta.description'] ?? base.finalCta.description
    },
    footer: {
      ...base.footer, phone: h['footer.phone'] ?? base.footer.phone,
      email: h['footer.email'] ?? base.footer.email
    },
    featuredProducts: base.featuredProducts.map((product) => {
      const edit = edits.products[product.id];
      if (!edit) return product;
      return {
        ...product,
        name: edit.name ?? product.name,
        category: edit.category ?? product.category,
        size: edit.size ?? product.size,
        price: edit.price ?? product.price,
        variants: edit.variants ?? product.variants,
        publishedDescription: edit.description,
        imageUrl: edit.image ? `/fotos-productos/${edit.image}` : product.imageUrl
      };
    })
  };
}

// Share the catalog read within a request, including the page and its metadata.
export const getPublishedContent = cache(async () => {
  await connection();
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultContent;
  const { edits } = await readEdits();
  return applyEdits(edits);
});
