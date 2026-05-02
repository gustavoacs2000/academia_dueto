import { promises as fs } from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

import {
  assertSectionKey,
  createPhotoItem,
  readPhotoLibrary,
  removeManagedFileIfExists,
  writePhotoLibrary,
} from "@/lib/photoLibrary";

export const runtime = "nodejs";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const ADMIN_TOKEN = process.env.PHOTO_ADMIN_TOKEN?.trim() || "dueto123";

function unauthorized() {
  return NextResponse.json(
    { error: "Nao autorizado. Informe o token de administrador." },
    { status: 401 },
  );
}

function ensureAuthorized(request: Request): boolean {
  const headerToken = request.headers.get("x-admin-token")?.trim();
  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const provided = headerToken || bearerToken;

  return Boolean(provided && provided === ADMIN_TOKEN);
}

function sanitizeFilename(rawName: string): string {
  return rawName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function inferExtension(file: File): string {
  const byType: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };

  const typeExt = byType[file.type];
  if (typeExt) return typeExt;

  const rawExt = path.extname(file.name || "").toLowerCase();
  if (rawExt === ".jpeg") return ".jpg";
  if ([".jpg", ".png", ".webp"].includes(rawExt)) return rawExt;
  return ".jpg";
}

function inferAltFromName(fileName: string): string {
  const base = path.basename(fileName, path.extname(fileName));
  return base.replace(/[-_]+/g, " ").trim() || "Foto da secao";
}

function toPercentage(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const clamped = Math.min(100, Math.max(0, value));
  return Math.round(clamped);
}

function toZoom(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const clamped = Math.min(200, Math.max(50, value));
  return Math.round(clamped);
}

export async function GET() {
  const library = await readPhotoLibrary();
  return NextResponse.json({ library });
}

export async function POST(request: Request) {
  if (!ensureAuthorized(request)) {
    return unauthorized();
  }

  const formData = await request.formData();
  const sectionInput = formData.get("section");
  const fileInput = formData.get("file");
  const altInput = formData.get("alt");

  if (typeof sectionInput !== "string") {
    return NextResponse.json({ error: "Secao invalida." }, { status: 400 });
  }

  const sectionKey = assertSectionKey(sectionInput);
  if (!sectionKey) {
    return NextResponse.json({ error: "Secao invalida." }, { status: 400 });
  }

  if (!(fileInput instanceof File)) {
    return NextResponse.json({ error: "Arquivo nao enviado." }, { status: 400 });
  }

  if (!fileInput.type.startsWith("image/")) {
    return NextResponse.json({ error: "Envie um arquivo de imagem valido." }, { status: 400 });
  }

  const extension = inferExtension(fileInput);
  const safeName = sanitizeFilename(fileInput.name || "foto");
  const base = path.basename(safeName, path.extname(safeName)) || "foto";
  const generatedName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}${extension}`;
  const relativeDirectory = path.join("images", "dueto", "uploads", sectionKey);
  const absoluteDirectory = path.join(PUBLIC_DIR, relativeDirectory);
  const absoluteFilePath = path.join(absoluteDirectory, generatedName);
  const publicSrc = `/${relativeDirectory.replace(/\\/g, "/")}/${generatedName}`;

  await fs.mkdir(absoluteDirectory, { recursive: true });
  const fileBuffer = Buffer.from(await fileInput.arrayBuffer());
  await fs.writeFile(absoluteFilePath, fileBuffer);

  const library = await readPhotoLibrary();
  const section = library[sectionKey];
  const alt = typeof altInput === "string" && altInput.trim() ? altInput.trim() : inferAltFromName(fileInput.name);
  const newItem = createPhotoItem(publicSrc, alt);

  if (section.multiple) {
    section.items.push(newItem);
  } else {
    const previous = section.items[0];
    section.items = [newItem];
    if (previous) {
      await removeManagedFileIfExists(previous.src);
    }
  }

  await writePhotoLibrary(library);

  return NextResponse.json({
    section: library[sectionKey],
    item: newItem,
  });
}

export async function PATCH(request: Request) {
  if (!ensureAuthorized(request)) {
    return unauthorized();
  }

  const payload = (await request.json()) as {
    section?: string;
    id?: string;
    focalX?: number;
    focalY?: number;
    zoom?: number;
  };

  if (!payload.section) {
    return NextResponse.json({ error: "Secao nao informada." }, { status: 400 });
  }

  const sectionKey = assertSectionKey(payload.section);
  if (!sectionKey) {
    return NextResponse.json({ error: "Secao invalida." }, { status: 400 });
  }

  if (!payload.id) {
    return NextResponse.json({ error: "ID da foto nao informado." }, { status: 400 });
  }

  const focalX = toPercentage(payload.focalX);
  const focalY = toPercentage(payload.focalY);
  const zoom = toZoom(payload.zoom);
  if (focalX === null || focalY === null || zoom === null) {
    return NextResponse.json({ error: "Valores de enquadramento invalidos." }, { status: 400 });
  }

  const library = await readPhotoLibrary();
  const section = library[sectionKey];
  const item = section.items.find((entry) => entry.id === payload.id);

  if (!item) {
    return NextResponse.json({ error: "Foto nao encontrada." }, { status: 404 });
  }

  item.focalX = focalX;
  item.focalY = focalY;
  item.zoom = zoom;
  await writePhotoLibrary(library);

  return NextResponse.json({ section: library[sectionKey], item });
}

export async function DELETE(request: Request) {
  if (!ensureAuthorized(request)) {
    return unauthorized();
  }

  const payload = (await request.json()) as {
    section?: string;
    id?: string;
    src?: string;
  };

  const sectionInput = payload.section;
  if (!sectionInput) {
    return NextResponse.json({ error: "Secao nao informada." }, { status: 400 });
  }

  const sectionKey = assertSectionKey(sectionInput);
  if (!sectionKey) {
    return NextResponse.json({ error: "Secao invalida." }, { status: 400 });
  }

  if (!payload.id && !payload.src) {
    return NextResponse.json({ error: "Informe o id ou src da foto para excluir." }, { status: 400 });
  }

  const library = await readPhotoLibrary();
  const section = library[sectionKey];
  const targetIndex = section.items.findIndex((item) =>
    payload.id ? item.id === payload.id : item.src === payload.src,
  );

  if (targetIndex < 0) {
    return NextResponse.json({ error: "Foto nao encontrada." }, { status: 404 });
  }

  const [removed] = section.items.splice(targetIndex, 1);
  await removeManagedFileIfExists(removed.src);
  await writePhotoLibrary(library);

  return NextResponse.json({ section: library[sectionKey], removed });
}
