import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";
import GalleryCarousel from "@/components/dueto/GalleryCarousel";
import { readPhotoLibrary } from "@/lib/photoLibrary";
import { buildResponsivePhotoStyle } from "@/lib/photoStyles";

const MAPS_PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=QI%2025%2C%20bl.%20A%20-%20Ed.%20Real%20Mix%2C%20sala%20Cobertura%205%20-%20Guar%C3%A1%202%2C%20Bras%C3%ADlia%20-%20DF";
const MAPS_REVIEWS_URL = "https://share.google/sxQ1tfg1loNyqrYFp";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?hl=pt-BR&q=QI%2025%2C%20bl.%20A%20-%20Ed.%20Real%20Mix%2C%20sala%20Cobertura%205%20-%20Guar%C3%A1%202%2C%20Bras%C3%ADlia%20-%20DF&z=17&output=embed";
const HERO_FALLBACK = {
  src: "/images/dueto/hero-home.png",
  alt: "Aluna tocando violino na Dueto Academia de Música",
};
const FILOSOFIA_FALLBACK = {
  src: "/images/dueto/filosofia-sala.jpg",
  alt: "Sala de aula acolhedora da Dueto Academia",
};

export const metadata: Metadata = {
  title: "Home",
  description:
    "A Dueto é um espaço acolhedor para aprender música em Brasília. Aulas de violino, viola de arco, violoncelo, violão e piano a partir de 5 anos.",
};

export const dynamic = "force-dynamic";

// --- Data --------------------------------------------------------------------

const REVIEWS = [
  {
    id: 1,
    name: "Maria Augusta",
    avatar: "/images/dueto/maria_augusta.png",
    initials: "",
    rating: 5,
    text: "Minha filha tem 7 anos e está apaixonada pelas aulas de violino. A professora Ana Clara é incrível — paciente, carinhosa e muito competente. Recomendo sem hesitar!",
    date: "Há 2 semanas",
  },
  {
    id: 2,
    name: "Nathalie Amorim",
    avatar: "/images/dueto/nathalie_amorim.png",
    initials: "",
    rating: 5,
    text: "Comecei aos 42 anos sem nunca ter tocado nenhum instrumento. O Rafael tem um método excepcional para adultos. Em 6 meses já estou tocando peças que eu não imaginava.",
    date: "Há 1 mês",
  },
  {
    id: 3,
    name: "Andre Barros",
    avatar: "/images/dueto/andre_barros.png",
    initials: "",
    rating: 5,
    text: "Ambiente acolhedor, professores dedicados e metodologia diferenciada. Meu filho participa do recital semestral e a evolução dele é visível. Escola incrível!",
    date: "Há 3 semanas",
  },
  {
    id: 4,
    name: "Pedro Vasques",
    avatar: "/images/dueto/pedro_vasques.png",
    initials: "",
    rating: 5,
    text: "A Dueto transformou minha relação com a música. Aprendo violão há 8 meses e o Professor Rafael tem uma habilidade rara de ensinar com leveza e profundidade ao mesmo tempo.",
    date: "Há 2 meses",
  },
];

const GALLERY = [
  { src: "/images/dueto/gallery-recital-009.jpg",  alt: "Orquestra de alunos em apresentação no recital", wide: true  },
  { src: "/images/dueto/gallery-recital-018.jpg",  alt: "Professora e alunos tocando violino no recital", wide: true  },
  { src: "/images/dueto/gallery-recital-181.jpg",  alt: "Aluna em solo de violino no palco",              wide: false },
  { src: "/images/dueto/gallery-recital-188.jpg",  alt: "Aluno em solo de violino durante o recital",     wide: false },
  { src: "/images/dueto/gallery-recital-200.jpg",  alt: "Professor em apresentação solo de viola",         wide: false },
  { src: "/images/dueto/gallery-recital-250.jpg",  alt: "Alunos e professores no palco durante recital",   wide: true  },
  { src: "/images/dueto/gallery-recital-286.jpg",  alt: "Aluna tocando violino ao lado da árvore de Natal",wide: false },
  { src: "/images/dueto/gallery-recital-299.jpg",  alt: "Apresentação coletiva de violinos no palco",      wide: true  },
  { src: "/images/dueto/gallery-recital-327.jpg",  alt: "Professor em apresentação de violino no recital", wide: false },
  { src: "/images/dueto/gallery-recital-329.jpg",  alt: "Aluno se apresentando com violino no recital",    wide: true  },
  { src: "/images/dueto/gallery-recital-344.jpg",  alt: "Foto oficial do grupo após o recital",            wide: true  },
  { src: "/images/dueto/gallery-recital-352.jpg",  alt: "Turma reunida na cerimônia de encerramento",      wide: true  },
  { src: "/images/dueto/gallery-recital-581.jpg",  alt: "Aluna em performance de violino no palco",        wide: true  },
  { src: "/images/dueto/gallery-recital-796.jpg",  alt: "Dueto de cordas em apresentação no recital",      wide: true  },
  { src: "/images/dueto/gallery-recital-871.jpg",  alt: "Professor em solo de viola no recital",           wide: true  },
  { src: "/images/dueto/gallery-recital-1260.jpg", alt: "Grupo de alunos e professores após apresentação", wide: true  },
];

