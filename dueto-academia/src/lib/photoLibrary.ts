import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  PHOTO_SECTION_KEYS,
  PHOTO_SECTION_META,
  type PhotoItem,
  type PhotoLibrary,
  type PhotoSection,
  type PhotoSectionKey,
} from "./photoTypes";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "photo-library.json");
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;

const DEFAULT_LIBRARY: PhotoLibrary = {
  home_hero: {
    key: "home_hero",
    label: PHOTO_SECTION_META.home_hero.label,
    multiple: PHOTO_SECTION_META.home_hero.multiple,
    items: [
      {
        id: "default-home-hero",
        src: "/images/dueto/uploads/home_hero/home.png",
        alt: "Aluna tocando violino na Dueto Academia de Musica",
      },
    ],
  },
  home_filosofia: {
    key: "home_filosofia",
    label: PHOTO_SECTION_META.home_filosofia.label,
    multiple: PHOTO_SECTION_META.home_filosofia.multiple,
    items: [
      {
        id: "default-home-filosofia",
        src: "/images/dueto/filosofia-sala.webp",
        alt: "Sala de aula acolhedora da Dueto Academia",
      },
    ],
  },
  home_galeria: {
    key: "home_galeria",
    label: PHOTO_SECTION_META.home_galeria.label,
    multiple: PHOTO_SECTION_META.home_galeria.multiple,
    items: [
      { id: "default-g-009", src: "/images/dueto/gallery-recital-009.webp", alt: "Orquestra de alunos em apresentacao no recital" },
      { id: "default-g-018", src: "/images/dueto/gallery-recital-018.webp", alt: "Professora e alunos tocando violino no recital" },
      { id: "default-g-181", src: "/images/dueto/gallery-recital-181.webp", alt: "Aluna em solo de violino no palco" },
      { id: "default-g-188", src: "/images/dueto/gallery-recital-188.webp", alt: "Aluno em solo de violino durante o recital" },
      { id: "default-g-200", src: "/images/dueto/gallery-recital-200.webp", alt: "Professor em apresentacao solo de viola" },
      { id: "default-g-250", src: "/images/dueto/gallery-recital-250.webp", alt: "Alunos e professores no palco durante recital" },
      { id: "default-g-286", src: "/images/dueto/gallery-recital-286.webp", alt: "Aluna tocando violino ao lado da arvore de Natal" },
      { id: "default-g-299", src: "/images/dueto/gallery-recital-299.webp", alt: "Apresentacao coletiva de violinos no palco" },
      { id: "default-g-327", src: "/images/dueto/gallery-recital-327.webp", alt: "Professor em apresentacao de violino no recital" },
      { id: "default-g-329", src: "/images/dueto/gallery-recital-329.webp", alt: "Aluno se apresentando com violino no recital" },
      { id: "default-g-344", src: "/images/dueto/gallery-recital-344.webp", alt: "Foto oficial do grupo apos o recital" },
      { id: "default-g-352", src: "/images/dueto/gallery-recital-352.webp", alt: "Turma reunida na cerimonia de encerramento" },
      { id: "default-g-581", src: "/images/dueto/gallery-recital-581.webp", alt: "Aluna em performance de violino no palco" },
      { id: "default-g-796", src: "/images/dueto/gallery-recital-796.webp", alt: "Dueto de cordas em apresentacao no recital" },
      { id: "default-g-871", src: "/images/dueto/gallery-recital-871.webp", alt: "Professor em solo de viola no recital" },
      { id: "default-g-1260", src: "/images/dueto/gallery-recital-1260.webp", alt: "Grupo de alunos e professores apos apresentacao" },
    ],
  },
  contato_capa: {
    key: "contato_capa",
    label: PHOTO_SECTION_META.contato_capa.label,
    multiple: PHOTO_SECTION_META.contato_capa.multiple,
    items: [
      {
        id: "default-contato-capa",
        src: "/images/dueto/contato-academia.webp",
        alt: "Entrada da Dueto Academia de Musica em Brasilia",
      },
    ],
  },
  cursos_violino: {
    key: "cursos_violino",
    label: PHOTO_SECTION_META.cursos_violino.label,
    multiple: PHOTO_SECTION_META.cursos_violino.multiple,
    items: [
      {
        id: "default-cursos-violino",
        src: "/images/dueto/gallery-recital-181.webp",
        alt: "Aluna em solo de violino no palco",
      },
    ],
  },
  cursos_viola: {
    key: "cursos_viola",
    label: PHOTO_SECTION_META.cursos_viola.label,
    multiple: PHOTO_SECTION_META.cursos_viola.multiple,
    items: [
      {
        id: "default-cursos-viola",
        src: "/images/dueto/gallery-recital-200.webp",
        alt: "Professor em apresentacao solo de viola",
      },
    ],
  },
  cursos_violoncelo: {
    key: "cursos_violoncelo",
    label: PHOTO_SECTION_META.cursos_violoncelo.label,
    multiple: PHOTO_SECTION_META.cursos_violoncelo.multiple,
    items: [
      {
        id: "default-cursos-violoncelo",
        src: "/images/dueto/course-violoncelo.webp",
        alt: "Aula de violoncelo na Dueto Academia",
      },
    ],
  },
  cursos_violao: {
    key: "cursos_violao",
    label: PHOTO_SECTION_META.cursos_violao.label,
    multiple: PHOTO_SECTION_META.cursos_violao.multiple,
    items: [
      {
        id: "default-cursos-violao",
        src: "/images/dueto/course-violao.webp",
        alt: "Aula de violao na Dueto Academia",
        focalX: 50,
        focalY: 50,
        zoom: 90,
      },
    ],
  },
  cursos_piano: {
    key: "cursos_piano",
    label: PHOTO_SECTION_META.cursos_piano.label,
    multiple: PHOTO_SECTION_META.cursos_piano.multiple,
    items: [
      {
        id: "default-cursos-piano",
        src: "/images/dueto/course-piano.jpeg",
        alt: "Pessoa tocando piano na Dueto Academia",
        focalX: 50,
        focalY: 50,
        zoom: 100,
      },
    ],
  },
  professores_guilherme: {
    key: "professores_guilherme",
    label: PHOTO_SECTION_META.professores_guilherme.label,
    multiple: PHOTO_SECTION_META.professores_guilherme.multiple,
    items: [
      {
        id: "default-prof-guilherme",
        src: "/images/dueto/teacher-guilherme.jpeg",
        alt: "Guilherme Alexander, professor de violino",
        focalX: 50,
        focalY: 20,
        zoom: 100,
      },
    ],
  },
  professores_jordana: {
    key: "professores_jordana",
    label: PHOTO_SECTION_META.professores_jordana.label,
    multiple: PHOTO_SECTION_META.professores_jordana.multiple,
    items: [
      {
        id: "default-prof-jordana",
        src: "/images/dueto/teacher-jordana.jpeg",
        alt: "Jordana Rodrigues, professora de violino",
        focalX: 50,
        focalY: 18,
        zoom: 100,
      },
    ],
  },
  professores_gabriel: {
    key: "professores_gabriel",
    label: PHOTO_SECTION_META.professores_gabriel.label,
    multiple: PHOTO_SECTION_META.professores_gabriel.multiple,
    items: [
      {
        id: "default-prof-gabriel",
        src: "/images/dueto/teacher-gabriel.jpeg",
        alt: "Gabriel Mendes, professor de violino",
        focalX: 50,
        focalY: 18,
        zoom: 100,
      },
    ],
  },
  professores_lucas: {
    key: "professores_lucas",
    label: PHOTO_SECTION_META.professores_lucas.label,
    multiple: PHOTO_SECTION_META.professores_lucas.multiple,
    items: [
      {
        id: "default-prof-lucas",
        src: "/images/dueto/teacher-lucas.jpeg",
        alt: "Lucas Rezende, professor de violao",
        focalX: 44,
        focalY: 20,
        zoom: 106,
      },
    ],
  },
  professores_hellen: {
    key: "professores_hellen",
    label: PHOTO_SECTION_META.professores_hellen.label,
    multiple: PHOTO_SECTION_META.professores_hellen.multiple,
    items: [
      {
        id: "default-prof-hellen",
        src: "/images/dueto/teacher-hellen.jpeg",
        alt: "Hellen Alvares, professora de violoncelo",
        focalX: 50,
        focalY: 16,
        zoom: 100,
      },
    ],
  },
  professores_alfredo: {
    key: "professores_alfredo",
    label: PHOTO_SECTION_META.professores_alfredo.label,
    multiple: PHOTO_SECTION_META.professores_alfredo.multiple,
    items: [
      {
        id: "default-prof-alfredo",
        src: "/images/dueto/teacher-alfredo.png",
        alt: "Alfredo Siqueira, professor de piano",
      },
    ],
  },
};

