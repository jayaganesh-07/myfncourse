export default function NewsCard({ item }) {
  return (
    <article className="card-glow reveal overflow-hidden rounded-2xl bg-[color:var(--panel)]">
      <div className="h-44 overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="font-mono text-xs text-[color:var(--muted)]">{item.date}</p>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug">{item.title}</h3>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{item.summary}</p>
        <button className="mt-4 text-sm font-semibold text-[color:var(--blue)] hover:underline">
          Read more →
        </button>
      </div>
    </article>
  )
}
