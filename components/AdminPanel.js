'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getDefaultContent, mergeWithDefaults, STORAGE_KEY } from '@/lib/content-store';

function TextField({ label, value, onChange, multiline = false }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={onChange} rows={4} />
      ) : (
        <input value={value} onChange={onChange} />
      )}
    </label>
  );
}

export function AdminPanel() {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') {
      return getDefaultContent();
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultContent();
    }

    try {
      return mergeWithDefaults(JSON.parse(stored));
    } catch {
      return getDefaultContent();
    }
  }, []);

  const [content, setContent] = useState(initial);
  const [message, setMessage] = useState('');

  const updateValue = (path, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      let target = next;
      for (let index = 0; index < path.length - 1; index += 1) {
        target = target[path[index]];
      }
      target[path[path.length - 1]] = value;
      return next;
    });
  };

  const updateProduct = (productIndex, key, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      next.featuredProducts[productIndex][key] = value;
      return next;
    });
  };

  const updateTestimonial = (testimonialIndex, key, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      next.testimonials[testimonialIndex][key] = value;
      return next;
    });
  };

  const save = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setMessage('Cambios guardados en este navegador.');
  };

  const reset = () => {
    const defaults = getDefaultContent();
    setContent(defaults);
    window.localStorage.removeItem(STORAGE_KEY);
    setMessage('Contenido restaurado a valores base.');
  };

  return (
    <div className="admin-root">
      <div className="admin-topbar">
        <div>
          <p>Panel administrador</p>
          <h1>Editar homepage y catalogo</h1>
        </div>
        <div className="admin-actions sticky-actions">
          <Link className="button button-secondary dark" href="/">Volver al sitio</Link>
          <button className="button button-secondary dark" onClick={reset} type="button">Restaurar</button>
          <button className="button button-primary" onClick={save} type="button">Guardar cambios</button>
        </div>
      </div>

      {message ? <p className="admin-message">{message}</p> : null}

      <section className="admin-section">
        <h2>Marca y hero</h2>
        <div className="admin-grid two-up">
          <TextField label="Nombre de marca" value={content.brand.name} onChange={(event) => updateValue(['brand', 'name'], event.target.value)} />
          <TextField label="Tagline" value={content.brand.tagline} onChange={(event) => updateValue(['brand', 'tagline'], event.target.value)} />
          <TextField label="Titulo hero" value={content.hero.title} onChange={(event) => updateValue(['hero', 'title'], event.target.value)} multiline />
          <TextField label="Descripcion hero" value={content.hero.description} onChange={(event) => updateValue(['hero', 'description'], event.target.value)} multiline />
          <TextField label="CTA principal" value={content.brand.ctaLabel} onChange={(event) => updateValue(['brand', 'ctaLabel'], event.target.value)} />
          <TextField label="CTA secundario" value={content.brand.secondaryCtaLabel} onChange={(event) => updateValue(['brand', 'secondaryCtaLabel'], event.target.value)} />
        </div>
      </section>

      <section className="admin-section">
        <h2>Productos destacados</h2>
        <div className="admin-stack">
          {content.featuredProducts.map((product, index) => (
            <div key={product.id} className="admin-card">
              <h3>{product.name}</h3>
              <div className="admin-grid three-up">
                <TextField label="Nombre" value={product.name} onChange={(event) => updateProduct(index, 'name', event.target.value)} />
                <TextField label="Categoria" value={product.category} onChange={(event) => updateProduct(index, 'category', event.target.value)} />
                <TextField label="Precio" value={product.price} onChange={(event) => updateProduct(index, 'price', event.target.value)} />
                <TextField label="Formato" value={product.format} onChange={(event) => updateProduct(index, 'format', event.target.value)} />
                <TextField label="Tamano" value={product.size} onChange={(event) => updateProduct(index, 'size', event.target.value)} />
                <TextField label="Badge" value={product.badge} onChange={(event) => updateProduct(index, 'badge', event.target.value)} />
                <TextField label="Notas" value={product.notes} onChange={(event) => updateProduct(index, 'notes', event.target.value)} multiline />
                <TextField label="Metodo sugerido" value={product.method} onChange={(event) => updateProduct(index, 'method', event.target.value)} />
                <TextField label="URL de imagen" value={product.imageUrl || ''} onChange={(event) => updateProduct(index, 'imageUrl', event.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Historia, testimonios y contacto</h2>
        <div className="admin-grid two-up">
          <TextField label="Titulo historia" value={content.story.title} onChange={(event) => updateValue(['story', 'title'], event.target.value)} multiline />
          <TextField label="Texto historia 1" value={content.story.paragraphs[0]} onChange={(event) => updateValue(['story', 'paragraphs', 0], event.target.value)} multiline />
          <TextField label="Texto historia 2" value={content.story.paragraphs[1]} onChange={(event) => updateValue(['story', 'paragraphs', 1], event.target.value)} multiline />
          <TextField label="Telefono" value={content.footer.phone} onChange={(event) => updateValue(['footer', 'phone'], event.target.value)} />
          <TextField label="Email" value={content.footer.email} onChange={(event) => updateValue(['footer', 'email'], event.target.value)} />
          <TextField label="Instagram" value={content.footer.instagram} onChange={(event) => updateValue(['footer', 'instagram'], event.target.value)} />
        </div>
        <div className="admin-stack compact">
          {content.testimonials.map((testimonial, index) => (
            <div className="admin-card" key={testimonial.name + index}>
              <div className="admin-grid three-up">
                <TextField label="Nombre" value={testimonial.name} onChange={(event) => updateTestimonial(index, 'name', event.target.value)} />
                <TextField label="Rol" value={testimonial.role} onChange={(event) => updateTestimonial(index, 'role', event.target.value)} />
                <TextField label="Calificacion" value={String(testimonial.rating)} onChange={(event) => updateTestimonial(index, 'rating', Number(event.target.value || 0))} />
                <TextField label="Testimonio" value={testimonial.quote} onChange={(event) => updateTestimonial(index, 'quote', event.target.value)} multiline />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Quiz interactivo y CTA final</h2>
        <div className="admin-grid two-up">
          <TextField label="Titulo quiz" value={content.quiz.title} onChange={(event) => updateValue(['quiz', 'title'], event.target.value)} />
          <TextField label="Descripcion quiz" value={content.quiz.description} onChange={(event) => updateValue(['quiz', 'description'], event.target.value)} multiline />
          <TextField label="Titulo CTA final" value={content.finalCta.title} onChange={(event) => updateValue(['finalCta', 'title'], event.target.value)} multiline />
          <TextField label="Descripcion CTA final" value={content.finalCta.description} onChange={(event) => updateValue(['finalCta', 'description'], event.target.value)} multiline />
        </div>
      </section>
    </div>
  );
}
