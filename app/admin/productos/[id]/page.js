import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ProductEditor } from '@/components/AdminPanel';
import { officialProducts } from '@/data/officialCatalog';
import { hasAdminSession } from '@/lib/admin-session';
import { applyEdits, readEdits } from '@/lib/published-content';
import '../../editor.css';

export const metadata = {
  title: 'Editar producto | Lojanías',
  robots: { index: false, follow: false }
};

export default async function EditProductPage({ params }) {
  if (!await hasAdminSession()) redirect('/admin');

  const { id } = await params;
  if (!officialProducts.some((product) => product.id === id)) notFound();

  let product;
  try {
    const { featuredProducts } = applyEdits((await readEdits()).edits);
    product = featuredProducts.find((entry) => entry.id === id);
  } catch (error) {
    console.error('No se pudo abrir el producto para edición:', error.name);
  }

  return (
    <main className="editor">
      <Link href="/admin#editor-products-title" className="editor-back">← Volver a productos</Link>
      <header className="editor-header">
        <div>
          <p className="editor-kicker">Editar producto</p>
          <h1>{product?.name ?? 'Producto'}</h1>
        </div>
      </header>
      {product ? <ProductEditor key={product.id} product={product} /> : (
        <p role="alert" className="editor-notice">El producto no está disponible. Vuelve a cargar la página para intentarlo de nuevo.</p>
      )}
    </main>
  );
}
