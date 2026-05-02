import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, Music, ArrowRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/dueto/SocialBrandIcons";
import { readPhotoLibrary } from "@/lib/photoLibrary";
import { buildResponsivePhotoStyle } from "@/lib/photoStyles";

export const metadata: Metadata = {
  title: "Professores",
  description: "Conheca os professores da Dueto Academia de Musica em Brasilia.",
};

export const dynamic = "force-dynamic";

const TEACHER_PHOTO_SECTIONS = {
  guilherme: "professores_guilherme",
  jordana: "professores_jordana",
  gabriel: "professores_gabriel",
  lucas: "professores_lucas",
  hellen: "professores_hellen",
  alfredo: "professores_alfredo",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEACHERS = [
  {
    id: "guilherme",
    name: "Guilherme Alexander",
    role: "Socio e Professor de Violino",
    instrument: "Violino",
    imageSrc: "/images/dueto/teacher-guilherme.jpeg",
    imageAlt: "Guilherme Alexander, professor de violino",
    bio: [
      "Professor integrante da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music" as const, text: "Professor de violino" },
      { icon: "award" as const, text: "Socio da Dueto Academia" },
      { icon: "graduation" as const, text: "Release em breve" },
    ],
    teaches: ["Violino - iniciacao", "Violino - intermediario", "Aulas individuais e coletivas"],
    instagram: null,
    youtube: null,
  },
  {
    id: "jordana",
    name: "Jordana Rodrigues",
    role: "Socia e Professora de Violino",
    instrument: "Violino",
    imageSrc: "/images/dueto/teacher-jordana.jpeg",
    imageAlt: "Jordana Rodrigues, professora de violino",
    bio: [
      "Professora integrante da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music" as const, text: "Professora de violino" },
      { icon: "award" as const, text: "Socia da Dueto Academia" },
      { icon: "graduation" as const, text: "Release em breve" },
    ],
    teaches: ["Violino - iniciacao", "Violino - intermediario", "Aulas individuais e coletivas"],
    instagram: null,
    youtube: null,
  },
  {
    id: "gabriel",
    name: "Gabriel Mendes",
    role: "Professor de Violino",
    instrument: "Violino",
    imageSrc: "/images/dueto/teacher-gabriel.jpeg",
    imageAlt: "Gabriel Mendes, professor de violino",
    bio: [
      "Professor da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music" as const, text: "Professor de violino" },
      { icon: "award" as const, text: "Equipe Dueto" },
      { icon: "graduation" as const, text: "Release em breve" },
    ],
    teaches: ["Violino - iniciacao", "Violino - intermediario", "Aulas individuais e coletivas"],
    instagram: null,
    youtube: null,
  },
  {
    id: "lucas",
    name: "Lucas Rezende",
    role: "Professor de Violao",
    instrument: "Violao",
    imageSrc: "/images/dueto/teacher-lucas.jpeg",
    imageAlt: "Lucas Rezende, professor de violao",
    bio: [
      "Professor de violao com quase 20 anos de experiencia no instrumento, dedicado a ensinar alunos de todas as idades, de criancas a adultos.",
      "Cursou Licenciatura em Musica pela UnB e violao erudito pela Escola de Musica de Brasilia. Sua abordagem une base tecnica solida e pratica musical desde o inicio.",
    ],
    credentials: [
      { icon: "graduation" as const, text: "Licenciatura em Musica pela UnB" },
      { icon: "award" as const, text: "Formacao em violao erudito na Escola de Musica de Brasilia" },
      { icon: "music" as const, text: "Quase 20 anos de experiencia no instrumento" },
    ],
    teaches: ["Violao para criancas e adultos", "Violao classico e popular", "Aulas personalizadas"],
    instagram: null,
    youtube: null,
  },
  {
    id: "hellen",
    name: "Hellen Alvares",
    role: "Professora de Violoncelo",
    instrument: "Violoncelo",
    imageSrc: "/images/dueto/teacher-hellen.jpeg",
    imageAlt: "Hellen Alvares, professora de violoncelo",
    bio: [
      "Educadora musical e violoncelista, atuante em Brasilia-DF, com experiencia no ensino coletivo de cordas e em projetos culturais para criancas, jovens e adultos.",
      "Licencianda em Musica pelo Claretiano Centro Universitario, aluna da Escola de Musica de Brasilia e com participacao na Academia Claude Brendel e Brasilia Cello Academia.",
    ],
    credentials: [
      { icon: "graduation" as const, text: "Licencianda em Musica pelo Claretiano Centro Universitario" },
      { icon: "award" as const, text: "Aluna da Escola de Musica de Brasilia" },
      { icon: "music" as const, text: "Atuacao em projetos sociais e educacionais" },
    ],
    teaches: ["Violoncelo para criancas e adultos", "Aulas individuais e coletivas", "Iniciante ao avancado"],
    instagram: null,
    youtube: null,
  },
  {
    id: "alfredo",
    name: "Alfredo Siqueira",
    role: "Professor de Piano",
    instrument: "Piano",
    imageSrc: "/images/dueto/teacher-alfredo.png",
    imageAlt: "Alfredo Siqueira, professor de piano",
    bio: [
      "Natural do Mato Grosso do Sul, Alfredo Ericeira e graduado em Musica (Licenciatura) pela UFMS e mestre em Musica com enfase em Regencia pela UnB.",
      "Pianista e professor de piano ha mais de 20 anos, tambem atua como maestro, compositor e arranjador, com mais de 100 criacoes e forte atuacao em preparacao de alunos para a Escola de Musica de Brasilia.",
    ],
    credentials: [
      { icon: "graduation" as const, text: "Graduado em Musica pela UFMS" },
      { icon: "award" as const, text: "Mestre em Musica (Regencia) pela UnB" },
      { icon: "music" as const, text: "Professor de piano ha mais de 20 anos" },
    ],
    teaches: ["Piano para criancas e adultos", "Formacao tecnica e repertorio", "Preparacao para Escola de Musica de Brasilia"],
    instagram: null,
    youtube: null,
  },
];
const ICON_MAP = {
  graduation: GraduationCap,
  award:      Award,
  music:      Music,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProfessoresPage() {
  const photoLibrary = await readPhotoLibrary();

  return (
    <div className="bg-[#FAF6EF] pt-16">

      {/* ── Page header ── */}
      <div className="bg-[#0A1220] py-20 lg:py-28 px-6 lg:px-16 text-center relative overflow-hidden">
        {/* Staff lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 38px, rgba(212,168,67,0.5) 38px, rgba(212,168,67,0.5) 39px)", backgroundSize: "100% 50px" }} />
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#D4A843]/60 flex items-center justify-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="w-5 h-px bg-[#D4A843]/35" />
          Conheça o time
          <span className="w-5 h-px bg-[#D4A843]/35" />
        </p>
        <h1 className="font-normal text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
          Os professores da{" "}
          <em className="italic text-[#D4A843]/85" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Dueto</em>
        </h1>
        <p className="text-white/45 text-sm max-w-xl mx-auto mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Dois músicos com formação sólida, anos de palco e um amor genuíno por ensinar.
        </p>
      </div>

      {/* ── Teacher cards ── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-16 py-20 lg:py-28 flex flex-col gap-20">
        {TEACHERS.map((teacher, index) => {
          const photoSection = TEACHER_PHOTO_SECTIONS[teacher.id as keyof typeof TEACHER_PHOTO_SECTIONS];
          const libraryPhoto = photoLibrary[photoSection].items[0];
          const teacherPhoto = libraryPhoto ?? { src: teacher.imageSrc, alt: teacher.imageAlt };
          const isEven = index % 2 === 0;
          return (
            <div
              key={teacher.id}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Photo */}
              <div className="relative">
                <div className="absolute inset-4 rounded-2xl opacity-40" style={{ background: "linear-gradient(145deg, #C8A878 0%, #1A2E4A 100%)" }} />
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#1A2E4A]/8 shadow-xl shadow-[#1A2E4A]/10">
                  <Image
                    src={teacherPhoto.src}
                    alt={teacherPhoto.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover dueto-responsive-photo"
                    style={buildResponsivePhotoStyle(teacherPhoto)}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
                  />
                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, rgba(10,18,32,0.7), transparent)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-normal text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em" }}>{teacher.name}</p>
                    <p className="text-white/50 text-[10px] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{teacher.instrument}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#C8A878] flex items-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <span className="w-4 h-px bg-[#D4A843]/40" />
                  {teacher.role}
                </p>

                <h2 className="font-normal text-[#0F1820] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 400 }}>
                  {teacher.name}
                </h2>
                <p className="text-sm italic text-[#C8A878] mb-7" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {teacher.instrument}
                </p>

                {/* Bio */}
                <div className="flex flex-col gap-3 mb-8">
                  {teacher.bio.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-stone-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p}</p>
                  ))}
                </div>

                {/* Credentials */}
                <div className="rounded-xl border border-[#1A2E4A]/8 bg-white p-5 mb-6">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Formação & credenciais
                  </p>
                  <div className="flex flex-col gap-3">
                    {teacher.credentials.map((cred, i) => {
                      const Icon = ICON_MAP[cred.icon];
                      return (
                        <div key={i} className="flex items-center gap-2.5">
                          <Icon size={13} className="text-[#D4A843]/60 shrink-0" />
                          <span className="text-xs text-stone-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{cred.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What they teach */}
                <div className="mb-7">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Leciona
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.teaches.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-[#1A2E4A]/10 bg-[#1A2E4A]/4 text-[#1A2E4A]/70" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link href="/contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-all" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Agendar aula com {teacher.name.split(" ")[0]}
                    <ArrowRight size={13} />
                  </Link>
                  <div className="flex gap-2">
                    {teacher.instagram && (
                      <a href={teacher.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1A2E4A]/10 flex items-center justify-center text-stone-400 hover:text-[#E1306C] hover:border-[#E1306C]/25 transition-all" aria-label="Instagram">
                        <InstagramIcon size={15} />
                      </a>
                    )}
                    {teacher.youtube && (
                      <a href={teacher.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1A2E4A]/10 flex items-center justify-center text-stone-400 hover:text-[#FF0000] hover:border-[#FF0000]/25 transition-all" aria-label="YouTube">
                        <YoutubeIcon size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote */}
      <div className="bg-[#0A1220] py-16 px-6 text-center">
        <span className="text-5xl text-[#D4A843]/20 font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;</span>
        <p className="text-white/45 text-base italic max-w-lg mx-auto mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Ensinar música é abrir uma porta para uma linguagem que existe há séculos e nunca envelhece.
        </p>
        <p className="text-[#D4A843]/50 text-[10px] tracking-widest uppercase mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Equipe Dueto</p>
      </div>
    </div>
  );
}


