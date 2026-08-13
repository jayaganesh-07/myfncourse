import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)]">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">
              SKYROOT<span className="gradient-text">.AERO</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
              Building India's private orbital launch capability, one flight at a time.
            </p>
            <div className="mt-4 flex gap-3 text-lg text-[color:var(--muted)]">
              <a href="#" aria-label="GitHub" className="hover:text-white"><FiGithub /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><FiTwitter /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin /></a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              <li><Link to="/missions" className="hover:text-white">Missions</Link></li>
              <li><Link to="/rockets" className="hover:text-white">Rockets</Link></li>
              <li><Link to="/news" className="hover:text-white">Recent news</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/reviews" className="hover:text-white">Reviews</Link></li>
              <li><Link to="/login" className="hover:text-white">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Launch site</p>
            <p className="mt-3 text-sm text-[color:var(--muted)] font-mono">
              Sriharikota, Andhra Pradesh<br />13.72°N, 80.23°E
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)]">
          Built as a React learning project inspired by real news about Skyroot Aerospace. Not affiliated with Skyroot Aerospace Pvt. Ltd.
        </div>
      </div>
    </footer>
  )
}
