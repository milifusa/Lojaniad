import { CartPage } from '@/components/CartPage';
import { getPublishedContent } from '@/lib/published-content';

export const metadata = { title: 'Tu carrito | Lojanías' };

export default async function Page() {
  return <CartPage content={await getPublishedContent()} />;
}
