import { getPublishedContent } from '@/lib/published-content';
import { ProductPage } from '@/components/ProductPage';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { featuredProducts } = await getPublishedContent();
  const product = featuredProducts.find((item) => item.id === id);
  return { title: product ? `${product.name} | Lojanías` : 'Producto | Lojanías' };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductPage id={id} content={await getPublishedContent()} />;
}
