import type { CSSProperties } from "react";

export type ResponsivePhotoStyleInput = {
  focalX?: number;
  focalY?: number;
  zoom?: number;
  mobileFocalX?: number;
  mobileFocalY?: number;
  mobileZoom?: number;
};

function clampPercentage(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(100, value));
}

function clampZoom(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(50, Math.min(200, value));
}

export function buildResponsivePhotoStyle(photo: ResponsivePhotoStyleInput): CSSProperties {
  const focalX = clampPercentage(photo.focalX, 50);
  const focalY = clampPercentage(photo.focalY, 50);
  const zoom = clampZoom(photo.zoom, 100);
  const mobileFocalX = clampPercentage(photo.mobileFocalX, focalX);
  const mobileFocalY = clampPercentage(photo.mobileFocalY, focalY);
  const mobileZoom = clampZoom(photo.mobileZoom, zoom);

  return {
    "--dueto-photo-focal-x": `${focalX}%`,
    "--dueto-photo-focal-y": `${focalY}%`,
    "--dueto-photo-zoom": `${zoom / 100}`,
    "--dueto-photo-mobile-focal-x": `${mobileFocalX}%`,
    "--dueto-photo-mobile-focal-y": `${mobileFocalY}%`,
    "--dueto-photo-mobile-zoom": `${mobileZoom / 100}`,
  } as CSSProperties;
}
