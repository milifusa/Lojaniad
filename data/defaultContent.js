export const defaultContent = {
  brand: {
    name: 'Lojanias',
    tagline: 'Cafe de altura de Loja, Ecuador',
    owner: 'Miguel Castillo',
    ctaLabel: 'Comprar coleccion',
    ctaHref: '#coleccion',
    secondaryCtaLabel: 'Conocer origen',
    secondaryCtaHref: '#historia',
    adminLabel: 'Panel admin'
  },
  hero: {
    eyebrow: 'Origen andino | 100% arabica',
    title: 'Cafe premium con alma lojana y presencia contemporanea.',
    description:
      'Una experiencia de altura para quienes valoran origen, notas sensoriales definidas y una compra que se siente tan cuidada como la taza.',
    metrics: [
      { label: 'Altura', value: '1.500 - 2.100 msnm' },
      { label: 'Tueste', value: 'Medio y medio-oscuro' },
      { label: 'Entrega', value: 'Directa desde Loja' }
    ]
  },
  valueProps: [
    {
      title: 'Origen de altura',
      text: 'Cafe cultivado en zonas altas de Loja, con trazabilidad y expresion limpia en taza.',
      stat: 'Loja, Ecuador'
    },
    {
      title: 'Perfil sensorial claro',
      text: 'Notas a cacao, panela, frutos secos y acidez brillante segun la presentacion.',
      stat: 'Cuerpo medio'
    },
    {
      title: 'Tueste y molienda en origen',
      text: 'Control del proceso para mantener frescura, aroma y consistencia de compra.',
      stat: 'Lotes cuidados'
    },
    {
      title: 'Compra confiable',
      text: 'Seleccion premium, empaque elegante y experiencia directa de marca a cliente.',
      stat: 'Pago simple'
    }
  ],
  featuredProducts: [
    {
      id: 'cafe-noir',
      name: 'Cafe Especial Noir',
      category: 'Cafe de altura',
      format: 'Bolsa premium',
      size: '250 g',
      price: '$9.90',
      notes: 'Cacao oscuro, almendra tostada y caramelo.',
      roast: 'Medio oscuro',
      method: 'Espresso, moka, prensa',
      intensity: 4,
      acidity: 2,
      body: 4,
      badge: 'Mas vendido',
      imageStyle: 'dark-bag'
    },
    {
      id: 'cafe-reserva',
      name: 'Cafe Reserva Loja',
      category: 'Cafe de altura',
      format: 'Bolsa kraft',
      size: '200 g',
      price: '$8.50',
      notes: 'Panela, cacao dulce y final achocolatado.',
      roast: 'Medio',
      method: 'Filtro, V60, Chemex',
      intensity: 3,
      acidity: 3,
      body: 3,
      badge: 'Origen Loja',
      imageStyle: 'kraft-bag'
    },
    {
      id: 'aceite-coco',
      name: 'Aceite de Coco Virgen',
      category: 'Aceite de coco',
      format: 'Frasco de vidrio',
      size: '500 ml',
      price: '$12.00',
      notes: 'Textura sedosa, aroma natural y uso versatil.',
      roast: 'Natural',
      method: 'Cocina, bienestar, reposteria',
      intensity: 2,
      acidity: 1,
      body: 5,
      badge: 'Complemento estrella',
      imageStyle: 'coconut-jar'
    }
  ],
  sensory: {
    title: 'Una taza con capas de aroma, dulzor y permanencia.',
    description:
      'Lojanias convierte atributos tecnicos en una experiencia facil de entender: origen, proceso, perfil y metodo ideal se muestran de forma visual y aspiracional.',
    notes: ['Cacao', 'Panela', 'Nuez', 'Caramelo', 'Floral suave', 'Citricos finos'],
    methods: ['V60', 'Prensa francesa', 'Espresso', 'Moka'],
    roastLabel: 'Tueste balanceado para taza diaria y momentos especiales.'
  },
  story: {
    eyebrow: 'Historia de marca',
    title: 'Lojanias nace para elevar el cafe lojanio a una experiencia de marca premium.',
    paragraphs: [
      'Desde Loja, Miguel Castillo impulsa una propuesta que une cafe de altura, presentacion cuidada y una narrativa de origen que conecta con quienes buscan algo mas que solo cafe.',
      'La marca pone en primer plano la procedencia, el trabajo en origen y el ritual cotidiano de preparar una buena taza, con una estetica calida, moderna y confiable.'
    ]
  },
  quiz: {
    title: 'Encuentra tu cafe ideal',
    description:
      'Responde tres preferencias y recibe una recomendacion inmediata con el estilo de cafe o producto que mejor encaja contigo.',
    questions: [
      {
        id: 'taste',
        label: 'Que perfil prefieres?',
        options: ['Intenso y achocolatado', 'Equilibrado y dulce', 'Suave y aromatico']
      },
      {
        id: 'method',
        label: 'Como sueles prepararlo?',
        options: ['Espresso o moka', 'Filtro o V60', 'Busco algo versatil']
      },
      {
        id: 'moment',
        label: 'Para que momento lo quieres?',
        options: ['Empezar el dia', 'Disfrutar con calma', 'Regalar o compartir']
      }
    ]
  },
  testimonials: [
    {
      name: 'Andrea P.',
      role: 'Cliente recurrente',
      quote: 'Se siente como una marca cuidada de principio a fin: empaque bonito, aroma potente y taza consistente.',
      rating: 5
    },
    {
      name: 'Daniel M.',
      role: 'Amante del cafe filtrado',
      quote: 'La explicacion de notas y metodo hace facil elegir. El cafe reserva tiene un perfil muy limpio.',
      rating: 5
    },
    {
      name: 'Sofia R.',
      role: 'Compra para regalo',
      quote: 'La experiencia visual y el producto transmiten calidad. Es un regalo con presencia.',
      rating: 5
    }
  ],
  brewTips: [
    {
      title: 'Molienda correcta',
      text: 'Ajusta la molienda segun el metodo para evitar una extraccion plana o demasiado agresiva.'
    },
    {
      title: 'Agua limpia y temperatura estable',
      text: 'Usa agua filtrada entre 90 y 96 grados para resaltar dulzor y aroma.'
    },
    {
      title: 'Ritual de servicio',
      text: 'Sirve en taza precalentada y deja respirar el cafe unos segundos antes del primer sorbo.'
    }
  ],
  finalCta: {
    title: 'Haz de cada taza una experiencia de altura.',
    description: 'Compra la coleccion destacada o descubre el cafe que mejor va contigo.',
    primaryLabel: 'Ir a la tienda',
    secondaryLabel: 'Hablar por WhatsApp'
  },
  footer: {
    address: 'Loja, Ecuador',
    phone: '+593 99 000 0000',
    email: 'hola@lojanias.com',
    instagram: '@lojanias',
    legal: '© 2026 Lojanias. Todos los derechos reservados.'
  }
};
