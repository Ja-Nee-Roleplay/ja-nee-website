import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import themeStyle from '../config/siteTheme.js'
import { isSafeExternalUrl } from '../utils/siteHelpers.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function LaunchScreen({ onComplete }) {
  const launch = siteConfig.launch
  const copy = siteConfig.copy.launch
  const launchAt = Date.parse(launch.launchAt)
  const hasValidDate = Boolean(launch.launchAt) && Number.isFinite(launchAt)
  const countdownEnabled = ['timer', 'both'].includes(launch.mode) && hasValidDate
  const [now, setNow] = useState(0)

  useEffect(() => {
    if (!countdownEnabled) return

    let timer
    const firstFrame = window.requestAnimationFrame(() => {
      const initialTime = Date.now()
      if (launchAt <= initialTime) {
        onComplete()
        return
      }
      setNow(initialTime)

      timer = window.setInterval(() => {
        const currentTime = Date.now()
        if (currentTime >= launchAt) {
          window.clearInterval(timer)
          onComplete()
          return
        }
        setNow(currentTime)
      }, 1000)
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (timer) window.clearInterval(timer)
    }
  }, [countdownEnabled, launchAt, onComplete])

  const remainingSeconds = countdownEnabled && now > 0
    ? Math.max(1, Math.ceil((launchAt - now) / 1000))
    : null
  const days = Math.floor((remainingSeconds || 0) / 86400)
  const hours = Math.floor(((remainingSeconds || 0) % 86400) / 3600)
  const minutes = Math.floor(((remainingSeconds || 0) % 3600) / 60)
  const seconds = (remainingSeconds || 0) % 60
  const showMessage = launch.mode !== 'timer' || !hasValidDate
  const discordUrl = launch.discordUrl || siteConfig.discord.inviteUrl
  const showDiscordLink = showMessage
    && launch.showDiscordLink !== false
    && isSafeExternalUrl(discordUrl)
  const units = [
    { value: String(days).padStart(2, '0'), label: copy.units.days },
    { value: pad(hours), label: copy.units.hours },
    { value: pad(minutes), label: copy.units.minutes },
    { value: pad(seconds), label: copy.units.seconds },
  ]

  return (
    <div className="site-shell launch-shell" style={themeStyle}>
      <main
        className="launch-screen"
        aria-labelledby={showMessage ? 'launch-title' : undefined}
        aria-label={showMessage ? undefined : copy.timerOnlyAria}
      >
        <div className="launch-candle" aria-hidden="true">
          <span className="launch-candle-glow" />
          <span className="launch-candle-flame" />
          <span className="launch-candle-wick" />
          <span className="launch-candle-wax" />
        </div>
        <div className="launch-card">
          {showMessage && (
            <>
              <p className="launch-eyebrow">{copy.eyebrow}</p>
              <h1 id="launch-title">{launch.title}</h1>
              {launch.message && <p className="launch-message">{launch.message}</p>}
            </>
          )}
          {remainingSeconds !== null && (
            <div className="launch-countdown" role="timer" aria-label={copy.countdownAria}>
              {units.map((unit) => (
                <div className="launch-countdown-unit" key={unit.label}>
                  <span className="launch-countdown-value">{unit.value}</span>
                  <span className="launch-countdown-label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
          {showDiscordLink && (
            <a
              className="launch-discord-link"
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.discordAria}
            >
              {copy.discordLabel}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </main>
    </div>
  )
}
