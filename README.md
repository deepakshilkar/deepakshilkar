# Deepak Shilkar's website

A Hugo website using the PaperMod theme, deployed through Cloudflare Pages.

## Prerequisites

- [Hugo extended](https://gohugo.io/installation/) `0.164.0`
- Node.js `20` or later

## Local development

Install JavaScript dependencies once:

```sh
npm install
```

To run the Hugo site without the editor:

```sh
hugo server -D
```

To run the site with TinaCMS, copy `.env.example` to `.env`, add the Tina Cloud credentials, and run:

```sh
npx tinacms dev -c "hugo server -D"
```

Open `http://localhost:1313/admin` to use the editor. Changes made there are written to the Markdown files under `content/`.

## TinaCMS production setup

1. Create a free Tina Cloud account and project at [app.tina.io](https://app.tina.io).
2. Connect the project to this GitHub repository and select the production branch (normally `main`).
3. In Cloudflare Pages, add the following environment variables under **Settings → Variables and Secrets** for both Production and Preview:
   - `TINA_CLIENT_ID` — Tina Cloud client ID
   - `TINA_TOKEN` — Tina Cloud read-only token
   - `TINA_BRANCH` — the connected Git branch, normally `main`
4. Configure the build:
   - **Build command:** `npm run build`
   - **Build output directory:** `public`
5. Deploy the site. Tina's editor will be available at `https://deepakshilkar.in/admin`.

Tina Cloud authenticates editors and commits their changes to GitHub. Cloudflare Pages then rebuilds the public site from those commits. Do not commit `.env` or the Tina token.

## Content workflow

Tina provides separate collections for Research, Philosophy, Opinions, and Miscellaneous posts. It supports titles, dates, drafts, descriptions, excerpts, tags, categories, keywords, comments, table of contents settings, and Markdown content. Uploaded media is stored in `static/images/uploads/`.

## Production build

```sh
npm run build
```

Cloudflare Pages runs `npm run build`, which builds the Tina admin before generating the optimized Hugo site.
