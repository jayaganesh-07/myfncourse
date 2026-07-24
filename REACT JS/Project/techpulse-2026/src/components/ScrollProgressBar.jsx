import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const { progress } = useScrollProgress()
  return (
    <div className="fixed top-0 left-0 z-[70] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-aurora to-nebula transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
