# SimpleUltimateStats

A web app for tracking stats during Ultimate Frisbee games. Log events like scores, pulls, and turnovers in real time, and review game history with per-player breakdowns.

## Features

- **Game tracking** — create games and record live events (scores, pulls, turnovers)
- **Player management** — manage a roster with positions (handler, cutter, hybrid)
- **Auth** — user accounts via Neon Auth
- **Dashboard** — view past games and stats

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) (serverless Postgres)
- [HeroUI](https://heroui.com) + Tailwind CSS
- [Neon Auth](https://neon.tech/docs/guides/neon-auth) for authentication

## Getting started

1. Copy `.env.example` to `.env` and fill in your Neon database URL and auth credentials.

2. Install dependencies:

```bash
pnpm install
```

3. Push the schema to your database:

```bash
pnpm drizzle-kit push
```

4. Start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run tests with Vitest |
| `pnpm lint` | Lint with ESLint |
