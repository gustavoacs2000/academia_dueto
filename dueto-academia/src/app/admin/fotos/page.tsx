"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import {
  PHOTO_SECTION_KEYS,
  PHOTO_SECTION_META,
  type PhotoLibrary,
  type PhotoSectionKey,
} from "@/lib/photoTypes";

type UploadState = Record<PhotoSectionKey, { file: File | null; alt: string; busy: boolean }>;
type PositionDraft = { focalX: number; focalY: number; zoom: number; busy: boolean };
type PositionState = Record<string, PositionDraft>;
type PreviewSpec = {
  aspectClass: string;
  imageSizes: string;
  cardSpanClass?: string;
  hint: string;
};

const DEFAULT_FOCAL = 50;
const DEFAULT_ZOOM = 100;
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;

const SECTION_PREVIEW_SPEC: Record<PhotoSectionKey, PreviewSpec> = {
  home_hero: {
    aspectClass: "aspect-[16/9]",
    imageSizes: "(max-width: 1024px) 100vw, 520px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura do hero (aprox. tela cheia).",
  },
  home_filosofia: {
    aspectClass: "aspect-[4/3]",
    imageSizes: "(max-width: 1024px) 50vw, 240px",
    hint: "Miniatura da secao Filosofia.",
  },
  home_galeria: {
    aspectClass: "aspect-[16/9]",
    imageSizes: "(max-width: 1024px) 100vw, 520px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura do carrossel da galeria.",
  },
  contato_capa: {
    aspectClass: "aspect-[4/3]",
    imageSizes: "(max-width: 1024px) 50vw, 240px",
    hint: "Miniatura da foto principal da pagina Contato.",
  },
  cursos_violino: {
    aspectClass: "aspect-[16/10]",
    imageSizes: "(max-width: 1024px) 100vw, 500px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura da foto do curso (layout Cursos).",
  },
  cursos_viola: {
    aspectClass: "aspect-[16/10]",
    imageSizes: "(max-width: 1024px) 100vw, 500px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura da foto do curso (layout Cursos).",
  },
  cursos_violoncelo: {
    aspectClass: "aspect-[16/10]",
    imageSizes: "(max-width: 1024px) 100vw, 500px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura da foto do curso (layout Cursos).",
  },
  cursos_violao: {
    aspectClass: "aspect-[16/10]",
    imageSizes: "(max-width: 1024px) 100vw, 500px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura da foto do curso (layout Cursos).",
  },
  cursos_piano: {
    aspectClass: "aspect-[16/10]",
    imageSizes: "(max-width: 1024px) 100vw, 500px",
    cardSpanClass: "sm:col-span-2",
    hint: "Miniatura da foto do curso (layout Cursos).",
  },
  professores_guilherme: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
  professores_jordana: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
  professores_gabriel: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
  professores_lucas: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
  professores_hellen: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
  professores_alfredo: {
    aspectClass: "aspect-[3/4]",
    imageSizes: "(max-width: 1024px) 50vw, 230px",
    hint: "Miniatura da foto de professor (layout Professores).",
  },
};

function createEmptyUploadState(): UploadState {
  const state = {} as UploadState;

  for (const sectionKey of PHOTO_SECTION_KEYS) {
    state[sectionKey] = { file: null, alt: "", busy: false };
  }

  return state;
}

function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function clampZoom(value: number): number {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(value)));
}

function emptyLibrary(): PhotoLibrary {
  const initial = {} as PhotoLibrary;

  for (const sectionKey of PHOTO_SECTION_KEYS) {
    initial[sectionKey] = {
      key: sectionKey,
      label: PHOTO_SECTION_META[sectionKey].label,
      multiple: PHOTO_SECTION_META[sectionKey].multiple,
      items: [],
    };
  }

  return initial;
}

function buildPositionState(library: PhotoLibrary): PositionState {
  const next: PositionState = {};

  for (const sectionKey of PHOTO_SECTION_KEYS) {
    for (const item of library[sectionKey].items) {
      next[item.id] = {
        focalX: clampPercentage(item.focalX ?? DEFAULT_FOCAL),
        focalY: clampPercentage(item.focalY ?? DEFAULT_FOCAL),
        zoom: clampZoom(item.zoom ?? DEFAULT_ZOOM),
        busy: false,
      };
    }
  }

  return next;
}

