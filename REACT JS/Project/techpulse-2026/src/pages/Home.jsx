import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import AuroraBackground from '../components/AuroraBackground'
import NewsCard from '../components/NewsCard'
import StatCard from '../components/StatCard'
import CategoryIcon from '../components/CategoryIcon'
import ReviewCard from '../components/ReviewCard'
import RevealOnScroll from '../components/RevealOnScroll'
import { newsData } from '../data/news'
import { categories } from '../data/categories'
import { siteStatistics } from '../data/statistics'
import { galleryData } from '../data/gallery'
import { initialReviews } from '../data/reviews'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Home() {
  const [slide, setSlide] = useState(0)
  const timerRef = useRef(null)
  const [userReviews] = useLocalStorage('techpulse_user_reviews', [])

  const allReviews = useMemo(() => [...initialReviews, ...userReviews], [userReviews])
  const latestReviews = useMemo(
    () => [...allReviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    [allReviews]
  )
  const trending = useMemo(() => [...newsData].reverse(), [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % newsData.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goToSlide = (i) => {
    clearInterval(timerRef.current)
    setSlide(i)
  }

  const active = newsData[slide]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="section relative z-10 flex min-h-[92vh] flex-col justify-center py-24">
          <RevealOnScroll>
            <span className="eyebrow">Four stories · One frontier of innovation</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-mist sm:text-5xl lg:text-6xl">
              Exploring the technology moments defining{' '}
              <span className="text-gradient">2026</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-mist-muted sm:text-lg">
              From India's first private orbital rocket to angstrom-scale chips, TechPulse
              brings you deep, dynamic coverage of the innovations reshaping how we move,
              explore and compute.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/news" className="btn-primary">
                Explore All Stories <FiArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline">
                About This Project
              </Link>
            </div>
          </RevealOnScroll>

          {/* Featured slider */}
          <RevealOnScroll delay={150} className="mt-16">
            <div className="glass-card relative overflow-hidden p-0 sm:flex">
              <div className="relative aspect-[16/9] sm:aspect-auto sm:w-1/2">
                <img
                  key={active.id}
                  src={active.heroImage}
                  alt={active.title}
                  className="h-full w-full object-cover animate-reveal"
                />
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-space-950/80 px-3 py-1 text-xs font-medium text-aurora backdrop-blur">
                  <CategoryIcon name={active.category} size={12} /> {active.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <span className="eyebrow">Featured Story</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-mist">{active.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm text-mist-muted">{active.shortDescription}</p>
                <Link
                  to={`/news/${active.slug}`}
                  className="mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-aurora hover:underline"
                >
                  Read Full Story <FiArrowRight size={14} />
                </Link>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => goToSlide((slide - 1 + newsData.length) % newsData.length)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist-muted hover:border-aurora hover:text-aurora"
                    aria-label="Previous slide"
                  >
                    <FiChevronLeft size={14} />
                  </button>
                  <div className="flex gap-2">
                    {newsData.map((n, i) => (
                      <button
                        key={n.id}
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === slide ? 'w-6 bg-aurora' : 'w-1.5 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => goToSlide((slide + 1) % newsData.length)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist-muted hover:border-aurora hover:text-aurora"
                    aria-label="Next slide"
                  >
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="section -mt-10 relative z-10 pb-20">
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {siteStatistics.map((s) => (
              <StatCard key={s.id} label={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Trending */}
      <section className="section py-16">
        <RevealOnScroll className="flex items-center justify-between">
          <div>
            <span className="eyebrow flex items-center gap-2">
              <FiTrendingUp size={13} /> Trending Now
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-mist sm:text-3xl">
              What readers are following
            </h2>
          </div>
          <Link to="/news" className="hidden text-sm font-medium text-aurora hover:underline sm:block">
            View all →
          </Link>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((n, i) => (
            <RevealOnScroll key={n.id} delay={i * 80}>
              <NewsCard news={n} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section py-16">
        <RevealOnScroll>
          <span className="eyebrow">Coverage Areas</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-mist sm:text-3xl">
            Technology categories we track
          </h2>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((c, i) => (
            <RevealOnScroll key={c.id} delay={i * 100}>
              <Link
                to={`/news?category=${c.name}`}
                className="glass-card flex h-full flex-col p-6"
                style={{ borderColor: 'transparent' }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${c.color}22`, color: c.color }}
                >
                  <CategoryIcon name={c.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-mist">{c.name}</h3>
                <p className="mt-2 text-sm text-mist-muted">{c.description}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section py-16">
        <RevealOnScroll className="flex items-center justify-between">
          <div>
            <span className="eyebrow">Visual Archive</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-mist sm:text-3xl">Gallery preview</h2>
          </div>
          <Link to="/gallery" className="hidden text-sm font-medium text-aurora hover:underline sm:block">
            Open gallery →
          </Link>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryData.slice(0, 8).map((g, i) => (
            <RevealOnScroll key={g.id} delay={i * 60}>
              <Link to="/gallery" className="group relative block aspect-square overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-2 left-2 text-xs font-medium text-mist opacity-0 transition-opacity group-hover:opacity-100">
                  {g.title}
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Latest reviews */}
      <section className="section py-16">
        <RevealOnScroll className="flex items-center justify-between">
          <div>
            <span className="eyebrow">Reader Voices</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-mist sm:text-3xl">Latest reviews</h2>
          </div>
          <Link to="/reviews" className="hidden text-sm font-medium text-aurora hover:underline sm:block">
            View all →
          </Link>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {latestReviews.map((r, i) => (
            <RevealOnScroll key={r.id} delay={i * 100}>
              <ReviewCard review={r} />
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  )
}
