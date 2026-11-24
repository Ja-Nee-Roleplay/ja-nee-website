import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import themeStyle from '../config/siteTheme.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function LaunchScreen() {
  const launch = siteConfig.launch
  const copy = siteConfig.copy.launch
  const launchAt = Date.parse(launch.launchAt)
  const hasValidDate = Boolean(launch.launchAt) && Number.isFinite(launchAt)
  const countdownEnabled = launch.mode === 'countdown' && hasValidDate
  const [now, setNow] = useState(0)

  useEffect(() => {
    if (!countdownEnabled) return undefined

    let timer
    const firstFrame = window.requestAnimationFrame(() => {
      const initialTime = Date.now()
      setNow(initialTime)
      if (launchAt <= initialTime) return

      timer = window.setInterval(() => {
        const currentTime = Date.now()
        setNow(currentTime)
        if (currentTime >= launchAt) window.clearInterval(timer)
      }, 1000)
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (timer) window.clearInterval(timer)
    }
  }, [countdownEnabled, launchAt])

  const remainingSeconds = countdownEnabled && now > 0
    ? Math.max(0, Math.floor((launchAt - now) / 1000))
    : null
  const launchReached = countdownEnabled && remainingSeconds === 0
  const days = Math.floor((remainingSeconds || 0) / 86400)
  const hours = Math.floor(((remainingSeconds || 0) % 86400) / 3600)
  const minutes = Math.floor(((remainingSeconds || 0) % 3600) / 60)
  const seconds = (remainingSeconds || 0) % 60
  const units = [
    { value: String(days).padStart(2, '0'), label: copy.units.days },
    { value: pad(hours), label: copy.units.hours },
    { value: pad(minutes), label: copy.units.minutes },
    { value: pad(seconds), label: copy.units.seconds },
  ]

  return (
    <div className="site-shell launch-shell" style={themeStyle}>
      <main className="launch-screen" aria-labelledby="launch-title">
        <div className="launch-card">
          <p className="launch-eyebrow">{copy.eyebrow}</p>
          <h1 id="launch-title">{launch.title}</h1>
          {launch.message && <p className="launch-message">{launch.message}</p>}
          {remainingSeconds !== null && remainingSeconds > 0 && (
            <div className="launch-countdown" role="timer" aria-label={copy.countdownAria}>
              {units.map((unit) => (
                <div className="launch-countdown-unit" key={unit.label}>
                  <span className="launch-countdown-value">{unit.value}</span>
                  <span className="launch-countdown-label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
          {launchReached && launch.liveMessage && (
            <p className="launch-live-message" role="status">{launch.liveMessage}</p>
          )}
        </div>
      </main>
    </div>
  )
}
