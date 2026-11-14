import { get } from '@vercel/blob';

export async function GET(_request, { params }) {
  const { file } = await params;
  if (!/^[a-f0-9]{32}\.webp$/.test(file) || !process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(null, { status: 404 });
  }
  try {
    const result = await get(`product-images/${file}`, { access: 'private' });
    if (!result) return new Response(null, { status: 404 });
    return new Response(result.stream, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
