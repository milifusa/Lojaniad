export const defaultContent = {
  brand: {
    name: 'Lojanias',
    tagline: 'Cafe de altura | Loja, Ecuador',
    owner: 'Miguel Castillo',
    ctaLabel: 'Ver coleccion',
    ctaHref: '#coleccion',
    secondaryCtaLabel: 'Conocer la marca',
    secondaryCtaHref: '#historia',
    adminLabel: 'Admin'
  },
  hero: {
    eyebrow: 'Cafe de altura con presencia sobria y contemporanea',
    title: 'Una marca de Loja creada para vender cafe con elegancia y claridad.',
    description:
      'Lojanias presenta cafe de altura y aceite de coco en una experiencia minimalista, calida y facil de recorrer. Menos ruido visual, mas foco en producto, origen y confianza de compra.',
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
  featuredProducts: [
    {
      id: 'cafe-noir-200',
      name: 'Cafe Especial de Altura',
      category: 'Cafe de altura',
      format: 'Bolsa negra premium',
      size: '200 g',
      price: '$8.50',
      notes: 'Perfil intenso, limpio y elegante con notas achocolatadas.',
      roast: 'Tueste medio oscuro',
      method: 'Espresso, moka, prensa francesa',
      intensity: 4,
      acidity: 2,
      body: 4,
      badge: 'Cafe insignia',
      imageStyle: 'dark-bag',
      imageUrl: ''
    },
    {
      id: 'cafe-kraft-200',
      name: 'Cafe Natural de Altura',
      category: 'Cafe de altura',
      format: 'Bolsa kraft clasica',
      size: '200 g',
      price: '$7.90',
      notes: 'Dulzor balanceado, textura suave y final redondo.',
      roast: 'Tueste medio',
      method: 'V60, Chemex, filtro',
      intensity: 3,
      acidity: 3,
      body: 3,
      badge: 'Origen Loja',
      imageStyle: 'kraft-bag',
      imageUrl: ''
    },
    {
      id: 'aceite-coco-500',
      name: 'Aceite de Coco',
      category: 'Aceite de coco',
      format: 'Frasco de vidrio',
      size: '500 ml',
      price: '$12.00',
      notes: 'Textura sedosa, aroma natural y uso diario en cocina y bienestar.',
      roast: 'Natural',
      method: 'Cocina, reposteria, consumo diario',
      intensity: 2,
      acidity: 1,
      body: 5,
      badge: 'Linea complementaria',
      imageStyle: 'coconut-jar',
      imageUrl: ''
    }
  ],
  sensory: {
    title: 'Notas claras, lectura facil y una experiencia de compra mas serena.',
    description:
      'La pagina prioriza origen, notas de sabor, metodo sugerido y presentacion del producto, evitando saturacion visual. El cafe es el centro y el recorrido se siente mas premium.',
    notes: ['Cacao', 'Panela', 'Frutos secos', 'Caramelo suave', 'Aroma limpio', 'Final redondo'],
    methods: ['V60', 'Espresso', 'Prensa', 'Moka'],
    roastLabel: 'Cafe pensado para consumo diario con perfil elegante y bien definido.'
  },
  story: {
    eyebrow: 'Historia de marca',
    title: 'Lojanias pone en primer plano el origen lojanio y una forma sobria de vender mejor.',
    paragraphs: [
      'La marca nace en Loja, Ecuador, con la vision de Miguel Castillo de convertir el cafe de altura en una experiencia de compra mas cuidada, moderna y confiable.',
      'El objetivo no es solo mostrar producto, sino transmitir origen, presentacion y una sensacion de calidad que invite a quedarse, explorar y comprar con seguridad.'
    ]
  },
  quiz: {
    title: 'Encuentra tu cafe ideal',
    description:
      'Una herramienta simple para orientar al visitante segun gusto, metodo de preparacion y momento de consumo.',
    questions: [
      {
        id: 'taste',
        label: 'Que perfil te atrae mas?',
        options: ['Intenso y profundo', 'Balanceado y dulce', 'Ligero y aromatico']
      },
      {
        id: 'method',
        label: 'Como lo preparas normalmente?',
        options: ['Espresso o moka', 'Filtro o V60', 'Quiero algo versatil']
      },
      {
        id: 'moment',
        label: 'Para que lo quieres?',
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
    title: 'Explora la coleccion y convierte el origen en una compra memorable.',
    description: 'Cafe de altura, presentaciones claras y una marca con identidad local.',
    primaryLabel: 'Entrar a la tienda',
    secondaryLabel: 'Contactar por WhatsApp'
  },
  footer: {
    address: 'Loja, Ecuador',
    phone: '+593990000000',
    email: 'hola@lojanias.com',
    instagram: '@lojanias',
    legal: '© 2026 Lojanias. Cafe de altura de Loja, Ecuador.'
  }
};
