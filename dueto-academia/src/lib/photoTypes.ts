export const PHOTO_SECTION_KEYS = [
  "home_hero",
  "home_filosofia",
  "home_galeria",
  "contato_capa",
  "cursos_violino",
  "cursos_viola",
  "cursos_violoncelo",
  "cursos_violao",
  "cursos_piano",
  "professores_guilherme",
  "professores_jordana",
  "professores_gabriel",
  "professores_lucas",
  "professores_hellen",
  "professores_alfredo",
] as const;

export type PhotoSectionKey = (typeof PHOTO_SECTION_KEYS)[number];

export const PHOTO_SECTION_META: Record<
  PhotoSectionKey,
  {
    label: string;
    multiple: boolean;
  }
> = {
  home_hero: { label: "Home - Abertura", multiple: false },
  home_filosofia: { label: "Home - Filosofia", multiple: false },
  home_galeria: { label: "Home - Galeria", multiple: true },
  contato_capa: { label: "Contato - Foto principal", multiple: false },
  cursos_violino: { label: "Cursos - Violino", multiple: false },
  cursos_viola: { label: "Cursos - Viola de Arco", multiple: false },
  cursos_violoncelo: { label: "Cursos - Violoncelo", multiple: false },
  cursos_violao: { label: "Cursos - Violao", multiple: false },
  cursos_piano: { label: "Cursos - Piano", multiple: false },
  professores_guilherme: { label: "Professores - Guilherme", multiple: false },
  professores_jordana: { label: "Professores - Jordana", multiple: false },
  professores_gabriel: { label: "Professores - Gabriel", multiple: false },
  professores_lucas: { label: "Professores - Lucas", multiple: false },
  professores_hellen: { label: "Professores - Hellen", multiple: false },
  professores_alfredo: { label: "Professores - Alfredo", multiple: false },
};

export type PhotoItem = {
  id: string;
  src: string;
  alt: string;
  focalX?: number;
  focalY?: number;
  zoom?: number;
  mobileFocalX?: number;
  mobileFocalY?: number;
  mobileZoom?: number;
};

export type PhotoSection = {
  key: PhotoSectionKey;
  label: string;
  multiple: boolean;
  items: PhotoItem[];
};

export type PhotoLibrary = Record<PhotoSectionKey, PhotoSection>;
