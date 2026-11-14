'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { productPath } from '@/data/officialCatalog';
import { ProductVisual } from './ProductVisual';

const cartKey = 'lojanias-cart';
const usd = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', currencyDisplay: 'code' });

function priceInCents(price) {
  const amount = price?.match(/^(?:US\$|\$)?\s*(\d+)(?:[.,](\d{1,2}))?\s*(?:USD)?$/i);
  return amount ? Number(amount[1]) * 100 + Number((amount[2] || '').padEnd(2, '0')) : null;
}

function formatPrice(cents) {
  return usd.format(cents / 100);
}

export function useStoreCart(products) {
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(cartKey));
      setSaved(Array.isArray(stored) ? stored.filter((line) =>
        typeof line?.id === 'string' && typeof line.variant === 'string' &&
        Number.isSafeInteger(line.quantity) && line.quantity > 0
      ) : []);
    } catch {
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    if (saved === null) return;
    try {
      window.localStorage.setItem(cartKey, JSON.stringify(saved));
    } catch {
      // The cart still works for this visit when storage is unavailable.
    }
  }, [saved]);

  const lines = (saved || []).flatMap((line) => {
    const product = products.find(({ id }) => id === line.id);
    if (!product) return [];
    const price = line.variant
      ? product.variants?.find(([name]) => name === line.variant)?.[1]
      : product.price;
    const cents = priceInCents(price);
    return cents === null ? [] : [{ ...line, name: product.name, imageUrl: product.imageUrl, cents }];
  });

  function change(id, variant, delta) {
    setSaved((current) => {
      const lines = current || [];
      const matches = (line) => line.id === id && line.variant === variant;
      const existing = lines.find(matches);
      const quantity = (existing?.quantity || 0) + delta;
      if (quantity <= 0) return lines.filter((line) => !matches(line));
      if (!existing) return [...lines, { id, variant, quantity }];
      return lines.map((line) => matches(line) ? { ...line, quantity } : line);
    });
  }

  return {
    ready: saved !== null,
    lines,
    count: lines.reduce((sum, { quantity }) => sum + quantity, 0),
    change
  };
}

export function ProductDetails({ product, description, sizes, selectSize, add }) {
  const variants = product.variants || [];
  const [variant, setVariant] = useState(variants[0]?.[0] || '');
  const [quantity, setQuantity] = useState('1');
  const [added, setAdded] = useState(0);
  const price = variants.find(([name]) => name === variant)?.[1] || product.price;
  const cents = priceInCents(price);
  const specification = [sizes.length < 2 ? product.size : '', product.format, product.roast, product.method].filter(Boolean).join(' · ');

  function addToCart(event) {
    event.preventDefault();
    const units = Number(quantity);
    if (cents === null || !Number.isSafeInteger(units) || units < 1 || units > 999) return;
    add(product.id, variant, units);
    setAdded((previous) => previous + units);
  }

  return (
    <div className="sf-detail-layout">
      <ProductVisual product={product} />
      <div>
        <p className="sf-kicker">{product.category}</p>
        <h1>{product.name}</h1>
        <strong className="sf-detail-price">{price}</strong>
        <p>{description}</p>
        {specification && <p className="sf-detail-spec">{specification}</p>}
        <form className="sf-detail-form" onSubmit={addToCart}>
          {sizes.length > 1 && (
            <label>
              Gramaje
              <select value={product.id} onChange={(event) => selectSize(event.target.value)}>
                {sizes.map(({ id, size, price }) => (
                  <option key={id} value={id}>{size} · {price}</option>
                ))}
              </select>
            </label>
          )}
          {variants.length > 0 && (
            <label>
              Presentación
              <select value={variant} onChange={(event) => setVariant(event.target.value)}>
                {variants.map(([name, variantPrice]) => (
                  <option key={name} value={name}>{name} · {variantPrice}</option>
                ))}
              </select>
            </label>
          )}
          <label>
            {product.category === 'Servicios de tostaduría' ? 'Cantidad en libras' : 'Cantidad'}
            <input type="number" min="1" max="999" step="1" required value={quantity} onChange={(event) => setQuantity(event.target.value)} />
          </label>
          <button type="submit" className="sf-button sf-button-amber" disabled={cents === null}>Agregar al carrito</button>
        </form>
        <p className="sf-cart-status" role="status">{added > 0 && `Agregado al carrito (${added}).`}</p>
        {added > 0 && <Link href="/carrito" className="sf-text-link">Ver carrito <span aria-hidden="true">↗</span></Link>}
      </div>
    </div>
  );
}

export function CartContents({ cart }) {
  if (!cart.ready) return <p role="status">Cargando carrito…</p>;
  if (!cart.lines.length) {
    return (
      <div className="sf-cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Explora la colección y elige algo para tu próxima taza.</p>
        <Link href="/#coleccion" className="sf-button sf-button-amber">Ver catálogo <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  const subtotal = cart.lines.reduce((sum, line) => sum + line.cents * line.quantity, 0);
  return (
    <div className="sf-cart-layout">
      <ul className="sf-cart-lines" aria-label="Productos en tu carrito">
        {cart.lines.map(({ id, variant, name, imageUrl, cents, quantity }) => {
          const label = [name, variant].filter(Boolean).join(' · ');
          return (
            <li key={JSON.stringify([id, variant])}>
              <Link href={productPath(id)} className="sf-cart-item">
                {imageUrl && <img src={imageUrl} alt="" width="76" height="76" />}
                <span><strong>{name}</strong>{variant && <small>{variant}</small>}<small>{formatPrice(cents)} por unidad</small></span>
              </Link>
              <div className="sf-cart-quantity">
                <button type="button" aria-label={quantity === 1 ? `Quitar ${label}` : `Reducir cantidad de ${label}`}
                  onClick={() => cart.change(id, variant, -1)}>−</button>
                <span>{quantity}</span>
                <button type="button" aria-label={`Aumentar cantidad de ${label}`}
                  onClick={() => cart.change(id, variant, 1)}>+</button>
              </div>
              <strong className="sf-cart-line-total">{formatPrice(cents * quantity)}</strong>
            </li>
          );
        })}
      </ul>
      <section className="sf-cart-summary" aria-labelledby="titulo-resumen">
        <h2 id="titulo-resumen">Resumen</h2>
        <p className="sf-cart-subtotal" aria-live="polite"><strong>Subtotal</strong> <strong>{formatPrice(subtotal)}</strong></p>
        <Link href="/#coleccion" className="sf-text-link">Seguir comprando <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
