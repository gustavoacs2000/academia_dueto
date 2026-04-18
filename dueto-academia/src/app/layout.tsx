import type { Metadata } from "next";
import { cormorant, plusJakarta } from "@/lib/fonts";
import DuetoNavbar       from "@/components/dueto/DuetoNavbar";
import DuetoFooter       from "@/components/dueto/DuetoFooter";
import SocialFloatingCTA from "@/components/dueto/SocialFloatingCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Dueto Academia de Música", template: "%s | Dueto Academia" },
  description: "Escola de música em Brasília–DF. Violino, viola, violoncelo, violão e piano a partir de 5 anos.",
  metadataBase: new URL("https://duetoacademia.com.br"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <DuetoNavbar />
        <main>{children}</main>
        <DuetoFooter />
        <SocialFloatingCTA />
      </body>
    </html>
  );
}