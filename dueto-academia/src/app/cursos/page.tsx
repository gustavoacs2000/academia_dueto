import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, Users, Music } from "lucide-react";
import { readPhotoLibrary } from "@/lib/photoLibrary";
import { siteConfig } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Cursos de Música em Brasília",
  description:
    "Conheça os cursos de violino, viola de arco, violoncelo, violão e piano da Dueto Academia de Música em Brasília.",
  alternates: {
    canonical: "/cursos",
  },
  openGraph: {
    title: "Cursos de Música em Brasília | Dueto Academia",
    description:
      "Violino, viola de arco, violoncelo, violão e piano para crianças, jovens e adultos.",
    url: "/cursos",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Cursos da Dueto Academia de Música em Brasília",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos de Música em Brasília | Dueto Academia",
    description:
      "Conheça os cursos de violino, viola, violoncelo, violão e piano.",
    images: [siteConfig.ogImage],
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSE_PHOTO_SECTIONS = {
  violino: {
    section: "cursos_violino",
    src: "/images/dueto/gallery-recital-181.webp",
    alt: "Aluna em solo de violino no palco",
  },
  viola: {
    section: "cursos_viola",
    src: "/images/dueto/gallery-recital-200.webp",
    alt: "Professor em apresentacao solo de viola",
  },
  violoncelo: {
    section: "cursos_violoncelo",
    src: "/images/dueto/course-violoncelo.webp",
    alt: "Aula de violoncelo na Dueto Academia",
  },
  violao: {
    section: "cursos_violao",
    src: "/images/dueto/course-violao.webp",
    alt: "Aula de violao na Dueto Academia",
    focalX: 50,
    focalY: 50,
    zoom: 90,
  },
  piano: {
    section: "cursos_piano",
    src: "/images/dueto/course-piano.jpeg",
    alt: "Pessoa tocando piano na Dueto Academia",
    focalX: 50,
    focalY: 50,
    zoom: 100,
  },
} as const;

function objectStyleFromPhoto(photo: { focalX?: number; focalY?: number; zoom?: number }) {
  const focalX = typeof photo.focalX === "number" ? Math.max(0, Math.min(100, photo.focalX)) : 50;
  const focalY = typeof photo.focalY === "number" ? Math.max(0, Math.min(100, photo.focalY)) : 50;
  const zoom = typeof photo.zoom === "number" ? Math.max(50, Math.min(200, photo.zoom)) : 100;

  return {
    objectPosition: `${focalX}% ${focalY}%`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: `${focalX}% ${focalY}%`,
  } as const;
}

const COURSES = [
  {
    id: "violino",
    emoji: "🎻",
    name: "Violino",
    tagline: "Formacao completa no instrumento",
    difficulty: 4,
    difficultyLabel: "Iniciante ao avancado",
    ageFrom: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    description:
      "Aulas para iniciantes e avancados com foco em tecnica, repertorio e expressao musical.",
    content: [
      "Postura e tecnica de arco",
      "Escalas, arpejos e estudos progressivos",
      "Leitura musical aplicada ao instrumento",
      "Repertorio classico e popular",
      "Preparacao para recitais e apresentacoes",
      "Aulas individuais e coletivas",
    ],
    levels: [
      { name: "Iniciante", desc: "Primeiro contato com o instrumento" },
      { name: "Basico", desc: "Com fundamentos de leitura e arco" },
      { name: "Intermediario", desc: "Com repertorio em desenvolvimento" },
      { name: "Avancado", desc: "Com foco tecnico e performatico" },
    ],
    teacher: "Guilherme Alexander, Jordana Rodrigues e Gabriel Mendes",
    highlight: "Curso destaque da Dueto",
    bgFrom: "#FAF6EF",
    bgTo: "#F3EEE5",
  },
  {
    id: "viola",
    emoji: "🎼",
    name: "Viola de Arco",
    tagline: "Tecnica e musicalidade",
    difficulty: 3,
    difficultyLabel: "Iniciante ao avancado",
    ageFrom: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    description:
      "Formacao para quem deseja desenvolver leitura, sonoridade e repertorio na viola de arco.",
    content: [
      "Transicao do violino ou inicio direto na viola",
      "Tecnica de arco e sonoridade da viola",
      "Leitura em clave de do",
      "Repertorio cameristico e solo",
      "Acompanhamento tecnico por nivel",
      "Aulas individuais e coletivas",
    ],
    levels: [
      { name: "Iniciante", desc: "Primeiro contato com a viola de arco" },
      { name: "Intermediario", desc: "Com base tecnica inicial" },
      { name: "Avancado", desc: "Repertorio de camara e orquestral" },
    ],
    teacher: "Equipe de violino da Dueto",
    highlight: null,
    bgFrom: "#F7F1E8",
    bgTo: "#EFE9DE",
  },
  {
    id: "violoncelo",
    emoji: "🎶",
    name: "Violoncelo",
    tagline: "Base tecnica e expressao artistica",
    difficulty: 4,
    difficultyLabel: "Iniciante ao avancado",
    ageFrom: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    description:
      "Aulas de violoncelo com foco em postura, sonoridade e repertorio para diferentes niveis.",
    content: [
      "Postura e ergonomia no instrumento",
      "Tecnica de arco do violoncelo",
      "Posicoes e mudancas de posicao",
      "Estudo de sonoridade e afinacao",
      "Repertorio classico e de conjunto",
      "Aulas individuais e coletivas",
    ],
    levels: [
      { name: "Iniciante", desc: "A partir do primeiro contato" },
      { name: "Intermediario", desc: "Com repertorio em desenvolvimento" },
      { name: "Avancado", desc: "Com foco em performance" },
    ],
    teacher: "Hellen Alvares",
    highlight: null,
    bgFrom: "#FAF6EF",
    bgTo: "#F3EEE5",
  },
  {
    id: "violao",
    emoji: "🎸",
    name: "Violao",
    tagline: "Aprendizado pratico desde a primeira aula",
    difficulty: 2,
    difficultyLabel: "Iniciante a avancado",
    ageFrom: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    description:
      "Aulas personalizadas de violao para tocar com seguranca e musicalidade em pouco tempo.",
    content: [
      "Postura e posicao correta das maos",
      "Acordes, dedilhado e ritmo",
      "Leitura de cifras e partituras",
      "Repertorio conforme objetivo do aluno",
      "Violao classico e popular",
      "Aulas individuais e coletivas",
    ],
    levels: [
      { name: "Iniciante", desc: "Sem experiencia previa" },
      { name: "Basico", desc: "Com acordes e ritmos iniciais" },
      { name: "Intermediario", desc: "Com repertorio em andamento" },
      { name: "Avancado", desc: "Com tecnicas e repertorio amplo" },
    ],
    teacher: "Lucas Rezende",
    highlight: "Aceita iniciantes de qualquer idade",
    bgFrom: "#F7F1E8",
    bgTo: "#EFE9DE",
  },
  {
    id: "piano",
    emoji: "🎹",
    name: "Piano",
    tagline: "Formacao musical e tecnica pianistica",
    difficulty: 3,
    difficultyLabel: "Todos os niveis",
    ageFrom: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    description:
      "Aulas de piano com base tecnica, leitura musical e repertorio para diversos objetivos.",
    content: [
      "Postura e tecnica das maos",
      "Leitura em clave de sol e fa",
      "Escalas, arpejos e estudos",
      "Repertorio classico e popular",
      "Harmonia e acompanhamento",
      "Aulas individuais e coletivas",
    ],
    levels: [
      { name: "Infantil", desc: "Metodo ludico para criancas" },
      { name: "Iniciante", desc: "Primeiros fundamentos no piano" },
      { name: "Intermediario", desc: "Com repertorio em desenvolvimento" },
      { name: "Avancado", desc: "Com foco em performance e tecnica" },
    ],
    teacher: "Alfredo Siqueira",
    highlight: null,
    bgFrom: "#FAF6EF",
    bgTo: "#F3EEE5",
  },
];
// --- Stars component ──────────────────────────────────────────────────────────

function DifficultyStars({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < count ? "text-[#D4A843] fill-[#D4A843]" : "text-stone-200 fill-stone-200"} />
        ))}
      </div>
      <span className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CursosPage() {
  const photoLibrary = await readPhotoLibrary();

  return (
    <div className="bg-[#FAF6EF] pt-16">

      {/* Page header */}
      <div className="bg-[#0A1220] py-20 lg:py-28 px-6 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 38px, rgba(212,168,67,0.5) 38px, rgba(212,168,67,0.5) 39px)", backgroundSize: "100% 50px" }} />
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#D4A843]/60 flex items-center justify-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="w-5 h-px bg-[#D4A843]/35" />
          5 instrumentos
          <span className="w-5 h-px bg-[#D4A843]/35" />
        </p>
        <h1 className="font-normal text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
          Escolha o seu{" "}
          <em className="italic text-[#D4A843]/85" style={{ fontFamily: "'Cormorant Garamond', serif" }}>instrumento</em>
        </h1>
        <p className="text-white/42 text-sm max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Cada curso tem método e repertório adaptados ao instrumento e ao perfil do aluno.
        </p>

        {/* Quick nav */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {COURSES.map(c => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/12 bg-white/6 text-white/55 text-xs hover:text-white hover:border-white/25 transition-all" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span>{c.emoji}</span>{c.name}
            </a>
          ))}
        </div>
      </div>

      {/* Course sections */}
      {COURSES.map((course) => {
        const photoConfig = COURSE_PHOTO_SECTIONS[course.id as keyof typeof COURSE_PHOTO_SECTIONS];
        const libraryPhoto = photoLibrary[photoConfig.section].items[0];
        const coursePhoto = libraryPhoto ?? photoConfig;

        return (
        <section
          key={course.id}
          id={course.id}
          className="py-20 lg:py-28 px-6 lg:px-16 scroll-mt-16"
          style={{ background: `linear-gradient(160deg, ${course.bgFrom} 0%, ${course.bgTo} 100%)` }}
          aria-labelledby={`${course.id}-heading`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              {/* Left — main info */}
              <div>
                {/* Emoji + name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1A2E4A]/6 flex items-center justify-center text-3xl">{course.emoji}</div>
                  <div>
                    <h2 id={`${course.id}-heading`} className="font-normal text-[#0F1820]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400 }}>{course.name}</h2>
                    <p className="text-sm italic text-[#C8A878]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{course.tagline}</p>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Nível de dificuldade</p>
                  <DifficultyStars count={course.difficulty} label={course.difficultyLabel} />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {[
                    { icon: Users, label: course.ageFrom     },
                    { icon: Clock, label: course.duration    },
                    { icon: Music, label: course.frequency   },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-stone-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <Icon size={12} className="text-[#1A2E4A]/35" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-stone-500 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{course.description}</p>

                {/* Highlight badge */}
                {course.highlight && (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#D4A843]/25 bg-[#D4A843]/8 text-xs text-[#1A2E4A]/70 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <Star size={11} className="text-[#D4A843] fill-[#D4A843]" />
                    {course.highlight}
                  </div>
                )}

                {/* CTA */}
                <Link href={`/contato?curso=${course.id}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-all" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Matricular-se em {course.name}
                  <ArrowRight size={13} />
                </Link>

                {/* Levels */}
                <div className="mt-6 rounded-2xl border border-[#1A2E4A]/8 bg-white p-6">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Turmas disponíveis</p>
                  <div className="flex flex-col gap-3">
                    {course.levels.map((level, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 pb-3 border-b border-stone-50 last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium text-[#0F1820]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{level.name}</p>
                          <p className="text-xs text-stone-400 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{level.desc}</p>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: course.levels.length }).map((_, j) => (
                            <div key={j} className={`w-1.5 h-1.5 rounded-full ${j <= i ? "bg-[#1A2E4A]/40" : "bg-stone-100"}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — content + levels */}
              <div className="flex flex-col gap-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#1A2E4A]/8 bg-stone-100 shadow-lg shadow-[#1A2E4A]/10">
                  <Image
                    src={coursePhoto.src}
                    alt={coursePhoto.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    style={objectStyleFromPhoto(coursePhoto)}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(10,18,32,0.45) 0%, rgba(10,18,32,0) 60%)" }}
                  />
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-[#1A2E4A]/8 bg-white p-6">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>O que você vai aprender</p>
                  <div className="flex flex-col gap-2.5">
                    {course.content.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]/60 shrink-0 mt-1.5" />
                        <span className="text-sm text-stone-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher */}
                <p className="text-xs text-stone-400 text-right" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Ministrado por <span className="text-[#1A2E4A]/60 font-medium">{course.teacher}</span>
                </p>
              </div>

            </div>
          </div>
        </section>
        );
      })}
    </div>
  );
}


