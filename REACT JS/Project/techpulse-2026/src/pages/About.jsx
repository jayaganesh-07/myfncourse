import { FiCode, FiTarget, FiCompass, FiBookOpen } from 'react-icons/fi'
import RevealOnScroll from '../components/RevealOnScroll'
import { siteFaqs } from '../data/faqs'

const techStack = [
  { name: 'React (Vite)', detail: 'Component-driven UI, built and bundled with Vite for fast dev and builds.' },
  { name: 'Tailwind CSS', detail: 'Utility-first styling for a consistent, responsive design system.' },
  { name: 'React Router DOM', detail: 'Client-side routing across all pages, including dynamic news routes.' },
  { name: 'React Icons', detail: 'Iconography used throughout the navigation, cards and UI controls.' },
  { name: 'Local Storage', detail: 'Persists accounts, sessions, reviews, favorites and theme with no backend.' },
]

export default function About() {
  return (
    <div className="section py-16">
      <RevealOnScroll>
        <span className="eyebrow">About the Project</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-mist sm:text-4xl">About TechPulse 2026</h1>
      </RevealOnScroll>

      <RevealOnScroll delay={80} className="glass-card mt-8 flex items-start gap-4 p-6">
        <FiTarget className="mt-1 shrink-0 text-aurora" size={22} />
        <div>
          <h2 className="font-display text-lg font-semibold text-mist">Project Overview</h2>
          <p className="mt-2 leading-relaxed text-mist-muted">
            TechPulse 2026 is a front-end React mini project built to showcase four recent
            technology stories — Skyroot Aerospace's private orbital rocket mission, India's
            first hydrogen-powered passenger train, NASA astronaut Anil Menon's first ISS
            mission, and a global semiconductor manufacturing breakthrough — through a fully
            responsive, dynamically rendered news-portal experience.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={120} className="glass-card mt-6 flex items-start gap-4 p-6">
        <FiCode className="mt-1 shrink-0 text-aurora" size={22} />
        <div className="w-full">
          <h2 className="font-display text-lg font-semibold text-mist">Technologies Used</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {techStack.map((t) => (
              <div key={t.name} className="rounded-xl bg-white/5 p-4">
                <p className="font-medium text-mist">{t.name}</p>
                <p className="mt-1 text-sm text-mist-muted">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={160} className="glass-card mt-6 flex items-start gap-4 p-6">
        <FiCompass className="mt-1 shrink-0 text-aurora" size={22} />
        <div>
          <h2 className="font-display text-lg font-semibold text-mist">Purpose</h2>
          <p className="mt-2 leading-relaxed text-mist-muted">
            The project demonstrates practical, real-world React skills — dynamic data-driven
            rendering with <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.map()</code>,
            component-based architecture, client-side authentication with local storage, protected
            actions, search and filtering, and responsive, animated UI — all without a backend server.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={200} className="glass-card mt-6 flex items-start gap-4 p-6">
        <FiCompass className="mt-1 shrink-0 text-nebula" size={22} />
        <div>
          <h2 className="font-display text-lg font-semibold text-mist">Future Scope</h2>
          <p className="mt-2 leading-relaxed text-mist-muted">
            A production version could connect to a real backend and database for authentication
            and reviews, integrate a live news API for continuously updated stories, add push
            notifications for breaking news, and support user-generated topic subscriptions and
            personalised feeds.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={240} className="glass-card mt-6 flex items-start gap-4 p-6">
        <FiBookOpen className="mt-1 shrink-0 text-flare" size={22} />
        <div>
          <h2 className="font-display text-lg font-semibold text-mist">References</h2>
          <p className="mt-2 leading-relaxed text-mist-muted">
            News summaries in this project are written for educational, illustrative purposes based
            on publicly reported developments in each field, and are not affiliated with or endorsed
            by Skyroot Aerospace, Indian Railways, NASA, or any semiconductor manufacturer.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={280} className="mt-12">
        <h2 className="font-display text-xl font-semibold text-mist">Frequently Asked Questions</h2>
        <div className="mt-5 space-y-3">
          {siteFaqs.map((f) => (
            <details key={f.id} className="glass-card p-4 open:border-aurora/30">
              <summary className="cursor-pointer list-none font-medium text-mist">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-mist-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}
