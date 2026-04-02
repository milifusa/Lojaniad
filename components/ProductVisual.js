'use client';

function CoffeeBag({ variant }) {
  return (
    <div className={`bag bag-${variant}`} aria-hidden="true">
      <div className="bag-top" />
      <div className="bag-dot" />
      <div className="bag-copy">
        <span>Lojanias</span>
        <strong>{variant === 'kraft' ? 'CAFE NATURAL' : 'CAFE ESPECIAL'}</strong>
      </div>
    </div>
  );
}

function Jar() {
  return (
    <div className="jar" aria-hidden="true">
      <div className="jar-lid" />
      <div className="jar-copy">
        <span>Lojanias</span>
        <strong>Aceite de coco</strong>
      </div>
    </div>
  );
}

export function ProductVisual({ product }) {
  if (product.imageUrl) {
    return (
      <div className="product-visual product-photo-wrap">
        <img className="product-photo" src={product.imageUrl} alt={product.name} />
      </div>
    );
  }

  return (
    <div className="product-visual fallback-visual">
      {product.imageStyle === 'dark-bag' ? <CoffeeBag variant="dark" /> : null}
      {product.imageStyle === 'kraft-bag' ? <CoffeeBag variant="kraft" /> : null}
      {product.imageStyle === 'coconut-jar' ? <Jar /> : null}
      <div className="visual-caption">Espacio listo para integrar la foto real del producto.</div>
    </div>
  );
}
