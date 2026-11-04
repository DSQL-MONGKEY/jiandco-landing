export type CollectionId = 'chongsam' | 'blush'

export type CatalogImage = {
  src: string
  alt: string
}

export type CatalogProduct = {
  id: string
  slug: string
  name: string
  collection: CollectionId
  color: string
  whatsappPrice: number
  shopeePrice: number
  images: CatalogImage[]
  description: string
  details: string[]
  sizes: string[]
  shopeeUrl: string
  badge?: string
}

export const sizes = ['S', 'M', 'L', 'XL'] as const

export const collections = [
  {
    id: 'chongsam',
    label: 'Chongsam',
    description:
      'Lace vest dengan detail romantis, dibuat untuk dipadukan dengan apa pun di lemari kamu.',
  },
  {
    id: 'blush',
    label: 'Blush',
    description:
      'Satin halter dengan drape lembut dan warna hangat untuk hari yang ingin terasa istimewa.',
  },
] as const

const chongsamDetails = [
  'Sleeveless lace vest',
  'Button front detail',
  'Relaxed fit',
  'Tersedia S–XL',
]

const blushDetails = [
  'Satin halter top',
  'Soft drape silhouette',
  'Tie neck detail',
  'Tersedia S–XL',
]

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'chongsam-cocoa',
    slug: 'chongsam-cocoa',
    name: 'Cocoa Lace Vest',
    collection: 'chongsam',
    color: 'Cocoa',
    whatsappPrice: 429000,
    shopeePrice: 459000,
    images: [
      {
        src: '/catalog/chongsam/cocoa-1.webp',
        alt: 'Lace vest cokelat dengan kancing depan dipadukan rok polkadot',
      },
      {
        src: '/catalog/chongsam/cocoa-2.webp',
        alt: 'Detail lace vest cokelat dan rok polkadot',
      },
      {
        src: '/catalog/chongsam/cocoa-3.webp',
        alt: 'Tampilan samping lace vest cokelat',
      },
    ],
    description:
      'Lace vest dengan detail kancing dan potongan lembut. Warna cocoa yang hangat membuatnya mudah dipadukan untuk hari yang ingin terasa lebih istimewa.',
    details: chongsamDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Chongsam',
  },
  {
    id: 'chongsam-ivory',
    slug: 'chongsam-ivory',
    name: 'Ivory Lace Vest',
    collection: 'chongsam',
    color: 'Ivory',
    whatsappPrice: 429000,
    shopeePrice: 459000,
    images: [
      {
        src: '/catalog/chongsam/ivory-1.webp',
        alt: 'Lace vest ivory dengan kancing emas dipadukan celana olive',
      },
      {
        src: '/catalog/chongsam/ivory-2.webp',
        alt: 'Detail lace vest ivory dan celana olive',
      },
      {
        src: '/catalog/chongsam/ivory-3.webp',
        alt: 'Lace vest ivory dari tampilan samping',
      },
    ],
    description:
      'Lace vest ivory yang ringan dengan detail kancing berkilau. Potongan bersih untuk tampilan yang tenang, feminin, dan tetap modern.',
    details: chongsamDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Chongsam',
  },
  {
    id: 'chongsam-rose',
    slug: 'chongsam-rose',
    name: 'Rose Lace Vest',
    collection: 'chongsam',
    color: 'Rose',
    whatsappPrice: 429000,
    shopeePrice: 459000,
    images: [
      {
        src: '/catalog/chongsam/rose-1.webp',
        alt: 'Lace vest rose dengan kancing emas dipadukan celana ivory',
      },
      {
        src: '/catalog/chongsam/rose-2.webp',
        alt: 'Detail lace vest rose dan celana satin ivory',
      },
      {
        src: '/catalog/chongsam/rose-3.webp',
        alt: 'Lace vest rose dari tampilan samping',
      },
    ],
    description:
      'Rona rose yang lembut dalam lace vest berpotongan relaxed. Detail kecil yang membuat penampilan sederhana terasa lebih hidup.',
    details: chongsamDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Chongsam',
  },
  {
    id: 'chongsam-peach',
    slug: 'chongsam-peach',
    name: 'Peach Lace Vest',
    collection: 'chongsam',
    color: 'Peach',
    whatsappPrice: 429000,
    shopeePrice: 459000,
    images: [
      {
        src: '/catalog/chongsam/peach-1.webp',
        alt: 'Lace vest peach dengan kancing emas dipadukan rok cokelat',
      },
      {
        src: '/catalog/chongsam/peach-2.webp',
        alt: 'Detail lace vest peach dan rok cokelat',
      },
      {
        src: '/catalog/chongsam/peach-3.webp',
        alt: 'Lace vest peach dari tampilan samping',
      },
    ],
    description:
      'Lace vest peach dengan sentuhan hangat dan siluet yang ringan. Cocok dipadukan dengan warna netral untuk look yang lebih lembut.',
    details: chongsamDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Chongsam',
  },
  {
    id: 'blush-cream',
    slug: 'blush-cream',
    name: 'Cream Satin Halter',
    collection: 'blush',
    color: 'Cream',
    whatsappPrice: 349000,
    shopeePrice: 379000,
    images: [
      {
        src: '/catalog/blush/cream-1.webp',
        alt: 'Satin halter cream dengan detail leher tinggi dan rok lace biru',
      },
      {
        src: '/catalog/blush/cream-2.webp',
        alt: 'Detail satin halter cream dan rok lace biru',
      },
      {
        src: '/catalog/blush/cream-3.webp',
        alt: 'Satin halter cream dari tampilan samping',
      },
    ],
    description:
      'Satin halter dengan drape lembut dan warna cream yang bersih. Potongan sederhana yang membuat bahan satin menjadi pusat perhatian.',
    details: blushDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Blush',
  },
  {
    id: 'blush-onyx',
    slug: 'blush-onyx',
    name: 'Onyx Satin Halter',
    collection: 'blush',
    color: 'Onyx',
    whatsappPrice: 349000,
    shopeePrice: 379000,
    images: [
      {
        src: '/catalog/blush/onyx-1.webp',
        alt: 'Satin halter onyx dengan celana pinstripe hitam',
      },
      {
        src: '/catalog/blush/onyx-2.webp',
        alt: 'Detail satin halter onyx dan celana pinstripe',
      },
      {
        src: '/catalog/blush/onyx-3.webp',
        alt: 'Satin halter onyx dari tampilan samping',
      },
    ],
    description:
      'Satin halter hitam dengan siluet mengalir dan detail leher yang anggun. Pilihan tegas untuk look malam yang tetap minimal.',
    details: blushDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Blush',
  },
  {
    id: 'blush-sand',
    slug: 'blush-sand',
    name: 'Sand Satin Halter',
    collection: 'blush',
    color: 'Sand',
    whatsappPrice: 349000,
    shopeePrice: 379000,
    images: [
      {
        src: '/catalog/blush/sand-1.webp',
        alt: 'Satin halter sand dengan celana pinstripe hitam',
      },
      {
        src: '/catalog/blush/sand-2.webp',
        alt: 'Detail satin halter sand dan celana pinstripe',
      },
      {
        src: '/catalog/blush/sand-3.webp',
        alt: 'Satin halter sand dari tampilan samping',
      },
    ],
    description:
      'Warna sand yang hangat dalam satin halter berpotongan longgar. Mudah dipadukan dengan warna netral untuk tampilan yang tenang.',
    details: blushDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Blush',
  },
  {
    id: 'blush-cocoa',
    slug: 'blush-cocoa',
    name: 'Cocoa Satin Halter',
    collection: 'blush',
    color: 'Cocoa',
    whatsappPrice: 349000,
    shopeePrice: 379000,
    images: [
      {
        src: '/catalog/blush/cocoa-1.webp',
        alt: 'Satin halter cocoa dengan celana satin beige',
      },
      {
        src: '/catalog/blush/cocoa-2.webp',
        alt: 'Detail satin halter cocoa dan celana beige',
      },
      {
        src: '/catalog/blush/cocoa-3.webp',
        alt: 'Satin halter cocoa dari tampilan samping',
      },
    ],
    description:
      'Satin halter cocoa dengan kilau lembut dan potongan yang jatuh indah. Warna hangat yang membuat penampilan terasa lebih dewasa dan tenang.',
    details: blushDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Blush',
  },
  {
    id: 'blush-navy',
    slug: 'blush-navy',
    name: 'Navy Satin Halter',
    collection: 'blush',
    color: 'Navy',
    whatsappPrice: 349000,
    shopeePrice: 379000,
    images: [
      {
        src: '/catalog/blush/navy-1.webp',
        alt: 'Satin halter navy dengan rok cokelat panjang',
      },
      {
        src: '/catalog/blush/navy-2.webp',
        alt: 'Detail satin halter navy dan rok cokelat',
      },
      {
        src: '/catalog/blush/navy-3.webp',
        alt: 'Satin halter navy dari tampilan samping',
      },
    ],
    description:
      'Satin halter navy dengan warna dalam yang elegan. Potongan minimal untuk look yang tenang, tapi tetap berkesan.',
    details: blushDetails,
    sizes: [...sizes],
    shopeeUrl: 'https://shopee.co.id/',
    badge: 'Blush',
  },
]

