import Link from 'next/link';

const mainLinks = [
  ['Inicio', '#inicio'],
  ['Catálogo', '#coleccion'],
  ['Contacto', '#contacto'],
  ['Blog', '#blog'],
  ['Menú Cafetería', '#menu-cafeteria'],
  ['Empresas y eventos', '#empresas-y-eventos']
];
export function StoreHeader({ brand, count, onHome = false, onCart = false }) {
  return (
    <header className="sf-header">
      <div className="sf-width sf-header-inner">
        <a href={onHome ? '#inicio' : '/'} className="sf-logo">
          <img src="/brand/lojanias-wordmark-hero-cream.png" alt={brand.name} width="926" height="252" />
        </a>
        <nav className="sf-main-nav" aria-label="Navegación principal">
          {mainLinks.map(([label, hash]) => onHome ? (
            <a key={hash} href={hash}>{label}</a>
          ) : (
            <Link key={hash} href={`/${hash}`}>{label}</Link>
          ))}
        </nav>
        <nav className="sf-store-nav" aria-label="Accesos a la tienda">
          {onHome ? <a href="#buscar">Buscar</a> : <Link href="/#buscar">Buscar</Link>}
          <Link href="/admin" prefetch={false}>Cuenta</Link>
          <Link href="/carrito" aria-current={onCart ? 'page' : undefined}>
            Carrito{count > 0 && ` (${count})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}
