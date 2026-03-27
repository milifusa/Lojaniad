'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getDefaultContent, mergeWithDefaults, STORAGE_KEY } from '@/lib/content-store';
import { ProductVisual } from '@/components/ProductVisual';

const defaultAnswers = { taste: '', method: '', moment: '' };

function MetricBar({ label, value }) {
  return (
    <div className="metric-bar">
      <span>{label}</span>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <i key={index} className={index < value ? 'filled' : ''} />
        ))}
      </div>
    </div>
  );
}

function getRecommendation(answers, products) {
  const [intense, balanced, smooth] = products;

  if (answers.taste === 'Intenso y achocolatado' || answers.method === 'Espresso o moka') {
    return intense;
  }

  if (answers.taste === 'Suave y aromatico' || answers.method === 'Filtro o V60') {
    return balanced;
  }

  if (answers.moment === 'Regalar o compartir') {
    return smooth || balanced;
  }

  return balanced;
}

export function SiteShell() {
  const [content, setContent] = useState(() => getDefaultContent());
  const [answers, setAnswers] = useState(defaultAnswers);
  const [activeMethod, setActiveMethod] = useState('V60');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContent(mergeWithDefaults(JSON.parse(stored)));
      } catch {
        setContent(getDefaultContent());
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const recommendation = useMemo(
    () => getRecommendation(answers, content.featuredProducts),
    [answers, content.featuredProducts]
  );

  const methodsMap = {
    V60: 'Limpia la taza y resalta notas dulces y citricas con una extraccion precisa.',
    Espresso: 'Mayor intensidad, cuerpo redondo y final largo para quien busca profundidad.',
    Prensa: 'Textura amplia y una experiencia aromatica mas envolvente.',
    Moka: 'Perfil vibrante, persistente y perfecto para las primeras horas del dia.'
  };

  return (
    <div className="site-root">
      <header className="site-header">
        <div className="brand-lockup" data-reveal>
          <img className="brand-logo" src="/brand/logo-lojanias-white.png" alt="Logo Lojanias" />
          <div>
            <p>{content.brand.tagline}</p>
            <strong>{content.brand.name}</strong>
          </div>
        </div>
        <nav className="main-nav" aria-label="Principal">
          <a href="#coleccion">Tienda</a>
          <a href="#sensorial">Experiencia</a>
          <a href="#historia">Origen</a>
          <a href="#testimonios">Resenas</a>
          <Link href="/admin">{content.brand.adminLabel}</Link>
        </nav>
        <a className="nav-cta" href={content.brand.ctaHref}>{content.brand.ctaLabel}</a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p>{content.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={content.brand.ctaHref}>{content.brand.ctaLabel}</a>
              <a className="button button-secondary" href={content.brand.secondaryCtaHref}>{content.brand.secondaryCtaLabel}</a>
            </div>
            <div className="hero-metrics">
              {content.hero.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-stage" data-reveal>
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="stage-card stage-card-back" />
            <div className="stage-card stage-card-front">
              <div className="stage-bag dark" />
              <div className="stage-bag kraft" />
              <div className="stage-cup" />
            </div>
            <div className="stage-notes">
              <span>Notas</span>
              <strong>Cacao, panela, nuez</strong>
            </div>
          </div>
        </section>

        <section className="value-section" data-reveal>
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Propuesta de valor</span>
              <h2>Buenas practicas de ecommerce, narrativa de origen y compra clara.</h2>
            </div>
            <p>
              La estructura toma referencias de tiendas de cafe de especialidad y patrones Shopify: navegacion limpia,
              beneficios visibles, colecciones destacadas y bloques faciles de escanear para empujar exploracion y conversion.
            </p>
          </div>
          <div className="value-grid">
            {content.valueProps.map((item) => (
              <article key={item.title} className="value-card">
                <span>{item.stat}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="featured-section" id="coleccion">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">Coleccion destacada</span>
            <h2>Productos premium listos para comprar.</h2>
          </div>
          <div className="product-grid">
            {content.featuredProducts.map((product, index) => (
              <article key={product.id} className={`product-card premium-card tone-${index + 1}`} data-reveal>
                <div className="product-topline">
                  <span>{product.badge}</span>
                  <strong>{product.category}</strong>
                </div>
                <ProductVisual product={product} />
                <div className="product-body">
                  <h3>{product.name}</h3>
                  <p>{product.notes}</p>
                  <ul>
                    <li>{product.format}</li>
                    <li>{product.size}</li>
                    <li>{product.roast}</li>
                  </ul>
                </div>
                <div className="product-footer">
                  <strong>{product.price}</strong>
                  <div className="product-buttons">
                    <a className="button button-tertiary" href="#sensorial">Ver detalle</a>
                    <a className="button button-primary" href="#cta-final">Comprar</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sensory-section" id="sensorial">
          <div className="sensory-copy" data-reveal>
            <span className="eyebrow">Experiencia sensorial</span>
            <h2>{content.sensory.title}</h2>
            <p>{content.sensory.description}</p>
            <div className="note-cloud">
              {content.sensory.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
            <p className="roast-callout">{content.sensory.roastLabel}</p>
          </div>
          <div className="sensory-panel premium-card" data-reveal>
            <div className="metric-panel">
              <h3>Perfil del cafe insignia</h3>
              <MetricBar label="Intensidad" value={4} />
              <MetricBar label="Acidez" value={3} />
              <MetricBar label="Cuerpo" value={4} />
            </div>
            <div className="brew-selector">
              <h3>Metodo sugerido</h3>
              <div className="method-tabs">
                {content.sensory.methods.map((method) => (
                  <button
                    key={method}
                    className={activeMethod === method ? 'active' : ''}
                    onClick={() => setActiveMethod(method)}
                    type="button"
                  >
                    {method}
                  </button>
                ))}
              </div>
              <p>{methodsMap[activeMethod]}</p>
            </div>
          </div>
        </section>

        <section className="story-section" id="historia">
          <div className="story-visual" data-reveal>
            <div className="origin-map">
              <span>Loja</span>
              <strong>Andes del sur del Ecuador</strong>
              <p>Lotes de altura, trabajo en origen y una expresion elegante en taza.</p>
            </div>
          </div>
          <div className="story-copy" data-reveal>
            <span className="eyebrow">{content.story.eyebrow}</span>
            <h2>{content.story.title}</h2>
            {content.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="owner-signature">
              <span>Fundador</span>
              <strong>{content.brand.owner}</strong>
            </div>
          </div>
        </section>

        <section className="quiz-section premium-card" data-reveal>
          <div className="section-heading split compact">
            <div>
              <span className="eyebrow">Funcionalidad interactiva</span>
              <h2>{content.quiz.title}</h2>
            </div>
            <p>{content.quiz.description}</p>
          </div>
          <div className="quiz-grid">
            <div className="quiz-form">
              {content.quiz.questions.map((question) => (
                <label key={question.id}>
                  <span>{question.label}</span>
                  <select
                    value={answers[question.id]}
                    onChange={(event) =>
                      setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                    }
                  >
                    <option value="">Selecciona una opcion</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="quiz-result">
              <span>Recomendacion</span>
              <h3>{recommendation.name}</h3>
              <p>{recommendation.notes}</p>
              <div className="quiz-pills">
                <strong>{recommendation.format}</strong>
                <strong>{recommendation.size}</strong>
                <strong>{recommendation.method}</strong>
              </div>
              <a className="button button-primary" href="#coleccion">Ver este producto</a>
            </div>
          </div>
        </section>

        <section className="testimonial-section" id="testimonios">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">Prueba social</span>
            <h2>Confianza de compra respaldada por experiencia real.</h2>
          </div>
          <div className="testimonial-grid">
            {content.testimonials.map((item) => (
              <article key={item.name} className="testimonial-card" data-reveal>
                <div className="stars" aria-label={`${item.rating} de 5 estrellas`}>
                  {'★★★★★'.slice(0, item.rating)}
                </div>
                <p>{item.quote}</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="brew-section" data-reveal>
          <div className="section-heading split compact">
            <div>
              <span className="eyebrow">Preparacion</span>
              <h2>Como disfrutarlo mejor en casa o en tu espacio de trabajo.</h2>
            </div>
            <p>Consejos breves para elevar la experiencia sin volverla compleja.</p>
          </div>
          <div className="brew-grid">
            {content.brewTips.map((tip) => (
              <article key={tip.title} className="brew-card">
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta premium-card" id="cta-final" data-reveal>
          <span className="eyebrow">Compra directa</span>
          <h2>{content.finalCta.title}</h2>
          <p>{content.finalCta.description}</p>
          <div className="hero-actions center">
            <a className="button button-primary" href="#coleccion">{content.finalCta.primaryLabel}</a>
            <a className="button button-secondary dark" href={`https://wa.me/${content.footer.phone.replace(/\D/g, '')}`}>{content.finalCta.secondaryLabel}</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{content.brand.name}</strong>
          <p>{content.footer.legal}</p>
        </div>
        <div>
          <span>{content.footer.address}</span>
          <span>{content.footer.phone}</span>
          <span>{content.footer.email}</span>
        </div>
        <div>
          <span>{content.footer.instagram}</span>
          <Link href="/admin">Editar contenido</Link>
        </div>
      </footer>
    </div>
  );
}
