import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, YoutubeIcon } from "./SocialBrandIcons";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.43a.5.5 0 0 0 .611.612l5.65-1.48A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.374l-.36-.214-3.713.974.99-3.621-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );
}

const LINKS = [
  { label: "Home",        href: "/"             },
  { label: "Professores", href: "/professores" },
  { label: "Cursos",      href: "/cursos"      },
  { label: "Contato",     href: "/contato"     },
];

const COURSES = [
  { label: "Violino",       href: "/cursos#violino"    },
  { label: "Viola de Arco", href: "/cursos#viola"      },
  { label: "Violoncelo",    href: "/cursos#violoncelo" },
  { label: "Violão",        href: "/cursos#violao"     },
  { label: "Piano",         href: "/cursos#piano"      },
];

export default function DuetoFooter() {
  const year = new Date().getFullYear();
  const socials = [
    { icon: <InstagramIcon size={15} />, href: "https://www.instagram.com/duetoacademiademusica/", label: "Instagram", color: "hover:text-[#E1306C]" },
    { icon: <WhatsAppIcon />,            href: "https://wa.me/5561995029627",                     label: "WhatsApp",  color: "hover:text-[#25D366]" },
    { icon: <YoutubeIcon size={15} />,   href: "https://www.youtube.com/@duetoacademiademusica", label: "YouTube",   color: "hover:text-[#FF0000]"  },
  ];

  return (
    <footer className="bg-[#0A1220] text-white">

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_1fr_1fr] gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-[136px] h-[92px] shrink-0">
              <Image
                src="/images/dueto/brand-logo-white.png"
                alt="Logo da Dueto Academia de Música"
                fill
                sizes="136px"
                className="object-contain object-left"
              />
            </div>
            <div className="relative w-11 h-11 hidden sm:block">
              <Image
                src="/images/dueto/brand-sublogo-white.png"
                alt="Sublogo da Dueto Academia de Música"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-sm leading-relaxed text-white/40 mb-5 max-w-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Espaço acolhedor para aprender música em Brasília. Violino, viola, violoncelo, violão e piano para todas as idades.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-[9px] font-semibold tracking-widest uppercase text-white/22 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Páginas</p>
          <div className="flex flex-col gap-2.5">
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-white/42 hover:text-white/80 transition-colors duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div>
          <p className="text-[9px] font-semibold tracking-widest uppercase text-white/22 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cursos</p>
          <div className="flex flex-col gap-2.5">
            {COURSES.map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-white/42 hover:text-[#D4A843]/70 transition-colors duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[9px] font-semibold tracking-widest uppercase text-white/22 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contato</p>
          <div className="flex flex-col gap-3 text-sm text-white/42" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {socials.map(({ icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 hover:text-white/70 transition-colors ${color}`}>
                <span className="w-4 text-white/35">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 lg:px-12 py-4">
          <p className="text-[11px] text-white/18" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>© {year} Dueto Academia de Música. Todos os direitos reservados.</p>
        </div>
      </div>

    </footer>
  );
}

