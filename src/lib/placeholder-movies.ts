import type { Movie } from "@/lib/types"

/**
 * Temporary placeholder data for Phase 1 UI scaffolding.
 * Replace with Prisma/MongoDB queries in Phase 7 and delete this file.
 */
export const placeholderMovies: Movie[] = [
  {
    id: "1",
    title: "The Long Horizon",
    slug: "the-long-horizon",
    description:
      "A sweeping drama that follows three generations of a family navigating change, distance, and the pull of home.",
    genres: ["Drama", "Family"],
    posterUrl: "https://picsum.photos/seed/long-horizon/600/900",
    bannerUrl: "https://picsum.photos/seed/long-horizon/1600/700",
    trailerUrl: "https://www.youtube.com/watch?v=placeholder1",
    durationMinutes: 128,
    releaseDate: "2026-08-01",
    status: "NOW_SHOWING",
    ticketUrl: "https://www.tickettailor.com/events/example/the-long-horizon",
    rating: 7.8,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Paper Lanterns",
    slug: "paper-lanterns",
    description:
      "A heartwarming comedy about a festival that brings an entire neighborhood together for one unforgettable night.",
    genres: ["Comedy"],
    posterUrl: "https://picsum.photos/seed/paper-lanterns/600/900",
    bannerUrl: "https://picsum.photos/seed/paper-lanterns/1600/700",
    trailerUrl: null,
    durationMinutes: 104,
    releaseDate: "2026-07-18",
    status: "NOW_SHOWING",
    ticketUrl: "https://www.tickettailor.com/events/example/paper-lanterns",
    rating: 6.9,
    createdAt: "2026-05-20T00:00:00.000Z",
    updatedAt: "2026-05-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Midnight Circuit",
    slug: "midnight-circuit",
    description:
      "A high-stakes thriller set across one night in the city, where every choice narrows the odds of getting out.",
    genres: ["Thriller", "Action"],
    posterUrl: "https://picsum.photos/seed/midnight-circuit/600/900",
    bannerUrl: "https://picsum.photos/seed/midnight-circuit/1600/700",
    trailerUrl: "https://www.youtube.com/watch?v=placeholder2",
    durationMinutes: 116,
    releaseDate: "2026-09-25",
    status: "COMING_SOON",
    ticketUrl: null,
    rating: null,
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Salt and Ceylon",
    slug: "salt-and-ceylon",
    description:
      "A documentary-style journey along the coast, telling the stories of the people who call it home.",
    genres: ["Documentary"],
    posterUrl: "https://picsum.photos/seed/salt-ceylon/600/900",
    bannerUrl: "https://picsum.photos/seed/salt-ceylon/1600/700",
    trailerUrl: null,
    durationMinutes: 92,
    releaseDate: "2026-10-10",
    status: "COMING_SOON",
    ticketUrl: null,
    rating: null,
    createdAt: "2026-08-10T00:00:00.000Z",
    updatedAt: "2026-08-10T00:00:00.000Z",
  },
]
