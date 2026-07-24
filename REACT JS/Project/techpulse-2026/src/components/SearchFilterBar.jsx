import { FiSearch, FiX } from 'react-icons/fi'
import { categories } from '../data/categories'

export default function SearchFilterBar({ query, setQuery, activeCategory, setActiveCategory, sortOrder, setSortOrder }) {
  return (
    <div className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-muted" size={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news by title, tag or topic..."
          className="w-full rounded-full border border-white/10 bg-space-900/60 py-2.5 pl-10 pr-10 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-muted hover:text-mist"
            aria-label="Clear search"
          >
            <FiX size={14} />
          </button>
        )}
      </div>  

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === 'All' ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.name)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === c.name ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
            }`}
          >
            {c.name}
          </button>
        ))}

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-full border border-white/10 bg-space-900/60 px-3 py-1.5 text-xs text-mist focus:border-aurora focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  )
}
