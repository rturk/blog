# blog

Source for [rafaelturk.com](https://rafaelturk.com), built with [Astro](https://astro.build) and served as static files from Cloudflare.

## Writing

Posts live in `src/content/posts/` as Markdown (`.md`) or MDX (`.mdx`). The filename is the URL slug (`/posts/<filename>`).

```md
---
title: "Post title"
description: "One-line summary used for SEO, social cards and RSS"
date: 2026-10-28
draft: true # optional; drafts show in `npm run dev` only
---

Write here.
```

Images go in `public/images/<slug>/` and are referenced as `/images/<slug>/file.png`.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # serve dist/ locally
```

## Deployment

Cloudflare builds from this repo:

- Build command: `npm run build`
- Output directory: `dist`

`public/_redirects` holds redirects for removed URLs.
