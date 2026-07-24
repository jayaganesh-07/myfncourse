import { FiSend } from 'react-icons/fi'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-space-950">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-aurora/30 animate-spin-slow" />
        <span className="absolute inset-2 rounded-full border border-nebula/40 animate-pulse" />
        <FiSend className="text-aurora animate-float" size={28} />
      </div>
      <p className="mt-6 font-mono text-xs tracking-[0.3em] text-mist-muted uppercase shimmer-text">
        Establishing Uplink
      </p>
      <p className="mt-1 font-display text-lg text-mist">TechPulse 2026</p>
    </div>
  )
}
