"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Config ───────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/duetoacademiademusica/",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.12)",
    border: "rgba(225,48,108,0.25)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/5561995029627?text=Ol%C3%A1%21+Gostaria+de+informa%C3%A7%C3%B5es+sobre+a+Dueto+Academia.",
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.25)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.43a.5.5 0 0 0 .611.612l5.65-1.48A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.374l-.36-.214-3.713.974.99-3.621-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@duetoacademiademusica",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.10)",
    border: "rgba(255,0,0,0.22)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function SocialFloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2.5">

      {/* Social buttons — expandem acima do botão principal */}
      <AnimatePresence>
        {visible && expanded && (
          <>
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 12, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ delay: i * 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full border shadow-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(250,246,239,0.95)",
                  backdropFilter: "blur(12px)",
                  borderColor: social.border,
                  color: social.color,
                  boxShadow: `0 4px 16px ${social.bg}`,
                }}
              >
                {social.icon}
                <span
                  className="text-xs font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F1820" }}
                >
                  {social.label}
                </span>
              </motion.a>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={() => setExpanded(v => !v)}
            className="w-13 h-13 rounded-full border border-[#1A2E4A]/15 bg-[#1A2E4A] shadow-xl shadow-[#1A2E4A]/25 flex items-center justify-center transition-all duration-200 hover:bg-[#243d5e]"
            style={{ width: "52px", height: "52px" }}
            aria-label={expanded ? "Fechar redes sociais" : "Ver redes sociais"}
            aria-expanded={expanded}
          >
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.22 }}
              className="flex items-center justify-center"
            >
              {expanded ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 3L15 15M15 3L3 15"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <circle cx="18" cy="5"  r="3"/>
                  <circle cx="6"  cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49" stroke="white" strokeWidth="2"/>
                  <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49" stroke="white" strokeWidth="2"/>
                </svg>
              )}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
