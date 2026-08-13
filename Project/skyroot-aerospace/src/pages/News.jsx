import { news } from '../data/news'
import NewsCard from '../components/NewsCard'
import { useReveal } from '../hooks/useReveal'

export default function News() {
  useReveal()
  return (
    <div className="bg-space min-h-screen px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--blue)]">Press room</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Recent news</h1>
        <p className="mt-2 max-w-xl text-[color:var(--muted)]">
          Coverage of Skyroot's climb toward becoming India's leading private launch provider.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
