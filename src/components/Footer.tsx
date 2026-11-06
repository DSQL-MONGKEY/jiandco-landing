import { Link } from "react-router-dom";
import { brand, type FooterColumn } from "../brand";
import { ArrowUp, InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";
import Wordmark from "./Wordmark";

export default function Footer() {
  const footer = brand.footer;
  const contactColumn: FooterColumn = {
    title: footer.contactTitle,
    links: [
      {
        label: "WhatsApp",
        href: `https://wa.me/${brand.contact.whatsapp}`,
        external: true,
      },
      { label: "Email", href: `mailto:${brand.contact.email}` },
      {
        label: "Instagram",
        href: brand.contact.instagramUrl,
        external: true,
      },
    ],
  };
  const columns = [...footer.columns.slice(0, 1), contactColumn, ...footer.columns.slice(1)];

  return (
    <footer
      className="scroll-mt-24 overflow-hidden border-t border-main/15 bg-burgundy text-main/70"
      id="contact"
    >
      <div className="container-page">
        <div className="grid grid-cols-[1.4fr_repeat(3,minmax(0,0.8fr))] gap-[clamp(2rem,4vw,4rem)] py-[clamp(3.5rem,7vw,6rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[960px]:grid-cols-3 max-[760px]:grid-cols-2">
          <div className="max-[960px]:col-span-full">
            <Wordmark className="text-[2rem] text-main [&_em]:text-secondary" />
            <p className="mt-[1.15rem] max-w-[24rem] text-[0.88rem] leading-[1.8] text-main/65">
              {footer.blurb}
            </p>
            <div className="mt-[1.6rem] flex gap-3">
              <a
                className="grid size-10 place-items-center rounded-full border border-main/25 transition-colors hover:border-secondary hover:bg-secondary hover:text-burgundy focus-visible:outline-main"
                href={brand.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${brand.name}`}
              >
                <InstagramIcon size={16} />
              </a>
              <a
                className="grid size-10 place-items-center rounded-full border border-main/25 transition-colors hover:border-secondary hover:bg-secondary hover:text-burgundy focus-visible:outline-main"
                href={`https://wa.me/${brand.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${brand.name}`}
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                className="grid size-10 place-items-center rounded-full border border-main/25 transition-colors hover:border-secondary hover:bg-secondary hover:text-burgundy focus-visible:outline-main"
                href={`mailto:${brand.contact.email}`}
                aria-label={`Email ${brand.name}`}
              >
                <MailIcon size={16} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-[1.15rem] font-body text-[0.58rem] font-semibold tracking-[0.18em] text-main uppercase">
                {column.title}
              </h2>
              {column.links ? (
                <ul className="flex flex-col gap-[0.65rem]">
                  {column.links.map((link) =>
                    link.external ||
                    link.href.startsWith("http") ||
                    link.href.startsWith("mailto:") ? (
                      <li key={link.label}>
                        <a
                          className="text-[0.82rem] leading-[1.6] text-main/65 transition-colors hover:text-secondary focus-visible:outline-main"
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          className="text-[0.82rem] leading-[1.6] text-main/65 transition-colors hover:text-secondary focus-visible:outline-main"
                          to={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <ul className="flex flex-col gap-[0.65rem]">
                  {column.lines?.map((line) => (
                    <li className="text-[0.82rem] leading-[1.6] text-main/65" key={line}>
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-main/15 py-[1.4rem] text-[0.62rem] leading-[1.6] tracking-[0.02em] text-main/60 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2.5">
          <div className="space-y-1">
            <p>{footer.rights}</p>
            <p>{footer.trademark}</p>
          </div>
          <p>
            {footer.creditPrefix}{" "}
            <a
              className="underline underline-offset-[3px] transition-colors hover:text-secondary focus-visible:outline-main"
              href={footer.creditHref}
              target="_blank"
              rel="noreferrer"
            >
              {footer.creditLabel}
            </a>
          </p>
          <Link
            className="inline-flex items-center gap-[0.45rem] text-[0.56rem] font-semibold tracking-[0.14em] text-main/75 uppercase transition-colors hover:text-secondary focus-visible:outline-main"
            to="/"
          >
            {footer.backToTop}
            <ArrowUp size={12} />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden border-t border-main/10" aria-hidden="true">
        <Wordmark className="block w-full pt-[0.12em] text-center text-[clamp(7rem,23vw,21rem)] leading-[0.68] font-normal tracking-[-0.06em] text-main/[0.06] whitespace-nowrap [&_em]:text-secondary/[0.18] max-sm:text-[clamp(6rem,31vw,12rem)]" />
      </div>
    </footer>
  );
}
