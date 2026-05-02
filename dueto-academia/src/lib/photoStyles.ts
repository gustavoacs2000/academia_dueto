import type { CSSProperties } from "react";

type ResponsivePhoto = {
  focalX?: number;
  focalY?: number;
  zoom?: number;
  mobileFocalX?: number;
  mobileFocalY?: number;
  mobileZoom?: number;
};

type PhotoStyle = CSSProperties & {
  "--dueto-photo-position": string;
  "--dueto-photo-transform": string;
  "--dueto-photo-transform-origin": string;
  "--dueto-photo-mobile-position": string;
  "--dueto-photo-mobile-transform": string;
  "--dueto-photo-mobile-transform-origin": string;
};

const DEFAULT_FOCAL = 50;
const DEFAULT_ZOOM = 100;
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;

function clampPercentage(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_FOCAL;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function clampZoom(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_ZOOM;
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(value)));
}

function photoVars(focalX: number, focalY: number, zoom: number) {
  const position = `${focalX}% ${focalY}%`;

  return {
    position,
    transform: `scale(${zoom / 100})`,
    transformOrigin: position,
  };
}

export function buildResponsivePhotoStyle(photo: ResponsivePhoto): PhotoStyle {
  const desktop = photoVars(
    clampPercentage(photo.focalX),
    clampPercentage(photo.focalY),
    clampZoom(photo.zoom),
  );
  const mobile = photoVars(
    clampPercentage(photo.mobileFocalX ?? photo.focalX),
    clampPercentage(photo.mobileFocalY ?? photo.focalY),
    clampZoom(photo.mobileZoom ?? photo.zoom),
  );

  return {
    "--dueto-photo-position": desktop.position,
    "--dueto-photo-transform": desktop.transform,
    "--dueto-photo-transform-origin": desktop.transformOrigin,
    "--dueto-photo-mobile-position": mobile.position,
    "--dueto-photo-mobile-transform": mobile.transform,
    "--dueto-photo-mobile-transform-origin": mobile.transformOrigin,
  };
}
