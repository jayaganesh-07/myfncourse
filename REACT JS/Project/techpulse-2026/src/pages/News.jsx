import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiInbox } from 'react-icons/fi'
import NewsCard from '../components/NewsCard'
import SearchFilterBar from '../components/SearchFilterBar'
import RevealOnScroll from '../components/RevealOnScroll'
import { newsData } from '../data/news'

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [sortOrder, setSortOrder] = useState('newest')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setSearchParams(cat === 'All' ? {} : { category: cat })
  }

  const filtered = useMemo(() => {
    let list = [...newsData]
    if (activeCategory !== 'All') list = list.filter((n) => n.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.shortDescription.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    list.sort((a, b) =>
      sortOrder === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    )
    return list
  }, [query, activeCategory, sortOrder])

  return (
    <div className="section py-16">
      <RevealOnScroll>
        <span className="eyebrow">All Stories</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-mist sm:text-4xl">Latest Technology News</h1>
        <p className="mt-3 max-w-2xl text-mist-muted">
          Search, filter and sort through in-depth coverage of four defining stories in space, mobility and hardware.
        </p>
      </RevealOnScroll>

      <div className="mt-8">
        <SearchFilterBar
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n, i) => (
            <RevealOnScroll key={n.id} delay={i * 70}>
              <NewsCard news={n} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-mist-muted">
          <FiInbox size={32} />
          <p>No stories match your search. Try a different keyword or category.</p>
        </div>
      )}
    </div>
  )
}
