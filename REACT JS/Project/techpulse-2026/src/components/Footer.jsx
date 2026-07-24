import { Link } from 'react-router-dom'
import { FiSatellite, FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { footerLinks } from '../data/navigation'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-space-950/60">
      <div className="section grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-mist">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-aurora to-nebula text-space-950">
              <FiSatellite size={18} />
            </span>
            TechPulse<span className="text-gradient">2026</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-mist-muted">
            A student mini-project news portal covering four defining technology stories of the year —
            from orbital rockets to angstrom-scale chips.
          </p>
          <div className="mt-5 flex gap-3">
            {[FiGithub, FiTwitter, FiLinkedin, FiMail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist-muted transition-colors hover:border-aurora hover:text-aurora"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((col) => (
          <div key={col.id}>
            <h4 className="font-display text-sm font-semibold text-mist">{col.heading}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-mist-muted transition-colors hover:text-aurora">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="section text-center text-xs text-mist-muted">
          © {new Date().getFullYear()} TechPulse 2026 · Built as a React mini project · No backend, data stored locally in your browser.
        </p>
      </div>
    </footer>
  )
}
