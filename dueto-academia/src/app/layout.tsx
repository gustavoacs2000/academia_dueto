import type { Metadata } from "next";
import { cormorant, plusJakarta } from "@/lib/fonts";
import DuetoNavbar       from "@/components/dueto/DuetoNavbar";
import DuetoFooter       from "@/components/dueto/DuetoFooter";
import SocialFloatingCTA from "@/components/dueto/SocialFloatingCTA";
import { siteConfig } from "@/lib/siteMetadata";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: "%s | Dueto Academia" },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Dueto Academia de Música em Brasília",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    images: [siteConfig.ogImage],
  },
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
