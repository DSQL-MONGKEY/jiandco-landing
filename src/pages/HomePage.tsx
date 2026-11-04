import { brand } from '../brand'
import BlushEdit from '../components/BlushEdit'
import CatalogCta from '../components/CatalogCta'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import InstagramStrip from '../components/InstagramStrip'
import Lookbook from '../components/Lookbook'
import Marquee from '../components/Marquee'
import Newsletter from '../components/Newsletter'
import Seo from '../components/Seo'
import Story from '../components/Story'
import Testimonials from '../components/Testimonials'
import Values from '../components/Values'

export default function HomePage() {
  const origin = window.location.origin
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    alternateName: brand.meaning,
    url: origin,
    logo: `${origin}/favicon.svg`,
    sameAs: [brand.contact.instagramUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${brand.contact.whatsapp}`,
      email: brand.contact.email,
    },
  }

  return (
    <>
      <Seo
        title={brand.seo.title}
        description={brand.seo.description}
        path="/"
        image={brand.hero.image}
        jsonLd={jsonLd}
      />
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <Marquee />
        <CatalogCta />
        <BlushEdit />
        <Values />
        <Lookbook />
        <Testimonials />
        <InstagramStrip />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
