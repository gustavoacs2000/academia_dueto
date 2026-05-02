# Dueto Academia

Site institucional em Next.js com exportação estática para Cloudflare Pages.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run lint
npm run build
```

O `next.config.ts` usa `output: "export"`, então o build gera a pasta `out`, que deve ser publicada no Cloudflare Pages.

Configuração recomendada no Cloudflare Pages:

- Root directory: `dueto-academia`
- Build command: `npm run build`
- Build output directory: `out`
- Node.js: 20 ou 22

## Conteúdo e imagens

O site não usa backend, API interna, storage remoto ou painel de upload em produção. As imagens e textos são versionados no Git:

1. Comprima a imagem antes de adicionar ao projeto.
2. Salve em `public/images/dueto/...`.
3. Atualize a referência em `data/photo-library.json` ou diretamente no código.
4. Rode `npm run lint` e `npm run build`.
5. Faça commit e push para publicar pela Cloudflare Pages.

## SEO

Os arquivos `src/app/robots.ts` e `src/app/sitemap.ts` são gerados no build. O domínio canônico configurado é `https://duetoacademia.com.br`.
