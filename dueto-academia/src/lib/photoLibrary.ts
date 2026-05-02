import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import { del, get, put } from "@vercel/blob";

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
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const BLOB_LIBRARY_PATH = "dueto/photo-library.json";
const BLOB_UPLOAD_PREFIX = "dueto/uploads";
const BLOB_JSON_CACHE_SECONDS = 60;
const BLOB_IMAGE_CACHE_SECONDS = 60 * 60 * 24 * 365;
const DEFAULT_FOCAL_POSITION = 50;
const DEFAULT_ZOOM = 100;
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
        src: "/images/dueto/filosofia-sala.jpg",
        alt: "Sala de aula acolhedora da Dueto Academia",
      },
    ],
  },
  home_galeria: {
    key: "home_galeria",
    label: PHOTO_SECTION_META.home_galeria.label,
    multiple: PHOTO_SECTION_META.home_galeria.multiple,
    items: [
      { id: "default-g-009", src: "/images/dueto/gallery-recital-009.jpg", alt: "Orquestra de alunos em apresentacao no recital" },
      { id: "default-g-018", src: "/images/dueto/gallery-recital-018.jpg", alt: "Professora e alunos tocando violino no recital" },
      { id: "default-g-181", src: "/images/dueto/gallery-recital-181.jpg", alt: "Aluna em solo de violino no palco" },
      { id: "default-g-188", src: "/images/dueto/gallery-recital-188.jpg", alt: "Aluno em solo de violino durante o recital" },
      { id: "default-g-200", src: "/images/dueto/gallery-recital-200.jpg", alt: "Professor em apresentacao solo de viola" },
      { id: "default-g-250", src: "/images/dueto/gallery-recital-250.jpg", alt: "Alunos e professores no palco durante recital" },
      { id: "default-g-286", src: "/images/dueto/gallery-recital-286.jpg", alt: "Aluna tocando violino ao lado da arvore de Natal" },
      { id: "default-g-299", src: "/images/dueto/gallery-recital-299.jpg", alt: "Apresentacao coletiva de violinos no palco" },
      { id: "default-g-327", src: "/images/dueto/gallery-recital-327.jpg", alt: "Professor em apresentacao de violino no recital" },
      { id: "default-g-329", src: "/images/dueto/gallery-recital-329.jpg", alt: "Aluno se apresentando com violino no recital" },
      { id: "default-g-344", src: "/images/dueto/gallery-recital-344.jpg", alt: "Foto oficial do grupo apos o recital" },
      { id: "default-g-352", src: "/images/dueto/gallery-recital-352.jpg", alt: "Turma reunida na cerimonia de encerramento" },
      { id: "default-g-581", src: "/images/dueto/gallery-recital-581.jpg", alt: "Aluna em performance de violino no palco" },
      { id: "default-g-796", src: "/images/dueto/gallery-recital-796.jpg", alt: "Dueto de cordas em apresentacao no recital" },
      { id: "default-g-871", src: "/images/dueto/gallery-recital-871.jpg", alt: "Professor em solo de viola no recital" },
      { id: "default-g-1260", src: "/images/dueto/gallery-recital-1260.jpg", alt: "Grupo de alunos e professores apos apresentacao" },
    ],
  },
  contato_capa: {
    key: "contato_capa",
    label: PHOTO_SECTION_META.contato_capa.label,
    multiple: PHOTO_SECTION_META.contato_capa.multiple,
    items: [
      {
        id: "default-contato-capa",
        src: "/images/dueto/contato-academia.jpeg",
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
        src: "/images/dueto/gallery-recital-181.jpg",
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
        src: "/images/dueto/gallery-recital-200.jpg",
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
        src: "/images/dueto/course-violoncelo.jpg",
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
        src: "/images/dueto/course-violao.jpg",
        alt: "Aula de violao na Dueto Academia",
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
        src: "/images/dueto/teacher-alfredo.png",
        alt: "Professor de piano da Dueto Academia",
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

function isPhotoSectionKey(value: string): value is PhotoSectionKey {
  return (PHOTO_SECTION_KEYS as readonly string[]).includes(value);
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
  if (!src) return null;

  return {
    id: typeof candidate.id === "string" && candidate.id ? candidate.id : randomUUID(),
    src,
    alt,
    ...(focalX !== null ? { focalX } : {}),
    ...(focalY !== null ? { focalY } : {}),
    ...(zoom !== null ? { zoom } : {}),
  };
}

function normalizeSection(key: PhotoSectionKey, section: unknown, fallback: PhotoSection): PhotoSection {
  if (!section || typeof section !== "object") {
    return fallback;
  }

  const candidate = section as Partial<PhotoSection>;
  const rawItems = Array.isArray(candidate.items) ? candidate.items : [];
  const items = rawItems.map(normalizeItem).filter((item): item is PhotoItem => Boolean(item));

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

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readFallbackPhotoLibrary(): Promise<PhotoLibrary> {
  return (await readLocalPhotoLibrary()) ?? deepCloneDefaults();
}

async function readLocalPhotoLibrary(): Promise<PhotoLibrary | null> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(content);
    return normalizeLibrary(parsed);
  } catch {
    return null;
  }
}

async function readBlobTextWithAccess(
  pathname: string,
  access: "public" | "private",
): Promise<string | null> {
  const result = await get(pathname, {
    access,
    useCache: false,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  return new Response(result.stream).text();
}

async function readBlobText(pathname: string): Promise<string | null> {
  try {
    return await readBlobTextWithAccess(pathname, "public");
  } catch (publicError) {
    console.error("Falha ao ler biblioteca no Blob publico. Tentando modo privado.", publicError);
  }

  return readBlobTextWithAccess(pathname, "private");
}

async function readBlobPhotoLibrary(): Promise<PhotoLibrary | null> {
  const content = await readBlobText(BLOB_LIBRARY_PATH);
  if (!content) return null;

  const parsed: unknown = JSON.parse(content);
  return normalizeLibrary(parsed);
}

async function writeBlobPhotoLibrary(library: PhotoLibrary): Promise<void> {
  const normalized = normalizeLibrary(library);
  const serialized = JSON.stringify(normalized, null, 2);

  await put(BLOB_LIBRARY_PATH, serialized, {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: BLOB_JSON_CACHE_SECONDS,
  });
}

async function seedBlobPhotoLibrary(): Promise<PhotoLibrary> {
  const library = await readFallbackPhotoLibrary();
  await writeBlobPhotoLibrary(library);
  return library;
}

export async function ensurePhotoLibraryFile(): Promise<void> {
  if (hasBlobStorage()) {
    try {
      const library = await readBlobPhotoLibrary();
      if (!library) {
        await seedBlobPhotoLibrary();
      }
    } catch (error) {
      console.error("Falha ao preparar biblioteca de fotos no Vercel Blob.", error);
    }

    return;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    const data = JSON.stringify(DEFAULT_LIBRARY, null, 2);
    await fs.writeFile(DATA_FILE, data, "utf8");
  }
}

export async function readPhotoLibrary(): Promise<PhotoLibrary> {
  if (hasBlobStorage()) {
    try {
      const library = await readBlobPhotoLibrary();
      if (library) return library;

      return await seedBlobPhotoLibrary();
    } catch (error) {
      console.error("Falha ao ler biblioteca de fotos no Vercel Blob. Usando fallback local.", error);
      return readFallbackPhotoLibrary();
    }
  }

  await ensurePhotoLibraryFile();
  return readFallbackPhotoLibrary();
}

export async function writePhotoLibrary(library: PhotoLibrary): Promise<void> {
  const normalized = normalizeLibrary(library);

  if (hasBlobStorage()) {
    await writeBlobPhotoLibrary(normalized);
    return;
  }

  const serialized = JSON.stringify(normalized, null, 2);
  await fs.writeFile(DATA_FILE, serialized, "utf8");
}

export function createPhotoItem(src: string, alt: string): PhotoItem {
  return {
    id: randomUUID(),
    src,
    alt,
    focalX: DEFAULT_FOCAL_POSITION,
    focalY: DEFAULT_FOCAL_POSITION,
    zoom: DEFAULT_ZOOM,
  };
}

export function assertSectionKey(section: string): PhotoSectionKey | null {
  return isPhotoSectionKey(section) ? section : null;
}

export function resolvePublicPathFromSrc(src: string): string | null {
  if (!src.startsWith("/")) return null;

  const relativePath = src.replace(/^\/+/, "");
  const absolutePath = path.resolve(PUBLIC_DIR, relativePath);
  const normalizedRoot = PUBLIC_DIR.toLowerCase();
  const normalizedTarget = absolutePath.toLowerCase();
  const insideRoot =
    normalizedTarget === normalizedRoot ||
    normalizedTarget.startsWith(`${normalizedRoot}${path.sep.toLowerCase()}`);

  if (!insideRoot) return null;
  return absolutePath;
}

function resolveBlobUploadPathname(src: string): string | null {
  if (src.startsWith(`${BLOB_UPLOAD_PREFIX}/`)) {
    return src;
  }

  try {
    const url = new URL(src);
    if (!url.hostname.endsWith(".blob.vercel-storage.com")) return null;

    const pathname = url.pathname.replace(/^\/+/, "");
    return pathname.startsWith(`${BLOB_UPLOAD_PREFIX}/`) ? pathname : null;
  } catch {
    return null;
  }
}

export async function writeManagedPhotoFile(
  sectionKey: PhotoSectionKey,
  fileName: string,
  fileBuffer: Buffer,
  contentType: string,
): Promise<string> {
  if (hasBlobStorage()) {
    const pathname = `${BLOB_UPLOAD_PREFIX}/${sectionKey}/${fileName}`;
    const blob = await put(pathname, fileBuffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType,
      cacheControlMaxAge: BLOB_IMAGE_CACHE_SECONDS,
    });

    return blob.url;
  }

  const relativeDirectory = path.join("images", "dueto", "uploads", sectionKey);
  const absoluteDirectory = path.join(PUBLIC_DIR, relativeDirectory);
  const absoluteFilePath = path.join(absoluteDirectory, fileName);

  await fs.mkdir(absoluteDirectory, { recursive: true });
  await fs.writeFile(absoluteFilePath, fileBuffer);

  return `/${relativeDirectory.replace(/\\/g, "/")}/${fileName}`;
}

export async function removeManagedFileIfExists(src: string): Promise<void> {
  const blobPathname = resolveBlobUploadPathname(src);
  if (blobPathname && hasBlobStorage()) {
    try {
      await del(src);
    } catch (error) {
      console.error("Falha ao remover foto do Vercel Blob.", error);
    }

    return;
  }

  if (hasBlobStorage()) return;

  if (!src.startsWith("/images/dueto/uploads/")) return;

  const filePath = resolvePublicPathFromSrc(src);
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== "ENOENT") {
      throw error;
    }
  }
}
