import { brand } from "../brand";
import { getSiteUrl } from "../lib/seo";
import BlushEdit from "../components/BlushEdit";
import CatalogCta from "../components/CatalogCta";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InstagramStrip from "../components/InstagramStrip";
import Lookbook from "../components/Lookbook";
import Marquee from "../components/Marquee";
import Newsletter from "../components/Newsletter";
import Seo from "../components/Seo";
import Story from "../components/Story";
import Testimonials from "../components/Testimonials";
import Values from "../components/Values";

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: brand.seo.title,
    description: brand.seo.description,
    url: `${siteUrl}/`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}${brand.seo.ogImage}`,
    },
  };

  return (
    <>
      <Seo
        title={brand.seo.title}
        description={brand.seo.description}
        path="/"
        image={brand.seo.ogImage}
        imageAlt="Ji&Co — Everyday Elegance, Made to Fit"
        imageWidth={1200}
        imageHeight={630}
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
  );
}
