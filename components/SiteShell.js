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
  const coffeeDark = products[0];
  const coffeeBalanced = products[1] || products[0];
  const coconut = products[2] || products[1] || products[0];

  if (answers.moment === 'Regalar o compartir') {
    return coffeeBalanced;
  }

  if (answers.taste === 'Intenso y profundo' || answers.method === 'Espresso o moka') {
    return coffeeDark;
  }

  if (answers.taste === 'Ligero y aromatico' || answers.method === 'Filtro o V60') {
    return coffeeBalanced;
  }

  if (answers.method === 'Quiero algo versatil') {
    return coffeeBalanced;
  }

  return coconut.category === 'Aceite de coco' && answers.taste === '' ? coffeeBalanced : coffeeBalanced;
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
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const recommendation = useMemo(
    () => getRecommendation(answers, content.featuredProducts),
    [answers, content.featuredProducts]
  );

  const methodsMap = {
    V60: 'Extrae una taza limpia y ordenada, ideal para un perfil balanceado y elegante.',
    Espresso: 'Concentra cuerpo y profundidad para quien quiere una experiencia mas intensa.',
    Prensa: 'Resalta textura y amplitud aromatica con una preparacion simple.',
    Moka: 'Aporta fuerza, estructura y un perfil persistente para la rutina diaria.'
  };

  const coffeeProducts = content.featuredProducts.filter((product) => product.category === 'Cafe de altura');
  const coconutProducts = content.featuredProducts.filter((product) => product.category === 'Aceite de coco');

  return (
    <div className="site-root">
      <header className="site-header site-header-home" data-reveal>
        <nav className="nav-side nav-left" aria-label="Principal izquierda">
          <a href="#inicio">Inicio</a>
          <a href="#historia">Lojanias</a>
          <a href="#sensorial">Perfil</a>
        </nav>
        <div className="header-brand-center">
          <span className="header-wordmark-text">Lojanias</span>
        </div>
        <nav className="nav-side nav-right" aria-label="Principal derecha">
          <a href="#coleccion">Tienda</a>
          <a href="#historia">Nuestras raices</a>
          <a href="#cta-final">Contacto</a>
          <a href="#coleccion" className="cart-link" aria-label="Carrito">🛒</a>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero-section hero-home" data-reveal>
          <div className="hero-image-overlay">
            <img className="hero-center-logo" src="/brand/logo-lojanias-transparent.png" alt="Logo Lojanias" />
            <span className="hero-wordmark-text">Lojanias</span>
            <p>CAFES EXTRAORDINARIOS. ORIGEN LOJANO.</p>
            <a className="hero-outline-cta" href="#coleccion">CONOCE NUESTROS CAFES</a>
          </div>
        </section>

        <section className="value-section" data-reveal>
          <div className="section-heading split compact">
            <div>
              <span className="eyebrow">Propuesta de valor</span>
              <h2>Elegancia visual, lectura rapida y foco real en producto.</h2>
            </div>
            <p>
              La pagina se reordena para sentirse mas premium: menos color, menos artificio, mas espacio, mejor jerarquia
              y una navegacion que prioriza colecciones, origen y conversion.
            </p>
          </div>
          <div className="value-grid four-up">
            {content.valueProps.map((item) => (
              <article key={item.title} className="value-card">
                <span>{item.stat}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="collection-section" id="coleccion">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">Colecciones</span>
            <h2>Productos separados por categoria para comprar sin friccion.</h2>
          </div>

          <div className="collection-grid">
            <article className="collection-card" data-reveal>
              <div className="collection-header">
                <span>Categoria principal</span>
                <h3>Cafe de altura</h3>
                <p>Presentaciones clasicas, premium y listas para consumo diario o regalo.</p>
              </div>
              <ul className="collection-list">
                <li>Bolsa negra premium 200 g</li>
                <li>Bolsa kraft clasica 200 g</li>
                <li>Presentaciones medianas y familiares</li>
                <li>Opciones para grano o molido segun disponibilidad</li>
              </ul>
            </article>

            <article className="collection-card" data-reveal>
              <div className="collection-header">
                <span>Categoria complementaria</span>
                <h3>Aceite de coco</h3>
                <p>Una linea natural en distintos tamanos para complementar la tienda.</p>
              </div>
              <ul className="collection-list">
                <li>Frasco pequeno</li>
                <li>Frasco mediano</li>
                <li>Frasco grande</li>
                <li>Formato familiar</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-heading split compact" data-reveal>
            <div>
              <span className="eyebrow">Destacados</span>
              <h2>La seleccion visible arriba del scroll importante.</h2>
            </div>
            <p>
              Esta zona sigue patrones de ecommerce que funcionan: card clara, informacion resumida, precio visible
              y CTA rapido sin distraer del producto.
            </p>
          </div>
          <div className="product-grid">
            {content.featuredProducts.map((product) => (
              <article key={product.id} className="product-card" data-reveal>
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
          <div className="sensory-panel" data-reveal>
            <div className="metric-panel">
              <h3>Lectura rapida del perfil</h3>
              <MetricBar label="Intensidad" value={4} />
              <MetricBar label="Acidez" value={3} />
              <MetricBar label="Cuerpo" value={4} />
            </div>
            <div className="brew-selector">
              <h3>Metodo recomendado</h3>
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
          <div className="story-copy" data-reveal>
            <span className="eyebrow">{content.story.eyebrow}</span>
            <h2>{content.story.title}</h2>
            {content.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="owner-signature">
              <span>Direccion de marca</span>
              <strong>{content.brand.owner}</strong>
            </div>
          </div>
          <div className="story-panel" data-reveal>
            <div className="story-facts">
              <div>
                <span>Ciudad</span>
                <strong>Loja</strong>
              </div>
              <div>
                <span>Pais</span>
                <strong>Ecuador</strong>
              </div>
              <div>
                <span>Marca</span>
                <strong>{content.brand.name}</strong>
              </div>
            </div>
            <p>
              El tono general del sitio busca que el visitante sienta origen, confianza y calidad antes de llegar al detalle de compra.
            </p>
          </div>
        </section>

        <section className="quiz-section" data-reveal>
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
              <a className="button button-primary" href="#coleccion">Ver producto</a>
            </div>
          </div>
        </section>

        <section className="testimonial-section" id="testimonios">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">Prueba social</span>
            <h2>Confianza y lectura inmediata de marca.</h2>
          </div>
          <div className="testimonial-grid">
            {content.testimonials.map((item) => (
              <article key={item.name + item.role} className="testimonial-card" data-reveal>
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
              <h2>Una guia corta para disfrutar mejor el producto.</h2>
            </div>
            <p>Consejos simples para elevar la taza sin sobrecargar al usuario con demasiada informacion.</p>
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

        <section className="final-cta" id="cta-final" data-reveal>
          <span className="eyebrow">Compra directa</span>
          <h2>{content.finalCta.title}</h2>
          <p>{content.finalCta.description}</p>
          <div className="hero-actions center">
            <a className="button button-primary" href="#coleccion">{content.finalCta.primaryLabel}</a>
            <a className="button button-secondary dark" href={`https://wa.me/${content.footer.phone.replace(/\D/g, '')}`}>
              {content.finalCta.secondaryLabel}
            </a>
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
