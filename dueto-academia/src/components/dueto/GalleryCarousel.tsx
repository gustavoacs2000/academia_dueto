"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  focalX?: number;
  focalY?: number;
  zoom?: number;
};

type GalleryCarouselProps = {
  images: GalleryItem[];
  intervalMs?: number;
};

export default function GalleryCarousel({ images, intervalMs = 5000 }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs, isPaused]);

  if (images.length === 0) return null;

  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const currentImage = images[currentIndex];
  const focalX = currentImage.focalX ?? 50;
  const focalY = currentImage.focalY ?? 50;
  const zoom = currentImage.zoom ?? 100;
  const objectPosition = `${focalX}% ${focalY}%`;

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-3xl overflow-hidden border border-[#1A2E4A]/10 shadow-xl shadow-[#1A2E4A]/10 bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 75vw"
          className="object-cover"
          style={{
            objectPosition,
            transform: `scale(${zoom / 100})`,
            transformOrigin: `${focalX}% ${focalY}%`,
          }}
          priority={currentIndex === 0}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,18,32,0.55) 0%, rgba(10,18,32,0.05) 55%, rgba(10,18,32,0) 100%)" }}
        />

        <div className="absolute left-4 bottom-4 max-w-[75%] z-10">
          <p
            className="text-white/90 text-xs lg:text-sm leading-snug"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {currentImage.alt}
          </p>
        </div>

        <div className="slider-navigation absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Foto anterior"
            className="pointer-events-auto rounded-full bg-[#0A1220]/38 backdrop-blur-[1px] hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <ArrowLeftCircle size={36} className="text-[#D4A843]" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima foto"
            className="pointer-events-auto rounded-full bg-[#0A1220]/38 backdrop-blur-[1px] hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <ArrowRightCircle size={36} className="text-[#D4A843]" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Ir para foto ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              index === currentIndex ? "w-7 bg-[#D4A843]" : "w-2.5 bg-[#1A2E4A]/25 hover:bg-[#1A2E4A]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
