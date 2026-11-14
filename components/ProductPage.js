'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StoreHeader } from './StoreHeader';
import { ProductDetails, useStoreCart } from './StoreShopping';
import { productDescription } from '@/lib/editor-fields';
import { coffeePresentations, productPath } from '@/data/officialCatalog';
import './storefront.css';

export function ProductPage({ id, content }) {
  const router = useRouter();
  const { brand, featuredProducts } = content;
  const product = featuredProducts.find((item) => item.id === id);
  const cart = useStoreCart(featuredProducts);
  const isCoffee = ['Café Lojanías', 'Cafe de altura'].includes(product?.category);
  const sizes = isCoffee ? coffeePresentations(product, featuredProducts) : [];

  return (
    <div className="storefront sf-product-page">
      <a className="sf-skip" href="#ficha-producto">Saltar al contenido</a>
      <StoreHeader brand={brand} count={cart.count} />
      <main className="sf-width sf-section" id="ficha-producto">
        <Link className="sf-text-link sf-back-to-catalog" href="/#coleccion">← Volver al catálogo</Link>
        {product ? (
          <ProductDetails
            key={product.id}
            product={product}
            description={productDescription(product)}
            sizes={sizes}
            selectSize={(id) => router.replace(productPath(id), { scroll: false })}
            add={cart.change}
          />
        ) : <h1>Producto no encontrado</h1>}
      </main>
    </div>
  );
}
