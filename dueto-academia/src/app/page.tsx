import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A Dueto Ã© um espaÃ§o acolhedor para aprender mÃºsica em BrasÃ­lia. Aulas de violino, viola de arco, violoncelo, violÃ£o e piano a partir de 5 anos.",
};

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const REVIEWS = [
  {
    id: 1,
    name: "Mariana Souza",
    avatar: "/images/dueto/review-mariana.jpg",
    initials: "MS",
    rating: 5,
    text: "Minha filha tem 7 anos e estÃ¡ apaixonada pelas aulas de violino. A professora Ana Clara Ã© incrÃ­vel â€” paciente, carinhosa e muito competente. Recomendo sem hesitar!",
    date: "HÃ¡ 2 semanas",
  },
  {
    id: 2,
    name: "Carlos Henrique",
    avatar: "/images/dueto/review-carlos.jpg",
    initials: "CH",
    rating: 5,
    text: "Comecei aos 42 anos sem nunca ter tocado nenhum instrumento. O Rafael tem um mÃ©todo excepcional para adultos. Em 6 meses jÃ¡ estou tocando peÃ§as que eu nÃ£o imaginava.",
    date: "HÃ¡ 1 mÃªs",
  },
  {
    id: 3,
    name: "PatrÃ­cia Lima",
    avatar: "/images/dueto/review-patricia.jpg",
    initials: "PL",
    rating: 5,
    text: "Ambiente acolhedor, professores dedicados e metodologia diferenciada. Meu filho participa do recital semestral e a evoluÃ§Ã£o dele Ã© visÃ­vel. Escola incrÃ­vel!",
    date: "HÃ¡ 3 semanas",
  },
  {
    id: 4,
    name: "Roberto Alves",
    avatar: "/images/dueto/review-roberto.jpg",
    initials: "RA",
    rating: 5,
    text: "A Dueto transformou minha relaÃ§Ã£o com a mÃºsica. Aprendo violÃ£o hÃ¡ 8 meses e o Professor Rafael tem uma habilidade rara de ensinar com leveza e profundidade ao mesmo tempo.",
    date: "HÃ¡ 2 meses",
  },
];

const GALLERY = [
  { src: "/images/dueto/gallery-1.jpg", alt: "Fachada da Dueto Academia de MÃºsica", wide: true  },
  { src: "/images/dueto/gallery-2.jpg", alt: "Sala de aula de violino",             wide: false },
  { src: "/images/dueto/gallery-3.jpg", alt: "Recital semestral dos alunos",        wide: false },
  { src: "/images/dueto/gallery-4.jpg", alt: "Professores Rafael e Ana Clara",      wide: false },
  { src: "/images/dueto/gallery-5.jpg", alt: "Aluno aprendendo violoncelo",         wide: true  },
  { src: "/images/dueto/gallery-6.jpg", alt: "ApresentaÃ§Ã£o dos alunos infantis",    wide: false },
];

