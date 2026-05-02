import type { Metadata } from "next";
import ContatoClient, { type ContactPhoto } from "./ContatoClient";
import { readPhotoLibrary } from "@/lib/photoLibrary";
import { siteConfig } from "@/lib/siteMetadata";

const CONTACT_FALLBACK: ContactPhoto = {
  src: "/images/dueto/contato-academia.webp",
  alt: "Entrada da Dueto Academia de Música em Brasília",
  focalX: 50,
  focalY: 5,
  zoom: 100,
};

export const metadata: Metadata = {
  title: "Contato | Aulas de Música em Brasília",
  description:
    "Entre em contato com a Dueto Academia de Música em Brasília para agendar uma aula experimental de violino, viola, violoncelo, violão ou piano.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato | Aulas de Música em Brasília | Dueto Academia",
    description:
      "Agende uma aula experimental na Dueto Academia de Música em Brasília.",
    url: "/contato",
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
    title: "Contato | Dueto Academia",
    description:
      "Agende uma aula experimental de música em Brasília.",
    images: [siteConfig.ogImage],
  },
};

export default async function ContatoPage() {
  const photoLibrary = await readPhotoLibrary();
  const first = photoLibrary.contato_capa.items[0];
  const contactPhoto: ContactPhoto = {
    src: first?.src || CONTACT_FALLBACK.src,
    alt: first?.alt || CONTACT_FALLBACK.alt,
    focalX: typeof first?.focalX === "number" ? first.focalX : CONTACT_FALLBACK.focalX,
    focalY: typeof first?.focalY === "number" ? first.focalY : CONTACT_FALLBACK.focalY,
    zoom: typeof first?.zoom === "number" ? first.zoom : CONTACT_FALLBACK.zoom,
    mobileFocalX: typeof first?.mobileFocalX === "number" ? first.mobileFocalX : undefined,
    mobileFocalY: typeof first?.mobileFocalY === "number" ? first.mobileFocalY : undefined,
    mobileZoom: typeof first?.mobileZoom === "number" ? first.mobileZoom : undefined,
  };

  return <ContatoClient contactPhoto={contactPhoto} />;
}
