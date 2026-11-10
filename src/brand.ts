export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  color: string;
  price: number;
  badge?: string;
  badgeTone?: "light" | "accent";
  image: string;
  imageAlt: string;
  imagePosition?: string;
  description: string;
  details: string[];
  sizes: string[];
};

export type Bundle = {
  id: string;
  name: string;
  description: string;
  itemIds: string[];
  badge?: string;
  featured?: boolean;
};

export type Look = {
  image: string;
  imageAlt: string;
  title: string;
  caption: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  city: string;
};

export type FooterColumn = {
  title: string;
  links?: NavLink[];
  lines?: string[];
};

export type Value = {
  title: string;
  description: string;
};

export type Brand = {
  name: string;
  companyName: string;
  meaning: string;
  tagline: string;
  description: string;
  founded: string;
  city: string;
  locale: string;
  currency: string;
  announcement: string;
  announcementShort: string;
  contact: {
    email: string;
    whatsapp: string;
    whatsappDisplay: string;
    instagram: string;
    instagramUrl: string;
    whatsappMessage: string;
  };
  theme: {
    colors: Record<string, string>;
    fonts: { display: string; body: string };
  };
  nav: NavLink[];
  header: { ctaLabel: string; ctaHref: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    image: string;
    imageAlt: string;
    imageBadge: string;
    imageBadgeSub: string;
    imageCaption: string;
    notes: string[];
  };
  marquee: string[];
  productsSection: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    meta: string;
  };
  products: Product[];
  accessoriesSection: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    meta: string;
    railHint: string;
    prevLabel: string;
    nextLabel: string;
    bundleEyebrow: string;
    bundleTitle: string;
    bundleTitleAccent: string;
    bundleIntro: string;
    bundleItemsLabel: string;
    bundleTotalLabel: string;
    bundleSizeLabel: string;
    bundleCtaLabel: string;
    bundleNote: string;
    customCtaLabel: string;
    customWhatsappMessage: string;
  };
  accessories: Product[];
  bundles: Bundle[];
  quickView: {
    quickLabel: string;
    sizeLabel: string;
    detailsLabel: string;
    orderLabel: string;
    note: string;
    closeLabel: string;
  };
  blushEdit: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    points: string[];
    primaryCta: NavLink;
    secondaryCta: NavLink;
    image: string;
    imageAlt: string;
    captionLeft: string;
    captionRight: string;
  };
  story: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paragraphs: string[];
    quote: string;
    signature: string;
    role: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    insetImage: string;
    insetImageAlt: string;
  };
  values: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    items: Value[];
  };
  lookbook: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    cta: NavLink;
    items: Look[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    items: Testimonial[];
  };
  instagram: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    cta: NavLink;
    images: { image: string; imageAlt: string }[];
  };
  newsletter: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    note: string;
    error: string;
    successTitle: string;
    successText: string;
  };
  footer: {
    blurb: string;
    contactTitle: string;
    columns: FooterColumn[];
    rights: string;
    trademark: string;
    creditPrefix: string;
    creditLabel: string;
    creditHref: string;
    backToTop: string;
  };
  seo: { title: string; description: string; themeColor: string; ogImage: string };
};

