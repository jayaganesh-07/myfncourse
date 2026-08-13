import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Missions from './pages/Missions'
import Rockets from './pages/Rockets'
import News from './pages/News'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  const location = useLocation()
  const [showTop, setShowTop] = useState(false)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  // Scroll-to-top button visibility
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/news" element={<News />} />
          <Route
            path="/reviews"
            element={<Reviews />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] text-white shadow-lg"
        >
          <FiArrowUp />
        </button>
      )}
    </div>
  )
}
