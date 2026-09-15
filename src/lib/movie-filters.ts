import type { Movie } from "@/lib/types"

export type MovieFacetFilters = {
  genres?: string[]
  languages?: string[]
  formats?: string[]
}

export function filterMoviesByFacets(movies: Movie[], facets: MovieFacetFilters): Movie[] {
  const { genres = [], languages = [], formats = [] } = facets

  return movies.filter((movie) => {
    if (genres.length > 0 && !movie.genres.some((value) => genres.includes(value))) return false
    if (languages.length > 0 && !movie.languages.some((value) => languages.includes(value)))
      return false
    if (formats.length > 0 && !movie.formats.some((value) => formats.includes(value)))
      return false
    return true
  })
}
