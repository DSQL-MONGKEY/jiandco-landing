import { Link } from 'react-router-dom'
import { brand } from '../brand'
import { ArrowRight, ArrowUpRight } from './Icons'

export default function Hero() {
  const hero = brand.hero

  return (
    <section
      className="scroll-mt-24 bg-main pt-[clamp(1.5rem,3vw,2.75rem)] pb-[clamp(3.5rem,6vw,6rem)]"
      id="home"
    >
      <div className="container-page grid grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] items-center gap-[clamp(2.5rem,5vw,5.5rem)] max-[960px]:grid-cols-1 max-[960px]:gap-10">
        <div className="py-[clamp(1rem,3vw,3rem)] max-[960px]:max-w-[42rem] max-[960px]:pt-4 max-[960px]:pb-0">
          <p className="eyebrow animate-rise [animation-delay:50ms] motion-reduce:animate-none">
            {hero.eyebrow}
          </p>
          <h1 className="mt-[clamp(1.35rem,3vw,2.25rem)] animate-rise font-display text-[clamp(3.6rem,7.1vw,6.9rem)] leading-[0.88] font-normal tracking-[-0.045em] text-balance [animation-delay:120ms] motion-reduce:animate-none max-[960px]:text-[clamp(3.4rem,9vw,5.8rem)] max-sm:text-[clamp(3rem,14vw,4.4rem)] max-sm:leading-[0.92]">
            {hero.title}
            <em className="block italic text-accent">{hero.titleAccent}</em>
          </h1>
          <p className="mt-6 max-w-[29rem] animate-rise text-[0.96rem] leading-[1.8] tracking-[0.002em] text-muted [animation-delay:200ms] motion-reduce:animate-none max-sm:text-[0.92rem]">
            {hero.description}
          </p>

          <div className="mt-[2.1rem] flex animate-rise flex-wrap items-center gap-[1.6rem] [animation-delay:280ms] motion-reduce:animate-none max-sm:gap-[1.1rem]">
            <Link className="btn btn-brand min-h-12" to={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowUpRight size={14} />
            </Link>
            <a className="text-link" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
              <ArrowRight size={14} />
            </a>
          </div>

          <ul className="mt-[clamp(2rem,4vw,3rem)] flex animate-rise flex-wrap gap-x-5 gap-y-2.5 border-t border-line pt-4 text-[0.58rem] leading-[1.5] font-medium tracking-[0.1em] text-muted uppercase [animation-delay:360ms] motion-reduce:animate-none max-sm:flex-col max-sm:gap-2">
            {hero.notes.map((note) => (
              <li
                className="flex items-center gap-2.5 after:size-[3px] after:rotate-45 after:bg-accent last:after:hidden max-sm:after:hidden"
                key={note}
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        <figure className="m-0 animate-rise [animation-delay:180ms] motion-reduce:animate-none max-[960px]:mx-auto max-[960px]:w-full max-[960px]:max-w-[36rem]">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand after:pointer-events-none after:absolute after:inset-0 after:border after:border-ink/[0.07]">
            <img
              className="h-full w-full object-cover object-[50%_42%]"
              src={hero.image}
              alt={hero.imageAlt}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute bottom-[1.1rem] left-[1.1rem] flex flex-col gap-1 border border-main/10 bg-burgundy px-[1.15rem] py-[0.9rem] text-main max-sm:bottom-[0.8rem] max-sm:left-[0.8rem] max-sm:px-[0.9rem] max-sm:py-[0.75rem]">
              <span className="text-[0.53rem] font-semibold tracking-[0.18em] uppercase">
                {hero.imageBadge}
              </span>
              <span className="font-display text-[1.15rem] leading-none italic">
                {hero.imageBadgeSub}
              </span>
            </div>
          </div>
          <figcaption className="mt-[0.8rem] flex justify-between gap-4 text-[0.54rem] tracking-[0.16em] text-muted uppercase max-sm:[&>span:last-child]:hidden">
            <span>{hero.imageCaption}</span>
            <span>{brand.meaning}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
