'use client';

import Link from 'next/link';
import { StoreHeader } from './StoreHeader';
import { CartContents, useStoreCart } from './StoreShopping';
import './storefront.css';

export function CartPage({ content }) {
  const cart = useStoreCart(content.featuredProducts);

  return (
    <div className="storefront sf-cart-page">
      <a className="sf-skip" href="#contenido-carrito">Saltar al contenido</a>
      <StoreHeader brand={content.brand} count={cart.count} onCart />
      <main id="contenido-carrito" className="sf-width sf-section">
        <Link className="sf-text-link sf-back-to-catalog" href="/#coleccion">← Volver al catálogo</Link>
        <header className="sf-cart-heading">
          <p className="sf-kicker">Tienda Lojanías</p>
          <h1>Tu carrito</h1>
        </header>
        <CartContents cart={cart} />
      </main>
    </div>
  );
}
