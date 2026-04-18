import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  fallback: ["Georgia", "Times New Roman", "Times", "serif"],
  display: "swap",
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta",
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  display: "swap",
});
