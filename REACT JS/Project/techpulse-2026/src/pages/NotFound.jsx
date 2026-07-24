import { Link } from 'react-router-dom'
import { FiHome, FiSatellite } from 'react-icons/fi'
import AuroraBackground from '../components/AuroraBackground'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <AuroraBackground />
      <div className="section relative z-10 flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora to-nebula text-space-950 animate-float">
          <FiSatellite size={28} />
        </span>
        <h1 className="mt-6 font-display text-6xl font-bold text-gradient sm:text-7xl">404</h1>
        <p className="mt-3 font-display text-xl text-mist">Signal lost — this page has drifted out of orbit.</p>
        <p className="mt-2 max-w-md text-sm text-mist-muted">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on course.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <FiHome size={16} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
