'use client';

function CoffeeBag({ variant }) {
  return (
    <div className={`bag bag-${variant}`} aria-hidden="true">
      <div className="bag-zip" />
      <div className="bag-valve" />
      <div className="bag-label">
        <span>Lojanias</span>
        <strong>CAFE DE ALTURA</strong>
      </div>
    </div>
  );
}

function Jar() {
  return (
    <div className="jar" aria-hidden="true">
      <div className="jar-lid" />
      <div className="jar-label">
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
    <div className="product-visual">
      {product.imageStyle === 'dark-bag' ? <CoffeeBag variant="dark" /> : null}
      {product.imageStyle === 'kraft-bag' ? <CoffeeBag variant="kraft" /> : null}
      {product.imageStyle === 'coconut-jar' ? <Jar /> : null}
    </div>
  );
}
