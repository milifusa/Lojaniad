'use client';

import { useEffect, useRef, useState } from 'react';

const modelSrc = '/editorial/lojanias-texturas-realistas.glb';
const posterSrc = '/editorial/lojanias-texturas-realistas.webp';
const productAlt = 'Funda de café Lojanías de 400 g junto a una taza de vidrio con espresso';

export function HeroScene({ children, footer }) {
  const canvas = useRef(null);
  const product = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let dispose;

    import('@/lib/hero-scene').then(({ mountHeroScene }) => {
      if (cancelled) return;
      dispose = mountHeroScene(canvas.current, product.current, modelSrc, setReady);
    }).catch(() => {
      // Keep the product and finca photos visible if WebGL is unavailable.
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <>
      <div className="sf-hero-landscape" aria-hidden="true">
        <img src="/editorial/finca-cafetera.webp" alt="" fetchPriority="high" />
        <canvas ref={canvas} className="sf-hero-canvas" data-ready={ready} />
      </div>
      <div className="sf-width sf-hero-stage">
        {children}
        <figure
          ref={product}
          className="sf-hero-product"
          data-ready={ready}
          tabIndex={ready ? 0 : undefined}
          aria-label={ready ? productAlt + '. Arrastra o usa las flechas para girar la escena.' : undefined}
        >
          <img src={posterSrc} alt={ready ? '' : productAlt} fetchPriority="high" />
        </figure>
        {footer}
      </div>
    </>
  );
}
