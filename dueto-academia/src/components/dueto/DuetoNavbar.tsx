"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Music } from "lucide-react";

// â”€â”€â”€ Nav links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Professores", href: "/professores" },
    {
        label: "Cursos", href: "/cursos",
        submenu: [
            { label: "Violino", href: "/cursos#violino" },
            { label: "Viola de Arco", href: "/cursos#viola" },
            { label: "Violoncelo", href: "/cursos#violoncelo" },
            { label: "ViolÃ£o", href: "/cursos#violao" },
            { label: "Piano", href: "/cursos#piano" },
        ],
    },
    { label: "Contato", href: "/contato" },
];

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function DuetoNavbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [coursesOpen, setCoursesOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // fecha menu ao trocar de rota
    useEffect(() => { setMobileOpen(false); setCoursesOpen(false); }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === href : pathname.startsWith(href);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? "rgba(250,246,239,0.88)"
                        : "rgba(250,246,239,0.70)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderBottom: scrolled
                        ? "1px solid rgba(26,46,74,0.08)"
                        : "1px solid transparent",
                }}
            >
                <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">

                    {/* â”€â”€ Logo â”€â”€ */}
                    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Dueto Academia â€” pÃ¡gina inicial">
                        <div className="w-8 h-8 rounded-lg bg-[#1A2E4A]/8 flex items-center justify-center">
                            <Music size={16} className="text-[#1A2E4A]/70" />
                        </div>
                        <div>
                            <p
                                className="text-[#0F1820] font-normal leading-tight tracking-wide"
                                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", letterSpacing: "0.03em" }}
                            >
                                Dueto Academia
                            </p>
                            <p
                                className="text-[#1A2E4A]/45 text-[8px] tracking-[0.16em] uppercase leading-none"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                de MÃºsica
                            </p>
                        </div>
                    </Link>

                    {/* â”€â”€ Desktop nav â”€â”€ */}
                    <nav className="hidden lg:flex items-center gap-1" aria-label="NavegaÃ§Ã£o principal">
                        {NAV_LINKS.map((link) => (
                            <div key={link.href} className="relative">
                                {link.submenu ? (
                                    /* Cursos com submenu */
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setCoursesOpen(true)}
                                        onMouseLeave={() => setCoursesOpen(false)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${isActive(link.href)
                                                    ? "text-[#1A2E4A] bg-[#1A2E4A]/6"
                                                    : "text-[#0F1820]/60 hover:text-[#0F1820] hover:bg-[#1A2E4A]/4"
                                                }`}
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {link.label}
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
                                                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>

                                        {/* Dropdown */}
                                        <AnimatePresence>
                                            {coursesOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
                                                    className="absolute top-full left-0 mt-1 w-44 rounded-xl border border-[#1A2E4A]/8 bg-[#FAF6EF]/95 backdrop-blur-xl shadow-xl shadow-[#1A2E4A]/8 py-1.5 overflow-hidden"
                                                >
                                                    {link.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#0F1820]/65 hover:text-[#1A2E4A] hover:bg-[#1A2E4A]/4 transition-colors duration-150"
                                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-[#D4A843]/60 shrink-0" />
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    /* Links normais */
                                    <Link
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                                ? "text-[#1A2E4A] bg-[#1A2E4A]/6"
                                                : "text-[#0F1820]/60 hover:text-[#0F1820] hover:bg-[#1A2E4A]/4"
                                            }`}
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* â”€â”€ Desktop CTA â”€â”€ */}
                    <Link
                        href="/contato"
                        className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A2E4A] text-white text-xs font-medium hover:bg-[#243d5e] transition-all duration-200"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Matricular-se
                    </Link>

                    {/* â”€â”€ Mobile button â”€â”€ */}
                    <button
                        className="lg:hidden w-9 h-9 flex items-center justify-center text-[#1A2E4A]/60 hover:text-[#1A2E4A] transition-colors"
                        onClick={() => setMobileOpen(v => !v)}
                        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* â”€â”€ Mobile menu â”€â”€ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-40 pt-16"
                        style={{ background: "rgba(250,246,239,0.97)", backdropFilter: "blur(20px)" }}
                    >
                        <nav className="flex flex-col px-6 pt-6 gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center justify-between py-4 border-b border-[#1A2E4A]/8 text-lg font-normal transition-colors ${isActive(link.href) ? "text-[#1A2E4A]" : "text-[#0F1820]/65 hover:text-[#1A2E4A]"
                                            }`}
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                    >
                                        {link.label}
                                        {isActive(link.href) && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                                        )}
                                    </Link>
                                    {/* Submenu mobile */}
                                    {link.submenu && (
                                        <div className="flex flex-col pl-4 border-b border-[#1A2E4A]/8">
                                            {link.submenu.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className="flex items-center gap-2 py-3 text-sm text-[#0F1820]/50 hover:text-[#1A2E4A] transition-colors"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-[#C8A878] shrink-0" />
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.35 }}
                                className="pt-6"
                            >
                                <Link
                                    href="/contato"
                                    className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-[#1A2E4A] text-white font-medium text-base"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    Matricular-se
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