function deepCloneDefaults(): PhotoLibrary {
  return JSON.parse(JSON.stringify(DEFAULT_LIBRARY)) as PhotoLibrary;
}

function normalizePercentage(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const clamped = Math.min(100, Math.max(0, value));
  return Math.round(clamped);
}

function normalizeZoom(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
  return Math.round(clamped);
}

function normalizeItem(item: unknown): PhotoItem | null {
  if (!item || typeof item !== "object") return null;

  const candidate = item as Partial<PhotoItem>;
  const src = typeof candidate.src === "string" ? candidate.src : "";
  const alt = typeof candidate.alt === "string" ? candidate.alt : "";
  const focalX = normalizePercentage(candidate.focalX);
  const focalY = normalizePercentage(candidate.focalY);
  const zoom = normalizeZoom(candidate.zoom);
  const mobileFocalX = normalizePercentage(candidate.mobileFocalX);
  const mobileFocalY = normalizePercentage(candidate.mobileFocalY);
  const mobileZoom = normalizeZoom(candidate.mobileZoom);
  if (!src) return null;

  return {
    id: typeof candidate.id === "string" && candidate.id ? candidate.id : src,
    src,
    alt,
    ...(focalX !== null ? { focalX } : {}),
    ...(focalY !== null ? { focalY } : {}),
    ...(zoom !== null ? { zoom } : {}),
    ...(mobileFocalX !== null ? { mobileFocalX } : {}),
    ...(mobileFocalY !== null ? { mobileFocalY } : {}),
    ...(mobileZoom !== null ? { mobileZoom } : {}),
  };
}

