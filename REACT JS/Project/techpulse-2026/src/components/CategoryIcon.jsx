import { FiSend, FiTruck, FiCpu, FiGlobe } from 'react-icons/fi'

const map = {
  rocket: FiSend,
  train: FiTruck,
  chip: FiCpu,
  Space: FiSend,
  Mobility: FiTruck,
  Hardware: FiCpu,
}

export default function CategoryIcon({ name, size = 16, className = '' }) {
  const Icon = map[name] || FiGlobe
  return <Icon size={size} className={className} />
}
