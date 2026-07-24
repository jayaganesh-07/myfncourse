import { useState, useMemo } from 'react'
import { FiZoomIn } from 'react-icons/fi'
import { galleryData } from '../data/gallery'
import { categories } from '../data/categories'
import GalleryLightbox from '../components/GalleryLightbox'
import RevealOnScroll from '../components/RevealOnScroll'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(
    () => (activeCategory === 'All' ? galleryData : galleryData.filter((g) => g.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div className="section py-16">
      <RevealOnScroll>
        <span className="eyebrow">Visual Archive</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-mist sm:text-4xl">Gallery</h1>
        <p className="mt-3 max-w-2xl text-mist-muted">
          A curated collection of imagery across rockets, hydrogen rail, human spaceflight and
          semiconductor manufacturing.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={80} className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === 'All' ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.name)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === c.name ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
            }`}
          >
            {c.name}
          </button>
        ))}
      </RevealOnScroll>

      <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((g, i) => (
          <RevealOnScroll key={g.id} delay={(i % 8) * 60}>
            <button
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <img src={g.src} alt={g.title} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-space-950/85 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-medium text-aurora">
                  <FiZoomIn size={12} /> {g.category}
                </span>
                <span className="text-sm font-medium text-mist">{g.title}</span>
              </div>
            </button>
          </RevealOnScroll>
        ))}
      </div>

      <GalleryLightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) => setLightboxIndex((prev) => (prev + dir + filtered.length) % filtered.length)}
      />
    </div>
  )
}
