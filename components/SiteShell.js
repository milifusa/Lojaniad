'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getDefaultContent } from '@/lib/content-store';
import { ProductVisual } from '@/components/ProductVisual';
import { ProductLoading } from '@/components/ProductLoading';
import { HeroScene } from '@/components/HeroScene';
import { StoreHeader } from '@/components/StoreHeader';
import { useStoreCart } from '@/components/StoreShopping';
import { cafeMenu } from '@/data/cafeMenu';
import { coffeeNotes } from '@/data/coffeeNotes';
import { catalogCategories, officialStore, productPath } from '@/data/officialCatalog';
import './storefront.css';

const initialContent = getDefaultContent();
const methodNotes = {
  V60: 'Una taza limpia y ligera que deja apreciar los matices del café.',
  Espresso: 'Una extracción corta que concentra el cuerpo y el sabor.',
  Prensa: 'Una preparación por inmersión que da una taza de textura amplia.',
  Moka: 'Una taza intensa que puedes preparar en la cocina de casa.'
};
const spotlightIds = ['cafe-gourmet-origen-400g', 'cafe-especial-250g', 'cafe-tradicional-200g'];
const experiences = [
  {
    title: 'Café para casa',
    text: 'Elige tu café de altura o encuentra un método para prepararlo a tu gusto.',
    image: '/editorial/cafeteria-lojanias.webp',
    href: '#cafes-destacados',
    action: 'Ver cafés'
  },
  {
    title: 'Una pausa en Loja',
    text: 'Pasa por nuestra cafetería para probar un filtrado, un espresso o algo de la cocina lojana.',
    image: '/editorial/pausa-en-loja.webp',
    portrait: true,
    imageAlt: 'Bolsa de café Lojanías frente a una torre en Loja',
    href: '#menu-cafeteria',
    action: 'Ver menú'
  },
  {
    title: 'Tostaduría y eventos',
    text: 'Tostamos café para productores y preparamos propuestas para negocios, catas y celebraciones.',
    image: '/editorial/tostadora.webp',
    href: '#empresas-y-eventos',
    action: 'Ver servicios'
  }
];
const storeBenefits = [
  'Tostado en origen',
  '100% Arábica de altura',
  'Seleccionado a mano',
  'Proceso artesanal familiar',
  'Envíos a todo el país'
];
const cafeAddress = 'Bernardo Valdivieso, entre Catacocha y Leopoldo Palacios, Loja.';
const cafeDirections = 'https://www.google.com/maps/search/?api=1&query=Bernardo+Valdivieso+Catacocha+Leopoldo+Palacios+Loja';

function getRecommendation(answers, products) {
  const coffees = products.filter((product) => ['Café Lojanías', 'Cafe de altura'].includes(product.category));
  const special = coffees.find((product) => product.id === 'cafe-especial-250g');
  const gourmet = coffees.find((product) => product.id === 'cafe-gourmet-origen-200g');
  if (answers.moment === 'Regalar o compartir') return gourmet || special || coffees[0];
  if (answers.taste === 'Intenso y profundo' || answers.method === 'Espresso o moka') {
    return special || gourmet || coffees[0];
  }
  return gourmet || special || coffees[0];
}

function searchableText(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es');
}

function comparePrice(first, second) {
  return Number(first.price.replace(/[^\d.]/g, '')) - Number(second.price.replace(/[^\d.]/g, ''));
}

