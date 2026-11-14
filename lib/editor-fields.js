export const maxImageBytes = 3 * 1024 * 1024;
export const maxDescriptionLength = 2000;
export const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const homeFields = [
  ['hero.title', 'Título de portada', 110],
  ['hero.description', 'Texto de portada', 450, 'textarea'],
  ['story.title', 'Título de nuestra historia', 110],
  ['story.first', 'Primer párrafo de la historia', 800, 'textarea'],
  ['story.second', 'Segundo párrafo de la historia', 800, 'textarea'],
  ['finalCta.title', 'Título del contacto', 110],
  ['finalCta.description', 'Texto del contacto', 450, 'textarea'],
  ['footer.phone', 'Teléfono con código de país', 35, 'tel'],
  ['footer.email', 'Correo de contacto', 180, 'email']
];

export function productDescription(product) {
  const isCoffee = ['Café Lojanías', 'Cafe de altura'].includes(product.category);
  return product.publishedDescription ?? (isCoffee ? 'Café de altura ;)' : product.notes || product.description || product.name);
}

export function adminProductPath(id) {
  return `/admin/productos/${encodeURIComponent(id)}`;
}

export function parseEditorPrice(value) {
  if (typeof value !== 'string') return null;
  const amount = value.trim().replace(',', '.');
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(amount)) return null;
  return `$${Number(amount).toFixed(2)} USD`;
}
