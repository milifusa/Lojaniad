export const officialStore = 'https://lojanias.com';

export function productPath(id) {
  return `/productos/${encodeURIComponent(id)}`;
}

const coffeeFamilies = [
  ['cafe-especial-250g', 'cafe-especial-400g'],
  ['cafe-gourmet-origen-200g', 'cafe-gourmet-origen-400g'],
  ['cafe-tradicional-200g', 'cafe-tradicional-400g']
];

export function coffeePresentations(product, products) {
  const family = coffeeFamilies.find((ids) => ids.includes(product.id));
  return family ? products.filter(({ id, size }) => family.includes(id) && size) : [];
}

const imageRoot = 'https://zsfzsvgnkrepnfiehfxu.supabase.co/storage/v1/object/public/catalog-media/products';

export const catalogCategories = [
  { name: 'Café Lojanías', image: '/images/cafe-gourmet-400g.png' },
  { name: 'Accesorios', image: '/images/aceite-coco.png' },
  { name: 'Servicios de tostaduría', image: '/images/servicios-tostaduria.jpg' }
];

const descriptions = {
  'aceite-de-coco': 'Aceite de coco en distintos tamaños. Elige una presentación para ver su precio.',
  cafe: 'Café de la colección Lojanías.',
  'cafe-400gr': 'Café Lojanías en bolsa de 400 g.',
  'cafe-lojanias-especial': 'Café de la línea Especial de Lojanías.',
  'cafe-molido-500gr': 'Café molido Lojanías en bolsa de 500 g.',
  'empacado-cafe-libra': 'Servicio de empacado de café por libra. El empaque se ajusta al peso solicitado.',
  'filtro-normal': 'Filtro para preparar café por goteo.',
  moka: 'Cafetera Moka para preparar café en la cocina.',
  'molido-cafe-libra': 'Molienda de café por libra. Puedes solicitar molienda fina o gruesa.',
  muchacho: 'Soporte tradicional lojano para colocar el filtro de tela o chucho sobre una taza o recipiente.',
  'prensa-francesa-1l': 'Prensa francesa de 1 litro para preparar café por inmersión.',
  'prensa-francesa-600ml': 'Prensa francesa de 600 ml para preparar café por inmersión.',
  'tostado-cafe-libra': 'Servicio de tostado por libra. Puedes solicitar un tueste bajo, medio o alto.',
  'trillado-cafe-libra': 'Servicio por libra para retirar el pergamino del grano de café.',
  'v60-hario': 'Accesorio Hario V60 para preparar café filtrado por vertido.'
};

const coconutSizes = [
  ['35 ml', '$2.25 USD'], ['125 ml', '$6.00 USD'], ['250 ml', '$9.00 USD'],
  ['700 ml', '$17.00 USD'], ['1000 ml', '$24.00 USD'], ['2000 ml', '$44.00 USD'],
  ['1 galón', '$75.00 USD'], ['4000 ml', '$82.00 USD']
];

export const officialProducts = [
  ["aceite-de-coco", "Aceite de Coco", "Accesorios", "$2.25 USD", "aceite-de-coco.png", ""],
  ["cafe", "Cafe", "Café Lojanías", "$2.50 USD", "cafe.png", ""],
  ["cafe-400gr", "Cafe 400gr", "Café Lojanías", "$10.00 USD", "cafe-400gr.png", "400 g"],
  ["cafe-especial-250g", "Café Especial de 250g", "Café Lojanías", "$3.00 USD", "cafe-especial-250g.webp", "250 g"],
  ["cafe-especial-400g", "Café Especial de 400g", "Café Lojanías", "$5.00 USD", "cafe-especial-400g.png", "400 g"],
  ["cafe-gourmet-origen-200g", "Café Gourmet de Origen 200g", "Café Lojanías", "$6.00 USD", "cafe-gourmet-origen-200g.png", "200 g"],
  ["cafe-gourmet-origen-400g", "Café Gourmet de Origen 400g", "Café Lojanías", "$11.00 USD", "cafe-gourmet-origen-400g.png", "400 g"],
  ["cafe-lojanias-especial", "Café Lojanías (Especial)", "Café Lojanías", "$7.50 USD", "cafe-lojanias-especial.png", ""],
  ["cafe-molido-500gr", "Café molido 500gr", "Café Lojanías", "$3.50 USD", "cafe-molido-500gr.png", "500 g"],
  ["cafe-tradicional-200g", "Café Tradicional de 200g", "Café Lojanías", "$1.75 USD", "cafe-tradicional-200g.png", "200 g"],
  ["cafe-tradicional-400g", "Café Tradicional de 400g", "Café Lojanías", "$3.50 USD", "cafe-tradicional-400g.png", "400 g"],
  ["empacado-cafe-libra", "Empacado de Café por libra", "Servicios de tostaduría", "$0.15 USD", "empacado-cafe-libra.png", ""],
  ["filtro-normal", "Filtro Normal", "Accesorios", "$3.00 USD", "filtro-normal.png", ""],
  ["moka", "Moka", "Accesorios", "$30.00 USD", "moka.png", ""],
  ["molido-cafe-libra", "Molido de Café por libra", "Servicios de tostaduría", "$0.05 USD", "molido-cafe-libra.png", ""],
  ["muchacho", "Muchacho", "Accesorios", "$25.00 USD", "muchacho.png", ""],
  ["prensa-francesa-1l", "Prensa Francesa 1 L", "Accesorios", "$14.00 USD", "prensa-francesa-1l.png", "1 L"],
  ["prensa-francesa-600ml", "Prensa Francesa 600 ml", "Accesorios", "$9.00 USD", "prensa-francesa-600ml.png", "600 ml"],
  ["tostado-cafe-libra", "Tostado de Café por libra", "Servicios de tostaduría", "$0.30 USD", "tostado-cafe-libra.png", ""],
  ["trillado-cafe-libra", "Trillado de Café por libra", "Servicios de tostaduría", "$0.08 USD", "trillado-cafe-libra.png", ""],
  ["v60-hario", "V60 Hario", "Accesorios", "$49.00 USD", "v60-hario.png", ""]
].map(([id, name, category, price, image, size]) => ({
  id, name, category, price, size,
  imageUrl: `${imageRoot}/${image}`,
  productUrl: `${officialStore}/products/${id}`,
  description: descriptions[id] || `${name}. Café de altura de Lojanías, seleccionado a mano y tostado en origen.`,
  variants: id === 'aceite-de-coco' ? coconutSizes : [],
  format: '',
  notes: '',
  method: '',
  badge: ''
}));
