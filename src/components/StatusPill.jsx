const statusLabels = {
  online: 'ONLINE',
  offline: 'OFFLINE',
  restarting: 'RESTARTING',
  maintenance: 'MAINTENANCE',
  unknown: 'UNKNOWN',
}

export default function StatusPill({ state = 'unknown', compact = false }) {
  const safeState = statusLabels[state] ? state : 'unknown'
  return (
    <span className={'status-pill status-pill--' + safeState + (compact ? ' status-pill--compact' : '')}>
      <span className="status-dot" aria-hidden="true" />
      <span>{statusLabels[safeState]}</span>
    </span>
  )
}