export default function AdminFotosPage() {
  const [token, setToken] = useState("");
  const [library, setLibrary] = useState<PhotoLibrary>(() => emptyLibrary());
  const [uploadState, setUploadState] = useState<UploadState>(() => createEmptyUploadState());
  const [positionState, setPositionState] = useState<PositionState>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasAnyItem = useMemo(
    () => PHOTO_SECTION_KEYS.some((sectionKey) => library[sectionKey].items.length > 0),
    [library],
  );

  const loadLibrary = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/photo-library", { cache: "no-store" });
      const payload = (await response.json()) as { library?: PhotoLibrary; error?: string };

      if (!response.ok || !payload.library) {
        throw new Error(payload.error || "Nao foi possivel carregar a biblioteca de fotos.");
      }

      setLibrary(payload.library);
      setPositionState(buildPositionState(payload.library));
      setMessage("Biblioteca carregada.");
    } catch (loadError) {
      const loadMessage =
        loadError instanceof Error ? loadError.message : "Erro inesperado ao carregar as fotos.";
      setError(loadMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUploadState = useCallback(
    (sectionKey: PhotoSectionKey, next: Partial<UploadState[PhotoSectionKey]>) => {
      setUploadState((prev) => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...next,
        },
      }));
    },
    [],
  );

  const updatePositionState = useCallback((id: string, next: Partial<PositionDraft>) => {
    setPositionState((prev) => {
      const current = prev[id] ?? {
        focalX: DEFAULT_FOCAL,
        focalY: DEFAULT_FOCAL,
        zoom: DEFAULT_ZOOM,
        busy: false,
      };

      return {
        ...prev,
        [id]: {
          ...current,
          ...next,
        },
      };
    });
  }, []);

  const uploadPhoto = useCallback(
    async (sectionKey: PhotoSectionKey) => {
      const sectionUpload = uploadState[sectionKey];
      if (!sectionUpload.file) {
        setError("Selecione uma imagem antes de enviar.");
        return;
      }

      if (!token.trim()) {
        setError("Informe o token de administrador para enviar ou excluir fotos.");
        return;
      }

      updateUploadState(sectionKey, { busy: true });
      setError(null);
      setMessage(null);

      try {
        const formData = new FormData();
        formData.append("section", sectionKey);
        formData.append("file", sectionUpload.file);
        formData.append("alt", sectionUpload.alt);

        const response = await fetch("/api/photo-library", {
          method: "POST",
          headers: {
            "x-admin-token": token.trim(),
          },
          body: formData,
        });

        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(payload.error || "Falha ao enviar a foto.");
        }

        await loadLibrary();
        updateUploadState(sectionKey, { file: null, alt: "" });
        setMessage("Foto enviada com sucesso.");
      } catch (uploadError) {
        const uploadMessage =
          uploadError instanceof Error ? uploadError.message : "Erro inesperado ao enviar foto.";
        setError(uploadMessage);
      } finally {
        updateUploadState(sectionKey, { busy: false });
      }
    },
    [loadLibrary, token, updateUploadState, uploadState],
  );

  const deletePhoto = useCallback(
    async (sectionKey: PhotoSectionKey, id: string) => {
      if (!token.trim()) {
        setError("Informe o token de administrador para enviar ou excluir fotos.");
        return;
      }

      setError(null);
      setMessage(null);

      try {
        const response = await fetch("/api/photo-library", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token.trim(),
          },
          body: JSON.stringify({ section: sectionKey, id }),
        });

        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(payload.error || "Falha ao excluir foto.");
        }

        await loadLibrary();
        setMessage("Foto excluida com sucesso.");
      } catch (deleteError) {
        const deleteMessage =
          deleteError instanceof Error ? deleteError.message : "Erro inesperado ao excluir foto.";
        setError(deleteMessage);
      }
    },
    [loadLibrary, token],
  );

  const savePhotoPosition = useCallback(
    async (sectionKey: PhotoSectionKey, id: string) => {
      if (!token.trim()) {
        setError("Informe o token de administrador para enviar ou excluir fotos.");
        return;
      }

      const draft = positionState[id];
      if (!draft) {
        setError("Nao foi possivel localizar o ajuste da foto selecionada.");
        return;
      }

      updatePositionState(id, { busy: true });
      setError(null);
      setMessage(null);

      try {
        const response = await fetch("/api/photo-library", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token.trim(),
          },
          body: JSON.stringify({
            section: sectionKey,
            id,
            focalX: draft.focalX,
            focalY: draft.focalY,
            zoom: draft.zoom,
          }),
        });

        const payload = (await response.json()) as {
          error?: string;
          item?: { id: string; focalX?: number; focalY?: number; zoom?: number };
          section?: PhotoLibrary[PhotoSectionKey];
        };
        if (!response.ok) {
          throw new Error(payload.error || "Falha ao salvar enquadramento.");
        }

        if (payload.section) {
          setLibrary((prev) => ({
            ...prev,
            [sectionKey]: payload.section,
          }));
        }

        if (payload.item) {
          updatePositionState(id, {
            focalX: clampPercentage(payload.item.focalX ?? draft.focalX),
            focalY: clampPercentage(payload.item.focalY ?? draft.focalY),
            zoom: clampZoom(payload.item.zoom ?? draft.zoom),
          });
        }

        setMessage("Enquadramento salvo com sucesso.");
      } catch (saveError) {
        const saveMessage =
          saveError instanceof Error ? saveError.message : "Erro inesperado ao salvar enquadramento.";
        setError(saveMessage);
      } finally {
        updatePositionState(id, { busy: false });
      }
    },
    [positionState, token, updatePositionState],
  );

  return (
    <div className="min-h-screen bg-[#FAF6EF] pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-[#C8A878] mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Painel interno
          </p>
          <h1
            className="text-[#0F1820] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Gestao de fotos por secao
          </h1>
          <p
            className="text-sm text-stone-500 mt-2 max-w-2xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Adicione, exclua e ajuste o enquadramento das imagens por secao do site.
          </p>
        </div>

        <div className="rounded-2xl border border-[#1A2E4A]/10 bg-white p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
            <div className="flex-1">
              <label
                className="text-xs text-stone-500 mb-1 block"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Token de administrador
              </label>
              <input
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="Informe o token (PHOTO_ADMIN_TOKEN)"
                className="w-full rounded-xl border border-[#1A2E4A]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1A2E4A]/40"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>
            <button
              type="button"
              onClick={loadLibrary}
              className="rounded-xl px-5 py-2.5 bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Carregar fotos"}
            </button>
          </div>
          <p
            className="text-[11px] text-stone-400 mt-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Se nao configurar variavel de ambiente, o token padrao e <strong>dueto123</strong>.
          </p>
        </div>

        {error && (
          <div
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {message}
          </div>
        )}

        {!hasAnyItem && (
          <div
            className="mb-8 rounded-xl border border-[#1A2E4A]/10 bg-white px-4 py-3 text-sm text-stone-500"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Clique em <strong>Carregar fotos</strong> para listar as secoes.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PHOTO_SECTION_KEYS.map((sectionKey) => {
            const section = library[sectionKey];
            const sectionUpload = uploadState[sectionKey];
            const fileInputId = `upload-${sectionKey}`;
            const previewSpec = SECTION_PREVIEW_SPEC[sectionKey];

            return (
              <section
                key={sectionKey}
                className="rounded-2xl border border-[#1A2E4A]/10 bg-white p-5"
              >
                <div className="mb-4">
                  <h2
                    className="text-[#0F1820] text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {section.label}
                  </h2>
                  <p
                    className="text-xs text-stone-400 mt-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {section.multiple
                      ? "Secao com multiplas fotos."
                      : "Secao de foto unica (novo upload substitui a atual)."}
                  </p>
                </div>

                <div className="rounded-xl border border-dashed border-[#1A2E4A]/20 p-4 mb-5">
                  <div className="flex flex-col gap-3">
                    <input
                      id={fileInputId}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        updateUploadState(sectionKey, { file });
                      }}
                      className="sr-only"
                    />
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={fileInputId}
                        className="inline-flex w-fit cursor-pointer items-center rounded-lg border border-[#1A2E4A]/25 bg-[#1A2E4A]/5 px-3 py-2 text-sm text-[#1A2E4A] hover:bg-[#1A2E4A]/10 transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {sectionUpload.file ? "Trocar arquivo" : "Escolher arquivo"}
                      </label>
                      <p
                        className="text-xs text-stone-500"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {sectionUpload.file
                          ? sectionUpload.file.name
                          : "Nenhum arquivo selecionado (JPG, PNG ou WEBP)."}
                      </p>
                    </div>
                    <input
                      type="text"
                      value={sectionUpload.alt}
                      onChange={(event) => updateUploadState(sectionKey, { alt: event.target.value })}
                      placeholder="Texto alternativo (opcional)"
                      className="w-full rounded-lg border border-[#1A2E4A]/15 px-3 py-2 text-sm outline-none focus:border-[#1A2E4A]/35"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => uploadPhoto(sectionKey)}
                      disabled={sectionUpload.busy}
                      className="self-start rounded-lg px-4 py-2 bg-[#1A2E4A] text-white text-sm font-medium hover:bg-[#243d5e] transition-colors disabled:opacity-60"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {sectionUpload.busy ? "Enviando..." : "Adicionar foto"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item) => {
                    const draft = positionState[item.id] ?? {
                      focalX: clampPercentage(item.focalX ?? DEFAULT_FOCAL),
                      focalY: clampPercentage(item.focalY ?? DEFAULT_FOCAL),
                      zoom: clampZoom(item.zoom ?? DEFAULT_ZOOM),
                      busy: false,
                    };

                    return (
                      <article
                        key={item.id}
                        className={`rounded-xl border border-[#1A2E4A]/10 overflow-hidden ${previewSpec.cardSpanClass ?? ""}`}
                      >
                        <div className={`relative ${previewSpec.aspectClass} bg-stone-100`}>
                          <Image
                            src={item.src}
                            alt={item.alt || "Imagem da secao"}
                            fill
                            sizes={previewSpec.imageSizes}
                            className="object-cover"
                            style={{
                              objectPosition: `${draft.focalX}% ${draft.focalY}%`,
                              transform: `scale(${draft.zoom / 100})`,
                              transformOrigin: `${draft.focalX}% ${draft.focalY}%`,
                            }}
                          />
                        </div>
                        <div className="p-3">
                          <p
                            className="text-[11px] text-stone-400 mb-2"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {previewSpec.hint}
                          </p>
                          <p
                            className="text-xs text-stone-600 line-clamp-2 min-h-8"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            title={item.alt}
                          >
                            {item.alt || "Sem descricao"}
                          </p>

                          <div className="mt-2 space-y-2">
                            <div>
                              <p
                                className="text-[11px] text-stone-500 mb-1"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                Horizontal: {draft.focalX}%
                              </p>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={draft.focalX}
                                disabled={draft.busy}
                                onChange={(event) =>
                                  updatePositionState(item.id, {
                                    focalX: clampPercentage(Number(event.target.value)),
                                  })
                                }
                                className="w-full accent-[#1A2E4A]"
                              />
                            </div>

                            <div>
                              <p
                                className="text-[11px] text-stone-500 mb-1"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                Vertical: {draft.focalY}%
                              </p>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={draft.focalY}
                                disabled={draft.busy}
                                onChange={(event) =>
                                  updatePositionState(item.id, {
                                    focalY: clampPercentage(Number(event.target.value)),
                                  })
                                }
                                className="w-full accent-[#1A2E4A]"
                              />
                            </div>

                            <div>
                              <p
                                className="text-[11px] text-stone-500 mb-1"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                Zoom: {draft.zoom}%
                              </p>
                              <input
                                type="range"
                                min={MIN_ZOOM}
                                max={MAX_ZOOM}
                                step={1}
                                value={draft.zoom}
                                disabled={draft.busy}
                                onChange={(event) =>
                                  updatePositionState(item.id, {
                                    zoom: clampZoom(Number(event.target.value)),
                                  })
                                }
                                className="w-full accent-[#1A2E4A]"
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => updatePositionState(item.id, { focalX: 50, focalY: 50, zoom: 100 })}
                              disabled={draft.busy}
                              className="rounded-md border border-[#1A2E4A]/20 px-2.5 py-1.5 text-[11px] text-[#1A2E4A] hover:bg-[#1A2E4A]/5 disabled:opacity-60"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              Resetar ajuste
                            </button>
                            <button
                              type="button"
                              onClick={() => savePhotoPosition(sectionKey, item.id)}
                              disabled={draft.busy}
                              className="rounded-md bg-[#1A2E4A] px-2.5 py-1.5 text-[11px] text-white hover:bg-[#243d5e] disabled:opacity-60"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {draft.busy ? "Salvando..." : "Salvar enquadramento"}
                            </button>
                            <button
                              type="button"
                              onClick={() => deletePhoto(sectionKey, item.id)}
                              className="rounded-md border border-red-200 px-2.5 py-1.5 text-[11px] text-red-600 hover:bg-red-50"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              Excluir foto
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
