import siteConfig from '../config/siteConfig.js'

const statusLabels = siteConfig.copy.status

export default function StatusPill({ state = 'unknown', compact = false }) {
  const safeState = statusLabels[state] ? state : 'unknown'
  return (
    <span className={'status-pill status-pill--' + safeState + (compact ? ' status-pill--compact' : '')}>
      <span className="status-dot" aria-hidden="true" />
      <span>{statusLabels[safeState]}</span>
    </span>
  )
}
