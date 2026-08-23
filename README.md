# Sri Lankan Events

Movie/events website for [srilancanevents.ca](https://srilancanevents.ca). Visitors browse movies and events and book tickets via Ticket Tailor; admins manage listings through an admin panel in the same app.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui (Base UI primitives, Nova style)
- MongoDB Atlas + Prisma (added in Phase 2)
- Ticket Tailor for ticket sales (no in-house payments)

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/(public)/` — public site: home, now showing, coming soon, movie listing/detail
- `src/app/admin/` — admin panel shell (auth + CRUD land in later phases)
- `src/components/site/` — public site components
- `src/components/admin/` — admin panel components
- `src/components/ui/` — shadcn/ui primitives
- `src/lib/movies.ts` — data-access layer; currently reads `src/lib/placeholder-movies.ts` and will be swapped for Prisma queries once the database is wired up

## Build phases

1. Next.js scaffold + folder structure (this phase)
2. MongoDB Atlas + Prisma setup
3. Database schema
4. Wire database into Next.js
5. Admin authentication + dashboard
6. Movie CRUD
7. Public site reads from the database
8. Ticket Tailor integration
9. Validation, security, SEO, responsiveness, error handling
10. Deploy to Hostinger on srilancanevents.ca
