# ToolForge

Fast and simple developer tools — free, private, and right in your browser.

## About

ToolForge is a platform for developer utilities built with Next.js. All tools run client-side with zero data sent to any server.

### Available Tools

- **JSON Formatter** — Format, validate, and minify JSON
- Base64 Encoder *(coming soon)*
- Timestamp Converter *(coming soon)*
- JSON to CSV Converter *(coming soon)*

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- Zero external runtime dependencies

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              # Routes (homepage, tools, sitemap, robots)
  components/       # Reusable UI (Header, Footer, ToolCard, ToolPage)
  lib/tools.ts      # Tool registry — add new tools here
```

### Adding a New Tool

1. Add an entry to `src/lib/tools.ts`
2. Create `src/app/tools/[slug]/page.tsx`
3. Use the `ToolPage` component template

## Deploy

Optimized for [Vercel](https://vercel.com) — import the repo and deploy with zero configuration.
