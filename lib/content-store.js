import { defaultContent } from '@/data/defaultContent';

export const STORAGE_KEY = 'lojanias-admin-content';

// Previous versions seeded three sample products. Keep edits to them as custom entries.
const legacyFields = ["name", "category", "price", "format", "size", "badge", "notes", "method", "imageUrl"];
const legacySamples = {
  'cafe-noir-200': ["Cafe Especial de Altura", "Cafe de altura", "$8.50", "Bolsa negra premium", "200 g", "Cafe insignia", "Perfil intenso, limpio y elegante con notas achocolatadas.", "Espresso, moka, prensa francesa", ""],
  'cafe-kraft-200': ["Cafe Natural de Altura", "Cafe de altura", "$7.90", "Bolsa kraft clasica", "200 g", "Origen Loja", "Dulzor balanceado, textura suave y final redondo.", "V60, Chemex, filtro", ""],
  'aceite-coco-500': ["Aceite de Coco", "Aceite de coco", "$12.00", "Frasco de vidrio", "500 ml", "Linea complementaria", "Textura sedosa, aroma natural y uso diario en cocina y bienestar.", "Cocina, reposteria, consumo diario", ""]
};

function isUneditedSample(product) {
  return legacySamples[product.id]?.every((value, index) => {
    const field = legacyFields[index];
    const savedValue = product[field] || '';
    return field === 'name' ? savedValue.replace('Café', 'Cafe') === value : savedValue === value;
  });
}

export function mergeWithDefaults(content) {
  const savedProducts = new Map((content?.featuredProducts || []).map((product) => [product.id, product]));
  const products = defaultContent.featuredProducts.map((product) => {
    const saved = savedProducts.get(product.id);
    savedProducts.delete(product.id);
    return { ...product, ...saved };
  });
  const customProducts = [...savedProducts.values()].filter((product) => !isUneditedSample(product));
  return {
    ...defaultContent,
    ...content,
    brand: { ...defaultContent.brand, ...(content?.brand || {}) },
    hero: { ...defaultContent.hero, ...(content?.hero || {}) },
    sensory: { ...defaultContent.sensory, ...(content?.sensory || {}) },
    story: { ...defaultContent.story, ...(content?.story || {}) },
    quiz: { ...defaultContent.quiz, ...(content?.quiz || {}) },
    finalCta: { ...defaultContent.finalCta, ...(content?.finalCta || {}) },
    footer: {
      ...defaultContent.footer,
      ...content?.footer,
      phone: content?.footer?.phone === '+593990000000' ? defaultContent.footer.phone : content?.footer?.phone ?? defaultContent.footer.phone
    },
    valueProps: content?.valueProps || defaultContent.valueProps,
    featuredProducts: [...products, ...customProducts],
    testimonials: content?.testimonials || defaultContent.testimonials,
    brewTips: content?.brewTips || defaultContent.brewTips
  };
}

export function getDefaultContent() {
  return defaultContent;
}
