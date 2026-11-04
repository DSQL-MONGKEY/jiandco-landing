import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../brand'
import { CloseIcon, InstagramIcon, MenuIcon } from './Icons'
import Wordmark from './Wordmark'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const trigger = triggerRef.current
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) return

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <div className="grid min-h-9 place-items-center bg-burgundy px-5 py-2 text-center text-[0.58rem] leading-[1.5] font-medium tracking-[0.18em] text-main/90 uppercase max-sm:text-[0.52rem]">
        <p className="max-sm:hidden">{brand.announcement}</p>
        <p className="hidden max-sm:block">{brand.announcementShort}</p>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-main/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-line shadow-[0_12px_36px_rgba(17,18,20,0.04)]'
            : 'border-transparent'
        }`}
      >
        <div className="container-page grid h-[4.75rem] grid-cols-[1fr_auto_1fr] items-center gap-6 max-[960px]:grid-cols-[1fr_auto] max-sm:h-[4.25rem]">
          <Link
            className="justify-self-start"
            to="/"
            aria-label={`${brand.name} — kembali ke atas`}
          >
            <Wordmark className="text-[1.85rem]" />
          </Link>

          <nav
            className="hidden items-center gap-[clamp(1.1rem,2.2vw,2.2rem)] min-[961px]:flex"
            aria-label="Navigasi utama"
          >
            {brand.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative py-1.5 text-[0.61rem] font-semibold tracking-[0.16em] uppercase after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-3.5 max-sm:gap-2">
            <a
              className="hidden size-[2.3rem] place-items-center rounded-full border border-line transition-colors hover:border-burgundy hover:bg-burgundy hover:text-main min-[1101px]:grid"
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram ${brand.name}`}
            >
              <InstagramIcon size={16} />
            </a>
            <Link
              className="btn btn-brand hidden min-h-10 text-[0.58rem] min-[641px]:inline-flex"
              to={brand.header.ctaHref}
            >
              {brand.header.ctaLabel}
            </Link>
            <button
              ref={triggerRef}
              className="grid size-11 place-items-center rounded-full border border-line bg-transparent min-[961px]:hidden"
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[100] flex animate-menu-in flex-col overflow-y-auto bg-main"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
        >
          <div className="container-page flex h-[4.75rem] shrink-0 items-center justify-between border-b border-line max-sm:h-[4.25rem]">
            <Wordmark className="text-[1.85rem]" />
            <button
              ref={closeRef}
              className="grid size-11 place-items-center rounded-full border border-line bg-transparent"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <nav
            className="container-page flex flex-1 flex-col justify-center py-8"
            aria-label="Navigasi mobile"
          >
            {brand.nav.map((item, index) => (
              <Link
                className="flex items-baseline gap-4 border-b border-line py-2.5 font-display text-[clamp(2.2rem,9vw,3.5rem)] leading-[1.05] tracking-[-0.03em]"
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
              >
                <span className="font-body text-[0.58rem] tracking-[0.16em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="container-page flex shrink-0 flex-col gap-6 pb-8">
            <Link
              className="btn btn-brand min-h-12"
              to={brand.header.ctaHref}
              onClick={() => setOpen(false)}
            >
              {brand.header.ctaLabel}
            </Link>
            <div className="flex flex-wrap gap-5 text-[0.72rem] text-muted">
              <a
                href={brand.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                {brand.contact.instagram}
              </a>
              <a href={`mailto:${brand.contact.email}`}>
                {brand.contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