export const brand: Brand = {
  name: "Ji&Co",
  companyName: "PT. Sadhika Cipta Mandiri",
  meaning: "JoI",
  tagline: "Everyday elegance, made to fit.",
  description:
    "Ji&Co menghadirkan fashion kekinian yang simple, sederhana, namun tetap trendi—dirancang nyaman dan pas untuk banyak bentuk tubuh.",
  founded: "2026",
  city: "Jakarta, Indonesia",
  locale: "id-ID",
  currency: "IDR",
  announcement: "Gratis ongkir untuk pesanan di atas Rp 500.000",
  announcementShort: "Gratis ongkir min. Rp 500.000",
  contact: {
    email: "hello@jiandco.com",
    whatsapp: "6281282825372",
    whatsappDisplay: "+62 812 8282 5372",
    instagram: "@jiandco",
    instagramUrl: "https://www.instagram.com/jiandco",
    whatsappMessage: "Halo Ji&Co, saya ingin bertanya tentang koleksi terbaru.",
  },
  theme: {
    colors: {
      ink: "#111214",
      white: "#FFFFFF",
      main: "#EEE4DA",
      secondary: "#C8A49F",
      sand: "#D8C4AC",
      burgundy: "#4D0E13",
      accent: "#4D0E13",
      line: "#CDBAA4",
      muted: "#463A31",
    },
    fonts: {
      display: "'Cormorant Garamond Variable', Georgia, serif",
      body: "'Manrope Variable', ui-sans-serif, system-ui, sans-serif",
    },
  },
  nav: [
    { label: "New In", href: "#new-in" },
    { label: "Accessories", href: "#accessories" },
    { label: "The Blush Edit", href: "#blush-edit" },
    { label: "Our Story", href: "#story" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Contact", href: "#contact" },
  ],
  header: {
    ctaLabel: "Shop Now",
    ctaHref: "/catalog",
  },
  hero: {
    eyebrow: "New Collection — 01",
    title: "Everyday elegance,",
    titleAccent: "made to fit.",
    description:
      "Ji&Co hadir untuk perempuan yang percaya bahwa gaya terbaik tidak perlu berteriak. Potongan yang bersih, material pilihan yang nyaman di kulit, serta detail penuh pertimbangan dirancang khusus untuk merayakan diri seutuhnya.",
    primaryCta: { label: "Jelajahi Koleksi", href: "#new-in" },
    secondaryCta: { label: "Kenali Ji&Co", href: "#story" },
    image: "/images/hero-main.webp",
    imageAlt: "Perempuan mengenakan dress linen beige dalam studio bernuansa hangat",
    imageBadge: "New In",
    imageBadgeSub: "The Blush Edit",
    imageCaption: "Collection 01 — Jakarta, 2026",
    notes: ["Gratis ongkir di atas Rp 500.000", "Dibuat di Indonesia"],
  },
  marquee: ["Simple silhouettes", "Everyday comfort", "Made to fit", "Considered details"],
  productsSection: {
    eyebrow: "Koleksi 01",
    title: "Pieces you'll",
    titleAccent: "live in.",
    intro:
      "Essentials yang dirancang untuk dipakai berulang kali—bukan sekadar tren musim ini. Kenali potongannya, rasakan bahannya, lalu jadikan milikmu.",
    meta: "4 pieces — Capsule 01",
  },
  products: [
    {
      id: "linen-shirt",
      name: "The Linen Shirt",
      category: "Atasan",
      color: "Natural",
      price: 329000,
      badge: "New",
      badgeTone: "light",
      image: "/images/product-linen.webp",
      imageAlt: "Kemeja linen berwarna natural digantung pada rail minimalis",
      imagePosition: "50% 52%",
      description:
        "Kemeja linen dengan potongan relaxed yang ringan dan jatuh sempurna. Dibuat untuk dipakai dari rapat pagi sampai makan malam.",
      details: [
        "100% linen dengan tekstur lembut",
        "Relaxed fit dengan kerah klasik",
        "Tersedia XS–XL",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "soft-knit",
      name: "The Soft Knit",
      category: "Rajut",
      color: "Oat",
      price: 289000,
      badge: "Bestseller",
      badgeTone: "accent",
      image: "/images/product-knit.webp",
      imageAlt: "Perempuan mengenakan pullover rajut berwarna oat dengan latar hangat",
      imagePosition: "50% 68%",
      description:
        "Pullover rajut bertekstur yang hangat tanpa terasa berat. Warna oat yang tenang, mudah dipadukan dengan apa pun di lemari kamu.",
      details: ["Campuran katun dan wool", "Regular fit dengan rib detail", "Tersedia XS–XL"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "blush-shirt",
      name: "The Blush Shirt",
      category: "Atasan",
      color: "Blush",
      price: 349000,
      badge: "The Blush Edit",
      badgeTone: "accent",
      image: "/images/blush-shirt.webp",
      imageAlt: "Kemeja satin blush dengan potongan relaxed di studio netral",
      imagePosition: "50% 28%",
      description:
        "Kemeja satin dalam warna blush yang lembut. Potongan relaxed untuk tampilan rapi yang tetap terasa ringan sepanjang hari.",
      details: [
        "Satin dengan drape yang lembut",
        "Relaxed fit dengan kancing depan",
        "Tersedia XS–XL",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "satin-set",
      name: "The Satin Set",
      category: "Set",
      color: "Ivory",
      price: 459000,
      badge: "Limited",
      badgeTone: "light",
      image: "/images/product-satin.webp",
      imageAlt: "Set atasan dan rok satin putih dengan kilau lembut",
      imagePosition: "50% 38%",
      description:
        "Set atasan dan rok satin dengan kilau lembut. Satu set yang cukup untuk membuat malam biasa terasa istimewa.",
      details: ["Satin dengan lining lembut", "Atasan relaxed dan rok midi", "Tersedia XS–XL"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ],
  accessoriesSection: {
    eyebrow: "Aksesori — Mix & Match",
    title: "The finishing",
    titleAccent: "touch.",
    intro:
      "Sentuhan akhir yang menghidupkan kisah kecantikanmu. Jelajahi rangkaian aksesori Ji&Co yang merajut pesona feminin, membuat setiap penampilanmu semakin hidup, berkarakter, dan penuh arti.",
    meta: "8 aksesori — One size",
    railHint: "Geser untuk melihat semua",
    prevLabel: "Aksesori sebelumnya",
    nextLabel: "Aksesori berikutnya",
    bundleEyebrow: "Paket Mix & Match",
    bundleTitle: "Merangkai gaya,",
    bundleTitleAccent: "dalam satu sentuhan.",
    bundleIntro:
      "Tiga set terkurasi dari pieces favorit dan aksesorinya. Pilih set, tentukan ukuran pakaian, lalu pesan lewat WhatsApp.",
    bundleItemsLabel: "Isi paket",
    bundleTotalLabel: "Total set",
    bundleSizeLabel: "Ukuran",
    bundleCtaLabel: "Pesan paket via WhatsApp",
    bundleNote:
      "Harga set adalah total item di dalamnya. Ketersediaan dan ongkir dikonfirmasi melalui WhatsApp.",
    customCtaLabel: "Racik paketmu sendiri",
    customWhatsappMessage: "Halo Ji&Co, saya ingin dibantu meracik paket mix & match aksesori.",
  },
  accessories: [
    {
      id: "acc-tote",
      name: "The Everyday Tote",
      category: "Tas",
      color: "Stone",
      price: 389000,
      badge: "New",
      badgeTone: "light",
      image: "/images/accessory-tote.webp",
      imageAlt: "Tas tote abu-abu bertekstur dengan handle kulit cokelat di studio terang",
      imagePosition: "50% 50%",
      description:
        "Tote dengan ruang lega untuk hari yang panjang. Cukup untuk tablet, botol air, dan semua hal kecil yang kamu butuhkan.",
      details: [
        "Kulit vegan bertekstur",
        "Muat tablet 11 inci dan essentials",
        "Strap bahu yang bisa dilepas",
      ],
      sizes: ["One size"],
    },
    {
      id: "acc-scarf",
      name: "The Silk Scarf",
      category: "Scarf",
      color: "Mauve",
      price: 179000,
      badge: "The Blush Edit",
      badgeTone: "accent",
      image: "/images/accessory-scarf.webp",
      imageAlt: "Scarf satin mauve dengan detail bunga dan perhiasan emas",
      imagePosition: "50% 54%",
      description:
        "Satin dengan kilau tenang dan warna blush yang menghidupkan look netral. Bisa dipakai di leher, rambut, atau handle tas.",
      details: [
        "Satin 55 × 55 cm",
        "Bisa dipakai di leher, rambut, atau tas",
        "Hand-finished edges",
      ],
      sizes: ["One size"],
    },
    {
      id: "acc-hoops",
      name: "The Gold Hoops",
      category: "Anting",
      color: "Gold",
      price: 149000,
      badge: "Bestseller",
      badgeTone: "accent",
      image: "/images/accessory-hoops.webp",
      imageAlt: "Anting hoop emas bertekstur di atas kain putih yang jatuh lembut",
      imagePosition: "50% 50%",
      description:
        "Hoop dengan tekstur yang menangkap cahaya. Cukup kecil untuk dipakai setiap hari, cukup istimewa untuk malam.",
      details: ["Gold-plated brass", "Diameter 2,5 cm", "Nickel-free"],
      sizes: ["One size"],
    },
    {
      id: "acc-hairpin",
      name: "The Pearl Hairpin",
      category: "Jepitan",
      color: "Pearl",
      price: 129000,
      badge: "Limited",
      badgeTone: "light",
      image: "/images/accessory-hairpin.webp",
      imageAlt: "Hairpin emas dengan detail mutiara di atas permukaan marmer terang",
      imagePosition: "50% 62%",
      description:
        "Sentuhan mutiara untuk rambut yang ingin sedikit lebih istimewa. Ringan, lembut, dan mudah diselipkan.",
      details: ["Gold-tone dengan pearl detail", "Panjang 8 cm", "Sisir rambut yang ringan"],
      sizes: ["One size"],
    },
    {
      id: "acc-necklace",
      name: "The Fine Necklace",
      category: "Kalung",
      color: "Gold",
      price: 189000,
      badge: "Bestseller",
      badgeTone: "light",
      image: "/images/accessory-necklace.webp",
      imageAlt: "Kalung rantai emas tipis dipajang pada platform putih minimalis",
      imagePosition: "50% 52%",
      description:
        "Rantai tipis dengan kilau lembut yang membuat leher terlihat lebih anggun. Mudah dipadukan, sulit dilepas.",
      details: ["Gold-plated brass", "Panjang 42 cm + extender 5 cm", "Lobster clasp"],
      sizes: ["One size"],
    },
    {
      id: "acc-bracelet",
      name: "The Chain Bracelet",
      category: "Gelang",
      color: "Gold",
      price: 159000,
      badge: "New",
      badgeTone: "accent",
      image: "/images/accessory-bracelet.webp",
      imageAlt: "Gelang rantai emas dengan clasp kecil di atas kain putih",
      imagePosition: "50% 50%",
      description:
        "Gelang rantai halus yang bergerak cantik di pergelangan. Cukup satu, atau susun beberapa untuk look yang lebih personal.",
      details: ["Gold-plated brass", "Panjang 17 cm + extender", "Lobster clasp"],
      sizes: ["One size"],
    },
    {
      id: "acc-belt",
      name: "The Leather Belt",
      category: "Belt",
      color: "Black",
      price: 219000,
      badge: "Essentials",
      badgeTone: "light",
      image: "/images/accessory-belt.webp",
      imageAlt: "Belt kulit hitam dengan buckle silver ditata di atas permukaan terang",
      imagePosition: "62% 50%",
      description:
        "Belt bersih dengan buckle sederhana untuk merapikan siluet. Pas di pinggang, pas di pinggul—sesuai caramu memakainya.",
      details: ["Kulit sintetis premium", "Lebar 2,5 cm", "Buckle silver-tone"],
      sizes: ["One size"],
    },
    {
      id: "acc-sunglasses",
      name: "The Everyday Shades",
      category: "Sunglasses",
      color: "Tortoise",
      price: 229000,
      badge: "New",
      badgeTone: "accent",
      image: "/images/accessory-sunglasses.webp",
      imageAlt: "Sunglasses tortoise shell dengan lensa cokelat di atas latar beige",
      imagePosition: "50% 54%",
      description:
        "Bingkai tortoise yang lembut dengan lensa hangat. Sentuhan akhir untuk hari yang terang dan mood yang ringan.",
      details: ["Frame acetate", "Lensa UV400", "Termasuk pouch"],
      sizes: ["One size"],
    },
  ],
  bundles: [
    {
      id: "everyday-set",
      name: "The Everyday Set",
      description:
        "Untuk hari yang ingin terasa rapi tanpa usaha lebih. Kemeja linen, tote, dan hoops yang selalu bisa diandalkan.",
      itemIds: ["linen-shirt", "acc-tote", "acc-hoops"],
      badge: "Most loved",
      featured: true,
    },
    {
      id: "evening-set",
      name: "The Evening Set",
      description:
        "Satin, mutiara, dan kilau tipis untuk malam yang tenang. Satu set untuk momen yang ingin terasa istimewa.",
      itemIds: ["satin-set", "acc-hairpin", "acc-necklace"],
      badge: "Evening edit",
    },
    {
      id: "blush-set",
      name: "The Blush Set",
      description:
        "Blush dari kemeja sampai scarf, diikat dengan belt hitam yang tegas. Simple, tapi berkesan.",
      itemIds: ["blush-shirt", "acc-scarf", "acc-belt"],
      badge: "The Blush Edit",
    },
  ],
  quickView: {
    quickLabel: "Quick view",
    sizeLabel: "Pilih ukuran",
    detailsLabel: "Detail",
    orderLabel: "Pesan via WhatsApp",
    note: "Kami akan mengonfirmasi ketersediaan, ukuran, dan ongkir melalui WhatsApp.",
    closeLabel: "Tutup detail produk",
  },
  blushEdit: {
    eyebrow: "The Blush Edit — Limited Capsule",
    title: "Blush, the new",
    titleAccent: "neutral.",
    description:
      "Rona blush yang tenang, dihadirkan dalam potongan yang mudah dipadukan. Kapsul kecil untuk hari-hari yang ingin terasa sedikit lebih ringan.",
    points: ["Terbatas 10 pieces", "Blush signature shade", "Tersedia XS–XL"],
    primaryCta: { label: "Jelajahi The Blush Edit", href: "#new-in" },
    secondaryCta: { label: "Lihat Lookbook", href: "#lookbook" },
    image: "/images/blush-shirt.webp",
    imageAlt: "Perempuan mengenakan kemeja satin blush dan celana denim di ruang studio terang",
    captionLeft: "The Blush Edit — 01",
    captionRight: "10 pieces only",
  },
  story: {
    eyebrow: "Our Story",
    title: "Dari pertemanan,",
    titleAccent: "menjadi keanggunan.",
    paragraphs: [
      "Berawal dari perpaduan dua gagasan dan kecintaan mendalam pada estetika, Ji&Co hadir sebagai wujud penghormatan bagi keindahan perempuan. Kami percaya setiap individu menyimpan pesona unik yang selayaknya dirayakan.",
      "Koleksi kami dirancang bukan untuk mengubah siapa dirimu, melainkan untuk menyempurnakan keanggunan yang telah ada di dalam dirimu. Melalui jahitan yang cermat dan siluet yang membelai tubuh dengan sempurna, setiap busana dipersiapkan untuk menemani hari-hari nyatamu dengan penuh rasa percaya diri.",
    ],
    quote:
      "Elegan bukan tentang menjadi pusat perhatian. Elegan adalah saat kamu merasa nyaman menjadi diri sendiri.",
    signature: "JoI",
    role: "Founders of Ji&Co",
    image: "/images/story-atelier.webp",
    imageAlt: "Perempuan desainer bekerja di atelier terang dengan manekin dan sketsa busana",
    imageCaption: "Di balik layar — atelier Ji&Co, Jakarta",
    insetImage: "/images/story-workspace.webp",
    insetImageAlt: "Meja kerja desainer dengan mesin jahit, sketsa, dan contoh kain biru",
  },
  values: {
    eyebrow: "The Ji&Co Way",
    title: "Sedikit, tapi",
    titleAccent: "berarti.",
    intro:
      "Tiga prinsip sederhana yang kami pegang di setiap koleksi—dari memilih kain sampai detail terakhir.",
    items: [
      {
        title: "Fit yang memeluk",
        description:
          "Siluet dirancang untuk bergerak bersama tubuh, bukan melawannya. Nyaman dari pagi hingga malam, di berbagai bentuk tubuh.",
      },
      {
        title: "Bahan yang bernapas",
        description:
          "Linen, katun, dan viscose pilihan yang lembut di kulit, adem, dan mudah dirawat untuk dipakai sehari-hari.",
      },
      {
        title: "Gaya yang tinggal",
        description:
          "Warna netral dan potongan yang melampaui musim, agar pieces ini terus kamu pakai—bukan sekadar disimpan.",
      },
    ],
  },
  lookbook: {
    eyebrow: "Lookbook — Vol. 01",
    title: "The art of",
    titleAccent: "less.",
    intro:
      "Empat cara melihat Ji&Co—dari potongan sehari-hari sampai detail yang membuatnya terasa milikmu.",
    cta: {
      label: "Lihat di Instagram",
      href: "https://www.instagram.com/jiandco",
      external: true,
    },
    items: [
      {
        image: "/images/lookbook-motion.webp",
        imageAlt: "Perempuan mengenakan setelan beige dalam cahaya hangat di studio",
        title: "Earthy ease",
        caption: "Soft tailoring, warm light.",
      },
      {
        image: "/images/lookbook-blazer.webp",
        imageAlt: "Perempuan mengenakan blazer putih oversize dengan celana berwarna lembut",
        title: "Soft structure",
        caption: "An oversized blazer, softly tailored.",
      },
      {
        image: "/images/lookbook-knit.webp",
        imageAlt: "Detail pullover rajut oat dipadukan dengan rok satin yang jatuh lembut",
        title: "Texture story",
        caption: "Soft knit, fluid satin.",
      },
      {
        image: "/images/lookbook-palette.webp",
        imageAlt: "Tiga cardigan rajut warna oat, ivory, dan slate tersusun di atas meja",
        title: "The palette",
        caption: "Oat, ivory, slate.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kind Words",
    title: "Dipakai, dicintai,",
    titleAccent: "diulang.",
    intro: "Cerita kecil dari perempuan yang sudah membawa Ji&Co ke hari-harinya.",
    items: [
      {
        quote:
          "Bahannya jatuh dengan cantik dan nyaman dipakai seharian. The Linen Shirt langsung jadi favorit saya.",
        name: "Alya",
        city: "Jakarta",
      },
      {
        quote:
          "Suka banget sama potongannya—simple tapi tetap terlihat rapi. Cocok untuk kerja maupun weekend.",
        name: "Nadia",
        city: "Bandung",
      },
      {
        quote:
          "Akhirnya menemukan brand lokal yang fit-nya pas dan warna netralnya mudah dipadukan.",
        name: "Rania",
        city: "Surabaya",
      },
    ],
  },
  instagram: {
    eyebrow: "@jiandco",
    title: "Stay",
    titleAccent: "close.",
    intro: "Keseharian kami, koleksi terbaru, dan cerita di balik Ji&Co.",
    cta: {
      label: "Ikuti @jiandco",
      href: "https://www.instagram.com/jiandco",
      external: true,
    },
    images: [
      {
        image: "/images/story-workspace.webp",
        imageAlt: "Meja kerja atelier dengan sketsa dan kain biru",
      },
      {
        image: "/images/ig-rack.webp",
        imageAlt: "Hanger putih tersusun rapi di rail minimalis",
      },
      {
        image: "/images/product-linen.webp",
        imageAlt: "Kemeja linen natural di rail putih",
      },
      {
        image: "/images/lookbook-motion.webp",
        imageAlt: "Perempuan mengenakan setelan beige dalam cahaya hangat di studio",
      },
    ],
  },
  newsletter: {
    eyebrow: "The Ji&Co Circle",
    title: "Jadi yang pertama",
    titleAccent: "tahu.",
    description:
      "Akses awal ke koleksi baru, cerita dari balik layar, dan kejutan kecil—langsung ke inbox kamu.",
    placeholder: "Email kamu",
    buttonLabel: "Daftar",
    note: "Kami tidak suka spam. Kamu bisa berhenti berlangganan kapan saja.",
    error: "Masukkan alamat email yang valid.",
    successTitle: "Terima kasih, kamu sudah di daftar.",
    successText: "Sampai jumpa di inbox—dengan cerita pertama dari Ji&Co.",
  },
  footer: {
    blurb:
      "Fashion yang simple, sederhana, dan tetap trendi—dibuat untuk perempuan yang ingin tampil nyaman sebagai dirinya sendiri.",
    contactTitle: "Hubungi",
    columns: [
      {
        title: "Jelajahi",
        links: [
          { label: "New In", href: "#new-in" },
          { label: "Accessories", href: "#accessories" },
          { label: "The Blush Edit", href: "#blush-edit" },
          { label: "Our Story", href: "#story" },
          { label: "Lookbook", href: "#lookbook" },
        ],
      },
      {
        title: "Studio",
        lines: ["Jakarta, Indonesia", "Senin–Jumat, 09.00–18.00 WIB", "Order online 24/7"],
      },
    ],
    rights: "© 2026 PT. Sadhika Cipta Mandiri. Seluruh hak cipta dilindungi.",
    trademark: "Ji&Co adalah merek dagang PT. Sadhika Cipta Mandiri.",
    creditPrefix: "Fotografi demo oleh",
    creditLabel: "Pexels",
    creditHref: "https://www.pexels.com",
    backToTop: "Kembali ke atas",
  },
  seo: {
    title: "Ji&Co — Everyday Elegance, Made to Fit",
    description:
      "Ji&Co menghadirkan fashion perempuan Indonesia yang simple, trendi, dan nyaman. Jelajahi atasan Chongsam & Blush, pilih ukuran, lalu checkout via WhatsApp atau Shopee.",
    themeColor: "#EEE4DA",
    ogImage: "/images/og-jiandco.jpg",
  },
};

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: brand.currency,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00a0/g, " ");
}
