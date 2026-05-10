# Krishiv Arora Portfolio

Premium personal portfolio for Krishiv Arora, built with Next.js, Tailwind CSS, Framer Motion, Lucide React, and server-side API routes for GitHub, LeetCode, and contact form handling.

## Features

- Dark, responsive, recruiter-focused portfolio experience
- Animated hero, section reveals, hover states, and scroll progress
- Interactive skill pathways for frontend, backend, AI/GenAI, and systems tooling
- Dynamic public GitHub repositories from `Krishiv1611`
- LeetCode dashboard for `krishivarora25` with counters, difficulty chart, and heatmap
- Resume view/download from `public/Krishiv-resume.pdf`
- Resend-backed contact form route
- Vercel-ready App Router project structure

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill these values for the contact form:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=krishivarora150@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

`GITHUB_TOKEN` is optional. Add it only if you want higher GitHub API rate limits.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Deployment

Deploy on Vercel. Add the environment variables above in Project Settings before enabling the production contact form.
