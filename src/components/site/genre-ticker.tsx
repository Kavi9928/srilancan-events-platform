export function GenreTicker({ genres }: { genres: string[] }) {
  if (genres.length < 4) return null

  // Duplicated so the marquee loops seamlessly at -50%.
  const items = [...genres, ...genres]

  return (
    <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden border-b border-white/10 bg-black py-4">
      <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
        {items.map((genre, index) => (
          <span
            key={`${genre}-${index}`}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium whitespace-nowrap text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            {genre}
          </span>
        ))}
      </div>
    </section>
  )
}
