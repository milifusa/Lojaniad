'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const loadingDuration = 3000;

export function ProductLoading({ href, onCancel }) {
  const dialog = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const screen = dialog.current;
    screen.showModal();
    router.prefetch(href);
    const timer = window.setTimeout(() => router.push(href), loadingDuration);

    return () => {
      window.clearTimeout(timer);
      screen.close();
    };
  }, [href, router]);

  return (
    <dialog
      ref={dialog}
      className="sf-product-loading"
      aria-label="Cargando producto"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      <div className="sf-loading-center">
        <svg className="sf-loading-cup" viewBox="0 0 112 112" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="sf-loading-steam" d="M45 40c-9-9 9-12 0-22" />
          <path className="sf-loading-steam" d="M61 40c-9-9 9-12 0-22" />
          <path d="M26 52h53v12a25 25 0 0 1-25 25h-3a25 25 0 0 1-25-25V52Zm53 5h7a9 9 0 0 1 0 18H77M22 95h63" />
        </svg>
        <div className="sf-loading-beans" aria-hidden="true">
          {[0, 1, 2].map((bean) => (
            <svg key={bean} viewBox="0 0 16 20" fill="none">
              <ellipse cx="8" cy="10" rx="5.5" ry="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 3C4 8 12 11 7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ))}
        </div>
      </div>
    </dialog>
  );
}
