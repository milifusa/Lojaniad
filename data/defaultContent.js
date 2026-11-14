import { officialProducts } from './officialCatalog';

export const defaultContent = {
  brand: {
    name: 'Lojanias',
    tagline: 'Café de altura · Loja, Ecuador',
    owner: 'Miguel Castillo',
    ctaLabel: 'Explorar la colección',
    ctaHref: '#coleccion',
    secondaryCtaLabel: 'Ver menú',
    secondaryCtaHref: '#menu-cafeteria',
    adminLabel: 'Admin'
  },
  hero: {
    eyebrow: 'Cafe de altura con presencia sobria y contemporanea',
    title: 'De las alturas de Loja a tu taza.',
    description:
      'Café arábica de altura, de selección manual y tueste local. Pruébalo en casa o visítanos en Loja.',
    metrics: [
      { label: 'Origen', value: 'Loja, Ecuador' },
      { label: 'Dueno', value: 'Miguel Castillo' },
      { label: 'Linea', value: 'Cafe y aceite de coco' }
    ]
  },
  valueProps: [
    {
      title: 'Origen de altura',
      text: 'Cafe trabajado en origen y presentado como producto de identidad lojana.',
      stat: 'Loja'
    },
    {
      title: 'Presentaciones claras',
      text: 'Formatos y tamanos visibles para facilitar la decision de compra.',
      stat: 'Compra simple'
    },
    {
      title: 'Estetica sobria',
      text: 'Una tienda visualmente limpia para resaltar calidad y confianza.',
      stat: 'Minimal premium'
    },
    {
      title: 'Navegacion directa',
      text: 'Hero, beneficios, colecciones, historia y CTA pensados para conversion.',
      stat: 'Ecommerce moderno'
    }
  ],
  featuredProducts: officialProducts,
  sensory: {
    title: 'Cada método, una taza distinta.',
    description:
      'Elige cómo preparas el café y descubre qué puede aportar cada método al sabor y al cuerpo de tu taza.',
    notes: ['Cacao', 'Panela', 'Frutos secos', 'Caramelo suave', 'Aroma limpio', 'Final redondo'],
    methods: ['V60', 'Espresso', 'Prensa', 'Moka'],
    roastLabel: 'Cafe pensado para consumo diario con perfil elegante y bien definido.'
  },
  story: {
    eyebrow: 'Historia de marca',
    title: 'El café nos trae de vuelta a Loja.',
    paragraphs: [
      'Miguel Castillo aprendió el oficio del café en Quilanga, donde su familia le enseñó a escoger las cerezas y a cuidar cada paso de la cosecha.',
      'Esa forma de trabajar continúa en Lojanías. Seleccionamos el café a mano y lo tostamos en origen para llevar el sabor de Loja a cada taza.'
    ]
  },
  quiz: {
    title: 'Encuentra tu café',
    description:
      'Cuéntanos cómo te gusta tomarlo y te sugerimos un café de la colección.',
    questions: [
      {
        id: 'taste',
        label: '¿Qué perfil te atrae más?',
        options: ['Intenso y profundo', 'Balanceado y dulce', 'Ligero y aromatico']
      },
      {
        id: 'method',
        label: '¿Cómo lo preparas normalmente?',
        options: ['Espresso o moka', 'Filtro o V60', 'Quiero algo versatil']
      },
      {
        id: 'moment',
        label: '¿Para qué lo quieres?',
        options: ['Uso diario', 'Disfrutar con calma', 'Regalar o compartir']
      }
    ]
  },
  testimonials: [
    {
      name: 'Cliente local',
      role: 'Loja',
      quote: 'La presentacion se siente fina, el recorrido es claro y el producto transmite mas valor.',
      rating: 5
    },
    {
      name: 'Cliente frecuente',
      role: 'Cafe en casa',
      quote: 'La nueva estructura deja entender rapido cual cafe elegir y se siente mucho mas elegante.',
      rating: 5
    },
    {
      name: 'Compra para regalo',
      role: 'Experiencia de marca',
      quote: 'La marca se percibe sobria y premium, ideal para regalar o vender con mejor presencia.',
      rating: 5
    }
  ],
  brewTips: [
    {
      title: 'Usa agua limpia',
      text: 'La calidad del agua cambia la taza. Filtrada y a temperatura estable funciona mejor.'
    },
    {
      title: 'Ajusta la molienda',
      text: 'Mas fina para espresso, mas gruesa para prensa. Ese cambio ya mejora mucho el resultado.'
    },
    {
      title: 'Sirve sin prisa',
      text: 'Una taza bien servida y una presentacion cuidada elevan la experiencia completa.'
    }
  ],
  finalCta: {
    title: 'Hablemos de café.',
    description: 'Escríbenos para consultar presentaciones, disponibilidad y pedidos.',
    primaryLabel: 'Entrar a la tienda',
    secondaryLabel: 'Contactar por WhatsApp'
  },
  footer: {
    address: 'Loja, Ecuador',
    phone: '+593981949036',
    email: 'hola@lojanias.com',
    instagram: '@lojanias',
    legal: '© 2026 Lojanías'
  }
};
