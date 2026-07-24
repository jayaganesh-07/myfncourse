import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgressBar from './components/ScrollProgressBar'
import BackToTop from './components/BackToTop'

import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  if (loading) return <Loader />

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
