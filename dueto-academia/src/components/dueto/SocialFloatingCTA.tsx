"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/5561995029627?text=Ol%C3%A1%21+Gostaria+de+informa%C3%A7%C3%B5es+sobre+a+Dueto+Academia.";

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.43a.5.5 0 0 0 .611.612l5.65-1.48A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.374l-.36-.214-3.713.974.99-3.621-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function SocialFloatingCTA() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Dueto pelo WhatsApp"
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed bottom-6 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full border border-[#25D366]/25 bg-[#25D366] px-4 text-sm font-semibold text-white shadow-xl shadow-[#25D366]/25 transition-all duration-200 hover:bg-[#20bd5a] hover:shadow-[#25D366]/35"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