export const promo = {
  badge: 'Harga Spesial WhatsApp',
  title: 'Lebih hemat lewat WhatsApp.',
  description:
    'Dapatkan harga spesial saat memesan langsung melalui WhatsApp. Checkout Shopee tetap tersedia untuk pembayaran instan via QRIS, ShopeePay, atau PayLater.',
  note: 'Harga dan ketersediaan dapat berubah. Konfirmasi melalui WhatsApp atau Shopee.',
}

export const catalogCta = {
  eyebrow: 'The Collection',
  title: 'Temukan koleksi',
  titleAccent: 'Ji&Co.',
  description:
    'Jelajahi Chongsam dan Blush—potongan atasan yang dibuat untuk dipadukan dengan ritme harimu sendiri.',
  cta: 'Jelajahi Katalog',
  image: '/catalog/chongsam/ivory-1.webp',
  imageAlt:
    'Lace vest ivory dari koleksi Chongsam dipadukan dengan celana olive',
  secondaryImage: '/catalog/blush/cream-1.webp',
  secondaryImageAlt:
    'Satin halter cream dari koleksi Blush dengan rok lace biru',
}

export function getProduct(slug: string) {
  return catalogProducts.find((product) => product.slug === slug)
}

export const shopeeStoreUrl = 'https://shopee.co.id/'