function mergeFallbackItemDefaults(item: PhotoItem, fallbackItem: PhotoItem | undefined): PhotoItem {
  if (!fallbackItem || item.id !== fallbackItem.id) {
    return item;
  }

  const merged: PhotoItem = { ...item };

  if (item.src === "/images/dueto/teacher-alfredo.png" && fallbackItem.src === "/images/dueto/course-piano.jpeg") {
    merged.src = fallbackItem.src;
    merged.alt = fallbackItem.alt;
  }

  if (typeof merged.focalX !== "number" && typeof fallbackItem.focalX === "number") {
    merged.focalX = fallbackItem.focalX;
  }

  if (typeof merged.focalY !== "number" && typeof fallbackItem.focalY === "number") {
    merged.focalY = fallbackItem.focalY;
  }

  if (typeof merged.zoom !== "number" && typeof fallbackItem.zoom === "number") {
    merged.zoom = fallbackItem.zoom;
  }

  if (typeof merged.mobileFocalX !== "number" && typeof fallbackItem.mobileFocalX === "number") {
    merged.mobileFocalX = fallbackItem.mobileFocalX;
  }

  if (typeof merged.mobileFocalY !== "number" && typeof fallbackItem.mobileFocalY === "number") {
    merged.mobileFocalY = fallbackItem.mobileFocalY;
  }

  if (typeof merged.mobileZoom !== "number" && typeof fallbackItem.mobileZoom === "number") {
    merged.mobileZoom = fallbackItem.mobileZoom;
  }

  return merged;
}

function normalizeSection(key: PhotoSectionKey, section: unknown, fallback: PhotoSection): PhotoSection {
  if (!section || typeof section !== "object") {
    return fallback;
  }

  const candidate = section as Partial<PhotoSection>;
  const rawItems = Array.isArray(candidate.items) ? candidate.items : [];
  const items = rawItems
    .map(normalizeItem)
    .filter((item): item is PhotoItem => Boolean(item))
    .map((item) =>
      mergeFallbackItemDefaults(
        item,
        fallback.items.find((fallbackItem) => fallbackItem.id === item.id),
      ),
    );

  return {
    key,
    label: typeof candidate.label === "string" && candidate.label ? candidate.label : fallback.label,
    multiple: typeof candidate.multiple === "boolean" ? candidate.multiple : fallback.multiple,
    items,
  };
}

function normalizeLibrary(raw: unknown): PhotoLibrary {
  const defaults = deepCloneDefaults();

  if (!raw || typeof raw !== "object") {
    return defaults;
  }

  const candidate = raw as Partial<Record<PhotoSectionKey, unknown>>;
  const normalized = {} as PhotoLibrary;

  for (const key of PHOTO_SECTION_KEYS) {
    normalized[key] = normalizeSection(key, candidate[key], defaults[key]);
  }

  return normalized;
}

async function readLocalPhotoLibrary(): Promise<PhotoLibrary | null> {
  try {
    const content = await readFile(DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(content);
    return normalizeLibrary(parsed);
  } catch {
    return null;
  }
}

export async function readPhotoLibrary(): Promise<PhotoLibrary> {
  return (await readLocalPhotoLibrary()) ?? deepCloneDefaults();
}
