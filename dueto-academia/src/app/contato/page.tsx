"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/dueto/SocialBrandIcons";

// metadata must be in a server component - move to a separate file if needed
// export const metadata: Metadata = { title: "Contato", description: "..." };

interface FormData {
  name: string;
  phone: string;
  email: string;
  age: string;
  course: string;
  schedule: string;
  message: string;
}

const COURSES = ["Violino", "Viola de Arco", "Violoncelo", "ViolÃ£o", "Piano", "Ainda nÃ£o sei"];
const SCHEDULES = ["ManhÃ£ (8h-12h)", "Tarde (13h-17h)", "Noite (18h-21h)", "SÃ¡bado", "Qualquer horÃ¡rio"];
const MAPS_URL =
  "https://www.google.com/maps/place/Dueto+Academia+de+M%C3%BAsica/@-15.8358993,-47.9813545,17z/data=!3m1!4b1!4m6!3m5!1s0x935a3367f5e8d41f:0x1f1a1f4d09e38497!8m2!3d-15.8359045!4d-47.9787796!16s%2Fg%2F11ptmc9m53?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D";
const CONTACT_FALLBACK = {
  src: "/images/dueto/hero-dueto.jpeg",
  alt: "Entrada da Dueto Academia de Musica em Brasilia",
  focalX: 50,
  focalY: 50,
  zoom: 90,
};

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim())  errors.name  = "Informe seu nome";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone invÃ¡lido";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "E-mail invÃ¡lido";
  if (!data.course)       errors.course = "Selecione um curso";
  return errors;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1A2E4A]/65" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}{required && <span className="text-[#D4A843] ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[10px] text-red-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <AlertCircle size={10} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white text-[#0F1820] placeholder:text-stone-300 ${
    hasError ? "border-red-300 focus:border-red-400" : "border-[#1A2E4A]/10 focus:border-[#1A2E4A]/35 focus:ring-2 focus:ring-[#1A2E4A]/5"
  }`;

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.43a.5.5 0 0 0 .611.612l5.65-1.48A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.374l-.36-.214-3.713.974.99-3.621-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );
}

export default function ContatoPage() {
  const [data, setData] = useState<FormData>({ name: "", phone: "", email: "", age: "", course: "", schedule: "", message: "" });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [contactPhoto, setContactPhoto] = useState(CONTACT_FALLBACK);

  useEffect(() => {
    let active = true;

    async function loadContactPhoto() {
      try {
        const response = await fetch("/api/photo-library", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as {
          library?: { contato_capa?: { items?: { src: string; alt: string; focalX?: number; focalY?: number; zoom?: number }[] } };
        };

        const first = payload.library?.contato_capa?.items?.[0];
        if (!first || !active) return;

        setContactPhoto({
          src: first.src || CONTACT_FALLBACK.src,
          alt: first.alt || CONTACT_FALLBACK.alt,
          focalX: typeof first.focalX === "number" ? first.focalX : CONTACT_FALLBACK.focalX,
          focalY: typeof first.focalY === "number" ? first.focalY : CONTACT_FALLBACK.focalY,
          zoom: typeof first.zoom === "number" ? first.zoom : CONTACT_FALLBACK.zoom,
        });
      } catch {
        // MantÃ©m fallback em caso de falha na leitura da biblioteca.
      }
    }

    void loadContactPhoto();
    return () => {
      active = false;
    };
  }, []);

  const onChange = useCallback((field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const handleSubmit = useCallback(async () => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  }, [data]);

  return (
    <div className="bg-[#FAF6EF] pt-16">

      {/* Page header */}
      <div className="bg-[#0A1220] py-20 lg:py-28 px-6 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 38px, rgba(212,168,67,0.5) 38px, rgba(212,168,67,0.5) 39px)", backgroundSize: "100% 50px" }} />
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#D4A843]/60 flex items-center justify-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="w-5 h-px bg-[#D4A843]/35" />
          Fale conosco
          <span className="w-5 h-px bg-[#D4A843]/35" />
        </p>
        <h1 className="font-normal text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
          Comece sua jornada{" "}
          <em className="italic text-[#D4A843]/85" style={{ fontFamily: "'Cormorant Garamond', serif" }}>musical</em>
        </h1>
        <p className="text-white/42 text-sm max-w-md mx-auto mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          A primeira aula Ã© sempre gratuita. Sem compromisso.
        </p>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">

          {/* LEFT - Image + info */}
          <div className="flex flex-col gap-8">
            {/* Academy image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#1A2E4A]/8 shadow-xl shadow-[#1A2E4A]/8 bg-[#0A1220]/10">
              <Image
                src={contactPhoto.src}
                alt={contactPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{
                  objectPosition: `${contactPhoto.focalX ?? 50}% ${contactPhoto.focalY ?? 50}%`,
                  transform: `scale(${(contactPhoto.zoom ?? 100) / 100})`,
                  transformOrigin: `${contactPhoto.focalX ?? 50}% ${contactPhoto.focalY ?? 50}%`,
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
              />
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <MapPin size={16}/>,     label: "EndereÃ§o", value: "SQS 316, Bloco B, Ap. 101 - Asa Sul, BrasÃ­lia-DF", href: MAPS_URL },
                { icon: <WhatsAppIcon />,            label: "WhatsApp", value: "(61) 99502-9627", href: "https://wa.me/5561995029627" },
                { icon: <InstagramIcon size={16} />, label: "Instagram", value: "@duetoacademiademusica", href: "https://www.instagram.com/duetoacademiademusica/" },
                { icon: <YoutubeIcon size={16} />,   label: "YouTube",   value: "@duetoacademiademusica", href: "https://www.youtube.com/@duetoacademiademusica" },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1A2E4A]/6 border border-[#1A2E4A]/8 flex items-center justify-center text-[#1A2E4A]/50 shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1A2E4A]/75 hover:text-[#1A2E4A] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</a>
                    ) : (
                      <p className="text-sm text-stone-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="rounded-xl border border-[#1A2E4A]/8 bg-white p-5">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>HorÃ¡rios de funcionamento</p>
              {[
                { day: "Segunda a Sexta", hours: "8h Ã s 21h" },
                { day: "SÃ¡bado",          hours: "8h Ã s 14h" },
                { day: "Domingo",         hours: "Fechado" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between py-2 border-b border-stone-50 last:border-b-0">
                  <span className="text-sm text-stone-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{day}</span>
                  <span className="text-sm font-medium text-[#1A2E4A]/70" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="rounded-2xl border border-[#1A2E4A]/8 bg-white overflow-hidden shadow-xl shadow-[#1A2E4A]/6">
            {/* Navy header */}
            <div className="bg-[#1A2E4A] px-7 py-5">
              <p className="text-white font-normal text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>FormulÃ¡rio de contato</p>
              <p className="text-white/40 text-[10px] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Primeira aula gratuita Â· Sem compromisso</p>
            </div>

            <div className="px-7 py-7">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex flex-col items-center text-center py-8 gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#1A2E4A]/8 border border-[#1A2E4A]/12 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-[#1A2E4A]" />
                  </div>
                  <div>
                    <h3 className="font-normal text-[#0F1820] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>Mensagem recebida!</h3>
                    <p className="text-sm text-stone-400 max-w-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Entraremos em contato em atÃ© <strong className="text-[#0F1820]">24 horas</strong> para confirmar sua aula experimental.
                    </p>
                  </div>
                  <a href="https://wa.me/5561995029627" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A2E4A] text-white text-xs font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Falar pelo WhatsApp
                  </a>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Seu nome" required error={errors.name}>
                      <input type="text" value={data.name} onChange={e => onChange("name", e.target.value)} placeholder="Nome completo" className={inputCls(!!errors.name)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </Field>
                    <Field label="WhatsApp" required error={errors.phone}>
                      <input type="tel" value={data.phone} onChange={e => onChange("phone", maskPhone(e.target.value))} placeholder="(61) 99502-9627" maxLength={15} className={inputCls(!!errors.phone)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </Field>
                  </div>

                  {/* Email + Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="E-mail" required error={errors.email}>
                      <input type="email" value={data.email} onChange={e => onChange("email", e.target.value)} placeholder="seu@email.com.br" className={inputCls(!!errors.email)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </Field>
                    <Field label="Idade do aluno">
                      <input type="text" value={data.age} onChange={e => onChange("age", e.target.value)} placeholder="Ex: 8 anos" className={inputCls()} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </Field>
                  </div>

                  {/* Course + Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Instrumento de interesse" required error={errors.course}>
                      <select value={data.course} onChange={e => onChange("course", e.target.value)} className={`${inputCls(!!errors.course)} cursor-pointer`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        <option value="">Selecione</option>
                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="HorÃ¡rio preferido">
                      <select value={data.schedule} onChange={e => onChange("schedule", e.target.value)} className={`${inputCls()} cursor-pointer`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        <option value="">Selecione (opcional)</option>
                        {SCHEDULES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Mensagem (opcional)">
                    <textarea value={data.message} onChange={e => onChange("message", e.target.value)} placeholder="Conte sobre vocÃª, seus objetivos musicais ou qualquer dÃºvida..." rows={3} className={`${inputCls()} resize-none`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                  </Field>

                  <p className="text-[10px] text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Seus dados sÃ£o confidenciais e usados apenas para entrar em contato sobre sua matrÃ­cula.
                  </p>

                  <div className="pt-2 border-t border-stone-50">
                    <motion.button type="button" onClick={handleSubmit} disabled={loading}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all ${loading ? "bg-stone-200 text-stone-400 cursor-wait" : "bg-[#1A2E4A] text-white hover:bg-[#243d5e]"}`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      whileHover={loading ? {} : { scale: 1.01 }} whileTap={loading ? {} : { scale: 0.98 }}>
                      {loading ? "Enviando..." : "Agendar aula experimental gratuita"}
                      {!loading && <ArrowRight size={14} />}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