// --- Reusable stars -----------------------------------------------------------

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < count ? "text-[#D4A843] fill-[#D4A843]" : "text-stone-200"} />
      ))}
    </div>
  );
}

// --- Page ---------------------------------------------------------------------

export default async function DuetoHomePage() {
  const photoLibrary = await readPhotoLibrary();
  const heroPhoto = photoLibrary.home_hero.items[0] ?? HERO_FALLBACK;
  const filosofiaPhoto = photoLibrary.home_filosofia.items[0] ?? FILOSOFIA_FALLBACK;
  const galleryPhotos = (photoLibrary.home_galeria.items.length > 0
    ? photoLibrary.home_galeria.items
    : GALLERY
  ).map((item) => ({
    src: item.src,
    alt: item.alt,
    focalX: "focalX" in item ? item.focalX : undefined,
    focalY: "focalY" in item ? item.focalY : undefined,
    zoom: "zoom" in item ? item.zoom : undefined,
    mobileFocalX: "mobileFocalX" in item ? item.mobileFocalX : undefined,
    mobileFocalY: "mobileFocalY" in item ? item.mobileFocalY : undefined,
    mobileZoom: "mobileZoom" in item ? item.mobileZoom : undefined,
  }));

  return (
    <div className="bg-[#FAF6EF]">

      {/* --- 01 - HERO ------------------------------------------------------ */}
      <section className="relative w-full min-h-[100svh] overflow-hidden flex flex-col" aria-label="Dueto Academia de Música">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover dueto-responsive-photo"
            style={buildResponsivePhotoStyle(heroPhoto)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
          />
          {/* Gradient overlay - dark bottom for text */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,18,32,0.85) 0%, rgba(10,18,32,0.45) 45%, rgba(10,18,32,0.15) 100%)" }} />
          {/* Left vignette */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,18,32,0.4) 0%, transparent 55%)" }} />
        </div>

        {/* Content - pinned bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-14 lg:pb-20 px-6 lg:px-16 max-w-3xl">
          <p className="text-[#D4A843]/80 text-[10px] font-medium tracking-[0.22em] uppercase mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="w-6 h-px bg-[#D4A843]/60" />
            Brasília — DF · Desde 2015
          </p>

          <h1 className="font-normal leading-[1.04] text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 400, letterSpacing: "-0.01em" }}>
            Dueto Academia<br />
            <em className="italic text-[#D4A843]/90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>de Música</em>
          </h1>

          <p className="text-white/72 text-base leading-relaxed max-w-xl mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Aprenda violino, viola de arco, violoncelo, violão e piano.
            A Dueto é um espaço acolhedor e inspirador para alunos
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

      {/* --- 02 - FILOSOFIA ------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#FAF6EF]" aria-labelledby="filosofia-heading">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">

          {/* Left - texto */}
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
                Na Dueto, acreditamos que a música é uma linguagem que pertence
                a todos. Não existe idade certa para começar, nem ritmo correto
                para aprender — existe o tempo de cada pessoa, e nós o respeitamos.
              </p>
              <p>
                O ensino personalizado é o coração da nossa escola. Cada aula é
                pensada a partir dos objetivos, da história e da personalidade do
                aluno. Trabalhamos com técnica rigorosa, mas sempre com leveza e
                alegria — porque aprender música deve ser uma experiência
                transformadora, não uma obrigação.
              </p>
              <p>
                Aqui, crianças desenvolvem concentração, coordenação e sensibilidade
                desde os primeiros anos. Adultos redescobrindo a música encontram
                um espaço sem julgamentos, onde o progresso é celebrado em cada
                pequena conquista. E músicos avançados encontram o rigor técnico
                que precisam para ir além.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: "10+", label: "Anos de história"     },
                { value: "200+", label: "Alunos formados"     },
                { value: "5",   label: "Instrumentos"         },
                { value: "5★",  label: "Avaliação no Google"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-normal text-[#0F1820] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>{value}</span>
                  <span className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - image */}
          <div className="relative">
            {/* Decorative blob */}
            <div className="absolute inset-6 rounded-3xl opacity-50" style={{ background: "linear-gradient(135deg, #F0E4D0 0%, #E8D4C0 100%)" }} />
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#1A2E4A]/6 shadow-xl shadow-[#1A2E4A]/8">
              <Image
                src={filosofiaPhoto.src}
                alt={filosofiaPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover dueto-responsive-photo"
                style={buildResponsivePhotoStyle(filosofiaPhoto)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- 03 - MURAL DE FOTOS -------------------------------------------- */}
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

          <GalleryCarousel images={galleryPhotos} intervalMs={5000} />
        </div>
      </section>

      {/* --- 04 - AVALIAÇÕES GOOGLE ----------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#FAF6EF]" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">

          {/* Header */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center gap-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="w-5 h-px bg-[#D4A843]/50" />
                Avaliações
              </p>
              <h2 id="reviews-heading" className="font-normal text-[#0F1820]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400 }}>
                O que nossos alunos{" "}
                <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>dizem</em>
              </h2>
            </div>
            {/* Google badge */}
            <Link
              href={MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#1A2E4A]/8 bg-white transition-colors hover:border-[#1A2E4A]/25"
            >
              <div className="flex flex-col items-center">
                <span className="font-normal text-[#0F1820] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>5.0</span>
                <Stars count={5} />
                <span className="text-[9px] text-stone-400 mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Google Reviews</span>
              </div>
            </Link>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="flex flex-col bg-white rounded-2xl border border-stone-100 p-5 hover:border-[#1A2E4A]/10 hover:shadow-lg hover:shadow-[#1A2E4A]/5 transition-all duration-300">
                {/* Stars */}
                <Stars count={review.rating} />

                {/* Text */}
                <p className="text-sm leading-relaxed text-stone-500 my-4 flex-1 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;{review.text}&rdquo;
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
          <div className="mt-8 flex justify-center">
            <Link
              href={MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1A2E4A]/20 text-[#1A2E4A] text-sm font-medium hover:bg-white transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Ver avaliações e fotos no Google
            </Link>
          </div>
        </div>
      </section>

      {/* --- 05 - LOCALIZAÇÃO ----------------------------------------------- */}
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
                  { icon: "📍", label: "Endereço",  value: "QI 25, bl. A - Ed. Real Mix, sala Cobertura 5 - Guará 2" },
                  { icon: "🕐", label: "Horários",  value: "Segunda a sexta: 09h às 20h · Sábado: 08h às 15h" },
                  { icon: "📞", label: "Telefone",  value: "(61) 99502-9627" },
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

              <Link
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4A843] text-[#0A1220] text-sm font-medium hover:bg-[#e6bc5a] transition-all duration-200"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <MapPin size={14} />
                Como chegar
              </Link>
            </div>

            {/* Google Maps embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/30" style={{ aspectRatio: "16/9" }}>
              <iframe
                title="Localização da Dueto Academia de Música"
                src={MAPS_EMBED_URL}
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

      {/* --- 06 - CTA FINAL ------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-[#FAF6EF] text-center px-6">
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C8A878] flex items-center justify-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="w-5 h-px bg-[#D4A843]/50" />
          Comece agora
          <span className="w-5 h-px bg-[#D4A843]/50" />
        </p>
        <h2 className="font-normal text-[#0F1820] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400 }}>
          Que tal vir conhecer a nossa{" "}
          <em className="italic text-[#1A2E4A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>escola?</em>
        </h2>
        <p className="text-sm text-stone-500 max-w-md mx-auto mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Agende uma aula experimental por R$ 20 e descubra, na prática, qual instrumento tem mais a ver com você. O valor vira desconto na matrícula se você decidir continuar.
        </p>
        <Link href="/contato" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-all duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Agendar aula experimental
          <ArrowRight size={14} />
        </Link>
      </section>

    </div>
  );
}