function ProductCard({ product, id, onOpen }) {
  return (
    <article className="sf-product" id={id}>
      <div className="sf-product-image">
        <ProductVisual product={product} />
        {product.size && <span className="sf-product-size">{product.size}</span>}
      </div>
      <div className="sf-product-meta">
        <p className="sf-kicker">{product.category}</p>
        <h3>{product.name}</h3>
        {(product.publishedDescription || product.notes) && (
          <p className="sf-product-description">{product.publishedDescription || product.notes}</p>
        )}
        {(product.format || product.roast) && (
          <p className="sf-product-spec">{[product.format, product.roast].filter(Boolean).join(' · ')}</p>
        )}
        <div className="sf-product-buy">
          <strong>{product.price}</strong>
          <Link className="sf-text-link sf-product-trigger" aria-label={`Ver producto: ${product.name}`} href={productPath(product.id)} prefetch={false} onNavigate={(event) => onOpen(event, product.id)}>
            Ver producto <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SiteShell({ content }) {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('default');
  const [answers, setAnswers] = useState({});
  const [method, setMethod] = useState('');
  const [search, setSearch] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(null);

  function openProduct(event, id) {
    event.preventDefault();
    setLoadingProduct(productPath(id));
  }

  const { brand, hero, featuredProducts, story, sensory, quiz, footer, finalCta } = content;
  const cart = useStoreCart(featuredProducts);
  const spotlight = spotlightIds.map((id) => featuredProducts.find((product) => product.id === id)).filter(Boolean);
  const categories = [...new Set([...catalogCategories.map(({ name }) => name), ...featuredProducts.map(({ category }) => category)])];
  const searchTerms = searchableText(search.trim()).split(/\s+/).filter(Boolean);
  const products = featuredProducts.filter((product) => {
    if (category && product.category !== category) return false;
    if (!searchTerms.length) return true;
    const keywords = searchableText([product.name, product.category, product.size].join(' '));
    return searchTerms.every((term) => keywords.includes(term));
  });
  if (sort === 'name') products.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  if (sort === 'price-asc') products.sort(comparePrice);
  if (sort === 'price-desc') products.sort((a, b) => comparePrice(b, a));
  const activeMethod = method || sensory.methods[0];
  const recommended = getRecommendation(answers, featuredProducts);
  const phone = footer.phone.replace(/\D/g, '');
  const whatsapp = phone && phone !== '593990000000' ? `https://wa.me/${phone}` : '';
  const cafeOrder = whatsapp && `${whatsapp}?text=${encodeURIComponent('Hola, Lojanías. Quisiera hacer un pedido de la cafetería.')}`;
  const businessInquiry = whatsapp
    ? `${whatsapp}?text=${encodeURIComponent('Hola, Lojanías. Quisiera solicitar una propuesta para mi empresa o evento.')}`
    : `mailto:${footer.email}?subject=${encodeURIComponent('Consulta para empresas y eventos')}`;
  const testimonials = content.testimonials.filter((item) =>
    item.quote && !initialContent.testimonials.some((sample) => sample.quote === item.quote)
  );

  return (
    <div className="storefront">
      <a className="sf-skip" href="#inicio">Saltar al contenido</a>
      <StoreHeader brand={brand} count={cart.count} onHome />

      <main id="inicio">
        <section className="sf-hero" aria-labelledby="titulo-portada">
          <HeroScene footer={(
            <>
              <div className="sf-hero-reticle" aria-hidden="true"><i /><i /><i /></div>
              <div className="sf-hero-rail">
                <div className="sf-hero-index"><span aria-hidden="true">✦</span> <span>01 / Origen lojano</span></div>
                <div className="sf-hero-caption">
                  <strong>Café natural de altura · 400 g</strong>
                </div>
              </div>
            </>
          )}>
            <div className="sf-hero-copy">
              <p className="sf-kicker"><i aria-hidden="true" /> {brand.tagline}</p>
              <h1 id="titulo-portada">{hero.title}</h1>
              <p className="sf-hero-description">{hero.description}</p>
              <div className="sf-actions">
                <a className="sf-button sf-hero-button" href={brand.ctaHref}>{brand.ctaLabel} <span aria-hidden="true">↗</span></a>
                <a className="sf-text-link" href={brand.secondaryCtaHref}>{brand.secondaryCtaLabel} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </HeroScene>
        </section>

        {spotlight.length > 0 && (
          <section className="sf-width sf-section sf-spotlight" id="cafes-destacados" aria-labelledby="titulo-destacados">
            <div className="sf-section-heading">
              <div>
                <p className="sf-kicker">Tostado en origen</p>
                <h2 id="titulo-destacados">Best Sellers</h2>
              </div>
              <a className="sf-text-link" href="#coleccion">Ver todo el catálogo <span aria-hidden="true">↓</span></a>
            </div>
            <div className="sf-products">
              {spotlight.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} />)}
            </div>
          </section>
        )}

        <section className="sf-story sf-founder" id="historia" aria-labelledby="titulo-historia">
          <div className="sf-width sf-story-grid">
            <figure>
              <img src="/editorial/miguel-castillo.webp" alt="Miguel Castillo, fundador de Lojanías" loading="lazy" width="1000" height="1250" />
            </figure>
            <div>
              <p className="sf-kicker">Raíces en Quilanga</p>
              <h2 id="titulo-historia">{story.title}</h2>
              {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="sf-signature">{brand.owner} <span>·</span> {footer.address}</p>
            </div>
          </div>
        </section>

        <section className="sf-width sf-section sf-experiences" id="descubre-lojanias" aria-labelledby="titulo-experiencias">
          <div className="sf-section-heading">
            <div>
              <p className="sf-kicker">Tienda, cafetería y tostaduría</p>
              <h2 id="titulo-experiencias">Descubre Lojanías.</h2>
            </div>
          </div>
          <div className="sf-experience-grid">
            {experiences.map(({ title, text, image, imageAlt, portrait, href, action }) => (
              <article key={title} className="sf-experience-card">
                <img className={portrait ? 'sf-experience-portrait' : undefined} src={image} alt={imageAlt || ''} loading="lazy" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a className="sf-text-link" href={href}>{action} <span aria-hidden="true">↘</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sf-width sf-section sf-local-section" id="coleccion" aria-labelledby="titulo-coleccion">
          <div className="sf-section-heading">
            <div>
              <p className="sf-kicker">Compra por categoría</p>
              <h2 id="titulo-coleccion">La colección.</h2>
            </div>
          </div>
          <div className="sf-category-grid">
            {catalogCategories.map(({ name, image }) => (
              <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(category === name ? '' : name)}>
                <img src={officialStore + image} alt="" loading="lazy" />
                <span>{name} <span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
          <label className="sf-catalog-search">
            <span>Buscar en el catálogo</span>
            <input id="buscar" type="search" placeholder="Ej. café, moka o 400 g"
              value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <div className="sf-catalog-toolbar">
            <fieldset className="sf-filters">
              <legend>Filtros</legend>
              {['', ...categories].map((item) => (
                <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
                  {item || 'Todos'}
                </button>
              ))}
            </fieldset>
            <p className="sf-product-count" aria-live="polite">{products.length} {products.length === 1 ? 'artículo' : 'artículos'}</p>
            <label className="sf-sort">
              Ordenar
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="default">Orden del catálogo</option>
                <option value="name">Nombre: A a Z</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </label>
          </div>
          {!products.length && <p>No encontramos productos con esa búsqueda.</p>}
          <div className="sf-products">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} product={product} onOpen={openProduct} />
            ))}
          </div>
        </section>

        <section className="sf-width sf-section sf-brew" id="sensorial">
          <div>
            <p className="sf-kicker">03 / Preparación</p>
            <h2>{sensory.title}</h2>
            <p>{sensory.description}</p>
            <div className="sf-filters" role="group" aria-label="Método de preparación">
              {sensory.methods.map((item) => (
                <button key={item} type="button" aria-pressed={activeMethod === item} onClick={() => setMethod(item)}>{item}</button>
              ))}
            </div>
            <p className="sf-method-note" aria-live="polite">{methodNotes[activeMethod]}</p>
            <details className="sf-tips">
              <summary>Consejos para preparar tu café</summary>
              {content.brewTips.map((tip) => <p key={tip.title}><strong>{tip.title}.</strong> {tip.text}</p>)}
            </details>
          </div>
          {recommended && (
            <div className="sf-quiz">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              {quiz.questions.map((question) => (
                <label key={question.id}>
                  {question.label}
                  <select value={answers[question.id] || ''} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })}>
                    <option value="">Elige una opción</option>
                    {question.options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              ))}
              <div className="sf-result" aria-live="polite">
                <p className="sf-kicker">Tu recomendación</p>
                <strong>{recommended.name}</strong>
                <Link className="sf-text-link" href={productPath(recommended.id)} prefetch={false} onNavigate={(event) => openProduct(event, recommended.id)}>Ver café <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          )}
        </section>

        {testimonials.length > 0 && (
          <section className="sf-width sf-section" id="testimonios">
            <h2>Desde la mesa.</h2>
            <div className="sf-products">
              {testimonials.map((item) => (
                <blockquote key={item.name + item.role}>
                  <p>{item.quote}</p>
                  <footer>{item.name} · {item.role}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        <section className="sf-width sf-section sf-local-section" id="blog" aria-labelledby="titulo-blog" tabIndex={-1}>
          <div className="sf-section-heading">
            <div>
              <p className="sf-kicker">Noticias y guías</p>
              <h2 id="titulo-blog">Blog</h2>
            </div>
            <p>Historias de origen y consejos para preparar tu café.</p>
          </div>
          <div className="sf-local-grid">
            {coffeeNotes.map(({ title, text, link }) => (
              <details className="sf-local-detail" key={title}>
                <summary>{title}</summary>
                <p>{text}</p>
                {link && <a className="sf-text-link" href={link[1]}>{link[0]} <span aria-hidden="true">↓</span></a>}
              </details>
            ))}
          </div>
        </section>

        <section className="sf-width sf-section sf-local-section" id="menu-cafeteria" aria-labelledby="titulo-menu" tabIndex={-1}>
          <div className="sf-section-heading">
            <div>
              <p className="sf-kicker">Cafetería de especialidad · Loja</p>
              <h2 id="titulo-menu">Menú Cafetería</h2>
              <p className="sf-cafe-address">{cafeAddress}</p>
              <a className="sf-text-link" href={cafeDirections}>
                Cómo llegar <span aria-hidden="true">↗</span>
              </a>
            </div>
            {cafeOrder && <a className="sf-text-link" href={cafeOrder}>Pedir por WhatsApp <span aria-hidden="true">↗</span></a>}
          </div>
          <div className="sf-local-grid">
            {cafeMenu.map(({ name, items }, index) => (
              <details className="sf-local-detail" key={name} open={index === 0}>
                <summary>{name}</summary>
                <ul className="sf-menu-items">
                  {items.map(([item, price]) => (
                    <li key={item}><span>{item}</span><span>{price}</span></li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        <section className="sf-story" id="empresas-y-eventos" aria-labelledby="titulo-empresas" tabIndex={-1}>
          <div className="sf-width sf-story-grid">
            <figure>
              <img src="/editorial/tostadora.webp" alt="Tostadora y granos de café" loading="lazy" width="1600" height="900" />
            </figure>
            <div>
              <p className="sf-kicker">Tostaduría y pedidos al por mayor</p>
              <h2 id="titulo-empresas">Empresas y eventos</h2>
              <p>Café para oficinas, cafeterías y hoteles, además de regalos corporativos, catas y talleres para reuniones o celebraciones.</p>
              <p>Para productores ofrecemos trillado, tostado según el perfil del grano, molienda y empacado por peso.</p>
              <a className="sf-text-link" href={businessInquiry}>Solicitar una propuesta <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="sf-benefits">
          <div className="sf-width">
            <p className="sf-kicker">De Loja a tu mesa</p>
            <h2>¿Por qué elegir Lojanías?</h2>
            <ul>{storeBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
          </div>
        </section>

        <section className="sf-width sf-section sf-contact" id="contacto" aria-labelledby="titulo-contacto" tabIndex={-1}>
          <div className="sf-contact-grid">
            <div className="sf-contact-heading">
              <p className="sf-kicker">Lojanías · Loja, Ecuador</p>
              <h2 id="titulo-contacto">Ubicación y contacto</h2>
            </div>
            <div className="sf-contact-visit">
              <h3>Visita la cafetería</h3>
              <address>{cafeAddress}</address>
              <dl className="sf-contact-hours">
                <dt>Lunes a viernes</dt>
                <dd><span>09:00–12:00</span> y <span>16:00–21:00</span></dd>
                <dt>Sábados</dt>
                <dd>16:00–21:00</dd>
              </dl>
              <a className="sf-text-link" href={cafeDirections}>Cómo llegar en Google Maps <span aria-hidden="true">↗</span></a>
            </div>
            <img
              className="sf-contact-photo"
              src="/editorial/cafe-lojanias-contacto.webp"
              alt="Granos tostados y bolsas de café Lojanías"
              width="447"
              height="447"
              loading="lazy"
            />
            <div className="sf-contact-reach">
              <h3>{finalCta.title}</h3>
              <p>{finalCta.description}</p>
              <ul className="sf-contact-links">
                {whatsapp && <li><a className="sf-text-link" href={`tel:+${phone}`}>Llamar al {footer.phone}</a></li>}
                {footer.email && <li><a className="sf-text-link" href={`mailto:${footer.email}`}>{footer.email}</a></li>}
              </ul>
              {whatsapp && (
                <a className="sf-button sf-button-amber" href={whatsapp}>
                  {finalCta.secondaryLabel} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="sf-footer" id="cta-final">
          <div className="sf-width">
            <div className="sf-newsletter">
              <p>El café que se comparte, sabe mejor.</p>
              <a className="sf-text-link" href={officialStore + '/collections/all#footer-email'}>Registrarme al boletín <span aria-hidden="true">↗</span></a>
            </div>
            <footer className="sf-footer-meta">
              <span>{footer.legal}</span>
              <a href={officialStore + '/policies'}>Términos y políticas</a>
              <a href="https://www.facebook.com/share/1DCAyaMFq7">Facebook</a>
              <a href="https://www.instagram.com/lojanias">Instagram</a>
              <Link href="/admin">Administración</Link>
            </footer>
          </div>
        </section>
      </main>
      {loadingProduct && <ProductLoading href={loadingProduct} onCancel={() => setLoadingProduct(null)} />}
    </div>
  );
}