// â”€â”€â”€ Reusable stars â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < count ? "text-[#D4A843] fill-[#D4A843]" : "text-stone-200"} />
      ))}
    </div>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function DuetoHomePage() {
  return (
    <div className="bg-[#FAF6EF]">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          01 â€” HERO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative w-full min-h-[100svh] overflow-hidden flex flex-col" aria-label="Dueto Academia de MÃºsica">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/dueto/hero-facade.jpg"
            alt="Fachada da Dueto Academia de MÃºsica em BrasÃ­lia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
          />
          {/* Gradient overlay â€” dark bottom for text */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,18,32,0.85) 0%, rgba(10,18,32,0.45) 45%, rgba(10,18,32,0.15) 100%)" }} />
          {/* Left vignette */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,18,32,0.4) 0%, transparent 55%)" }} />
        </div>

        {/* Content â€” pinned bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-14 lg:pb-20 px-6 lg:px-16 max-w-3xl">
          <p className="text-[#D4A843]/80 text-[10px] font-medium tracking-[0.22em] uppercase mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="w-6 h-px bg-[#D4A843]/60" />
            BrasÃ­lia â€” DF Â· Desde 2015
          </p>

          <h1 className="font-normal leading-[1.04] text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 400, letterSpacing: "-0.01em" }}>
            Dueto Academia<br />
            <em className="italic text-[#D4A843]/90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>de MÃºsica</em>
          </h1>

          <p className="text-white/72 text-base leading-relaxed max-w-xl mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Aprenda violino, viola de arco, violoncelo, violÃ£o e piano.
            A Dueto Ã© um espaÃ§o acolhedor e inspirador para alunos
            a partir de 5 anos.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/cursos" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0F1820] text-sm font-medium hover:bg-stone-100 transition-all duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Conhecer os cursos
              <ArrowRight size={14} />
            </Link>
            <Link href="/contato" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-all duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Matricular-se
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-white/25" aria-hidden="true">
          <span className="text-[8px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Role</span>
          <div className="w-px h-8 bg-white/15 animate-bounce" />
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          02 â€” FILOSOFIA
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#FAF6EF]" aria-labelledby="filosofia-heading">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">

          {/* Left â€” texto */}
          <div>
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center gap-2 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="w-5 h-px bg-[#D4A843]/50" />
              Nossa filosofia
            </p>
            <h2 id="filosofia-heading" className="font-normal leading-tight text-[#0F1820] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 400 }}>
              Cada aluno aprende no{" "}
              <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>seu tempo.</em>
            </h2>

            <div className="flex flex-col gap-4 text-sm leading-relaxed text-stone-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <p>
                Na Dueto, acreditamos que a mÃºsica Ã© uma linguagem que pertence
                a todos. NÃ£o existe idade certa para comeÃ§ar, nem ritmo correto
                para aprender â€” existe o tempo de cada pessoa, e nÃ³s o respeitamos.
              </p>
              <p>
                O ensino personalizado Ã© o coraÃ§Ã£o da nossa escola. Cada aula Ã©
                pensada a partir dos objetivos, da histÃ³ria e da personalidade do
                aluno. Trabalhamos com tÃ©cnica rigorosa, mas sempre com leveza e
                alegria â€” porque aprender mÃºsica deve ser uma experiÃªncia
                transformadora, nÃ£o uma obrigaÃ§Ã£o.
              </p>
              <p>
                Aqui, crianÃ§as desenvolvem concentraÃ§Ã£o, coordenaÃ§Ã£o e sensibilidade
                desde os primeiros anos. Adultos redescobrindo a mÃºsica encontram
                um espaÃ§o sem julgamentos, onde o progresso Ã© celebrado em cada
                pequena conquista. E mÃºsicos avanÃ§ados encontram o rigor tÃ©cnico
                que precisam para ir alÃ©m.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: "10+", label: "Anos de histÃ³ria"     },
                { value: "200+", label: "Alunos formados"     },
                { value: "5",   label: "Instrumentos"         },
                { value: "5â˜…",  label: "AvaliaÃ§Ã£o no Google"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-normal text-[#0F1820] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>{value}</span>
                  <span className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right â€” image */}
          <div className="relative">
            {/* Decorative blob */}
            <div className="absolute inset-6 rounded-3xl opacity-50" style={{ background: "linear-gradient(135deg, #F0E4D0 0%, #E8D4C0 100%)" }} />
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#1A2E4A]/6 shadow-xl shadow-[#1A2E4A]/8">
              <Image
                src="/images/dueto/filosofia-sala.jpg"
                alt="Sala de aula acolhedora da Dueto Academia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
              />
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          03 â€” MURAL DE FOTOS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 lg:py-28 bg-[#F0EBE0]" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center justify-center gap-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="w-5 h-px bg-[#D4A843]/50" />
              Galeria
              <span className="w-5 h-px bg-[#D4A843]/50" />
            </p>
            <h2 id="gallery-heading" className="font-normal text-[#0F1820]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400 }}>
              Nossa academia em{" "}
              <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>imagens</em>
            </h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl group ${img.wide ? "col-span-2 aspect-video" : "aspect-square"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
                />
                <div className="absolute inset-0 bg-[#0A1220]/0 group-hover:bg-[#0A1220]/20 transition-colors duration-300" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(10,18,32,0.7), transparent)" }}>
                  <p className="text-white/85 text-[10px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          04 â€” AVALIAÃ‡Ã•ES GOOGLE
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 lg:py-32 bg-[#FAF6EF]" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">

          {/* Header */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center gap-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="w-5 h-px bg-[#D4A843]/50" />
                AvaliaÃ§Ãµes
              </p>
              <h2 id="reviews-heading" className="font-normal text-[#0F1820]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400 }}>
                O que nossos alunos{" "}
                <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>dizem</em>
              </h2>
            </div>
            {/* Google badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#1A2E4A]/8 bg-white">
              <div className="flex flex-col items-center">
                <span className="font-normal text-[#0F1820] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>5.0</span>
                <Stars count={5} />
                <span className="text-[9px] text-stone-400 mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="flex flex-col bg-white rounded-2xl border border-stone-100 p-5 hover:border-[#1A2E4A]/10 hover:shadow-lg hover:shadow-[#1A2E4A]/5 transition-all duration-300">
                {/* Stars */}
                <Stars count={review.rating} />

                {/* Text */}
                <p className="text-sm leading-relaxed text-stone-500 my-4 flex-1 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "{review.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-stone-50 mb-4" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#1A2E4A]/8 shrink-0 flex items-center justify-center">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                    {/* Fallback initials shown via CSS if image fails */}
                    <span className="text-xs font-semibold text-[#1A2E4A]/60 absolute" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {review.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F1820] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{review.name}</p>
                    <p className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          05 â€” LOCALIZAÃ‡ÃƒO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="bg-[#0A1220] py-24 lg:py-32" aria-labelledby="location-heading">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-center">

            {/* Info */}
            <div>
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#D4A843]/60 flex items-center gap-2 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="w-5 h-px bg-[#D4A843]/35" />
                Onde estamos
              </p>
              <h2 id="location-heading" className="font-normal text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400 }}>
                Venha nos{" "}
                <em className="italic text-[#D4A843]/80" style={{ fontFamily: "'Cormorant Garamond', serif" }}>visitar</em>
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: "ðŸ“", label: "EndereÃ§o",  value: "SQS 316, Bloco B, Apartamento 101, Asa Sul â€” BrasÃ­lia, DF" },
                  { icon: "ðŸ•", label: "HorÃ¡rios",  value: "Segunda a Sexta: 8hâ€“21h Â· SÃ¡bado: 8hâ€“14h" },
                  { icon: "ðŸ“ž", label: "Telefone",  value: "(61) 9 9999-9999" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 text-base">{icon}</div>
                    <div>
                      <p className="text-[10px] text-white/28" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
                      <p className="text-sm text-white/65" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4A843] text-[#0A1220] text-sm font-medium hover:bg-[#e6bc5a] transition-all duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <MapPin size={14} />
                Como chegar
              </Link>
            </div>

            {/* Google Maps embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/30" style={{ aspectRatio: "16/9" }}>
              <iframe
                title="LocalizaÃ§Ã£o da Dueto Academia de MÃºsica"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.4!2d-47.9252!3d-15.8267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ5JzM2LjEiUyA0N8KwNTUnMzAuNyJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          06 â€” CTA FINAL
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 lg:py-24 bg-[#FAF6EF] text-center px-6">
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center justify-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="w-5 h-px bg-[#D4A843]/50" />
          Comece agora
          <span className="w-5 h-px bg-[#D4A843]/50" />
        </p>
        <h2 className="font-normal text-[#0F1820] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400 }}>
          Sua primeira aula Ã©{" "}
          <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>gratuita.</em>
        </h2>
        <p className="text-sm text-stone-500 max-w-md mx-auto mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Venha conhecer a Dueto sem compromisso. Agende uma aula experimental e descubra o instrumento que mais combina com vocÃª.
        </p>
        <Link href="/contato" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-all duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Agendar aula experimental
          <ArrowRight size={14} />
        </Link>
      </section>

    </div>
  );
}

