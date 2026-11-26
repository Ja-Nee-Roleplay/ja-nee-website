import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import themeStyle from '../config/siteTheme.js'
import { isSafeExternalUrl } from '../utils/siteHelpers.js'
import { playCountdownClick } from '../utils/audioFeedback.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

function FlipDigit({ value }) {
  const previousValue = useRef(value)
  const flipSequence = useRef(0)
  const [flip, setFlip] = useState(null)

  useEffect(() => {
    const from = previousValue.current
    if (from === value) return undefined

    previousValue.current = value
    flipSequence.current += 1
    const flipId = flipSequence.current
    setFlip({ from, to: value, id: flipId })

    const timeout = window.setTimeout(() => {
      setFlip((activeFlip) => activeFlip?.id === flipId ? null : activeFlip)
    }, 560)

    return () => window.clearTimeout(timeout)
  }, [value])

  return (
    <span className="flip-clock-digit">
      <span className="flip-clock-half flip-clock-half--top">
        <span className="flip-clock-number">{flip ? flip.from : value}</span>
      </span>
      <span className="flip-clock-half flip-clock-half--bottom">
        <span className="flip-clock-number">{value}</span>
      </span>
      {flip && (
        <span className="flip-clock-flap" key={flip.id}>
          <span className="flip-clock-flap-face flip-clock-flap-face--front">
            <span className="flip-clock-number">{flip.from}</span>
          </span>
          <span className="flip-clock-flap-face flip-clock-flap-face--back">
            <span className="flip-clock-number">{flip.to}</span>
          </span>
        </span>
      )}
    </span>
  )
}

export default function LaunchScreen({ onComplete }) {
  const launch = siteConfig.launch
  const copy = siteConfig.copy.launch
  const launchAt = Date.parse(launch.launchAt)
  const hasValidDate = Boolean(launch.launchAt) && Number.isFinite(launchAt)
  const countdownEnabled = ['timer', 'both'].includes(launch.mode) && hasValidDate
  const [now, setNow] = useState(() => countdownEnabled ? Date.now() : 0)

  useEffect(() => {
    if (!countdownEnabled) return

    let completed = false
    let timer
    let completionTimer

    function updateCountdown() {
      if (completed) return
      const currentTime = Date.now()
      if (currentTime >= launchAt) {
        completed = true
        setNow(launchAt)
        window.clearInterval(timer)
        completionTimer = window.setTimeout(onComplete, 750)
        return
      }
      setNow(currentTime)
    }

    updateCountdown()
    timer = window.setInterval(updateCountdown, 1000)
    document.addEventListener('visibilitychange', updateCountdown)

    return () => {
      if (timer) window.clearInterval(timer)
      if (completionTimer) window.clearTimeout(completionTimer)
      document.removeEventListener('visibilitychange', updateCountdown)
    }
  }, [countdownEnabled, launchAt, onComplete])

  const remainingSeconds = countdownEnabled && now > 0
    ? Math.max(0, Math.ceil((launchAt - now) / 1000))
    : null
  const days = Math.floor((remainingSeconds || 0) / 86400)
  const hours = Math.floor(((remainingSeconds || 0) % 86400) / 3600)
  const minutes = Math.floor(((remainingSeconds || 0) % 3600) / 60)
  const seconds = (remainingSeconds || 0) % 60
  const burnWindowSeconds = Math.max(1, Number(launch.candleBurnMinutes) || 15) * 60
  const candleBurnProgress = remainingSeconds === null
    ? 0
    : Math.min(1, Math.max(0, 1 - remainingSeconds / burnWindowSeconds))
  const candleWaxHeight = Math.round(124 - candleBurnProgress * 66)
  const candleFlameHeight = 56 - candleBurnProgress * 11
  const candleFlameWidth = 34 - candleBurnProgress * 7
  const candleStyle = {
    '--candle-wax-height': `${candleWaxHeight}px`,
    '--candle-flame-height': `${candleFlameHeight}px`,
    '--candle-flame-width': `${candleFlameWidth}px`,
    '--candle-glow-bottom': `${candleWaxHeight + 9 + candleFlameHeight / 2 - 220}px`,
  }
  const showMessage = launch.mode !== 'timer' || !hasValidDate
  const discordUrl = launch.discordUrl || siteConfig.discord.inviteUrl
  const showDiscordLink = showMessage
    && launch.showDiscordLink !== false
    && isSafeExternalUrl(discordUrl)
  const additionalLinks = showMessage && Array.isArray(launch.links)
    ? launch.links.filter((link) => link?.enabled !== false && link?.label?.trim() && isSafeExternalUrl(link.url))
    : []
  const units = [
    { value: String(days).padStart(2, '0'), label: copy.units.days },
    { value: pad(hours), label: copy.units.hours },
    { value: pad(minutes), label: copy.units.minutes },
    { value: pad(seconds), label: copy.units.seconds },
  ]
  const timerValue = units.map((unit) => unit.value).join(':')
  const previousTimerValue = useRef(null)

  useEffect(() => {
    if (remainingSeconds === null) {
      previousTimerValue.current = null
      return
    }

    if (
      previousTimerValue.current !== null
      && previousTimerValue.current !== timerValue
      && siteConfig.audio.enabled
      && siteConfig.audio.countdownClicksEnabled
    ) {
      // One short tick per timer update, even when multiple digits flip together.
      playCountdownClick(siteConfig.audio.countdownClickVolume)
    }

    previousTimerValue.current = timerValue
  }, [remainingSeconds, timerValue])

  return (
    <div className="site-shell launch-shell" style={themeStyle}>
      <main
        className="launch-screen"
        aria-labelledby={showMessage ? 'launch-title' : undefined}
        aria-label={showMessage ? undefined : copy.timerOnlyAria}
      >
        <div className="launch-candle" style={candleStyle} aria-hidden="true">
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
            <div
              className="launch-countdown"
              role="timer"
              aria-label={`${copy.countdownAria}: ${units.map((unit) => `${unit.value} ${unit.label}`).join(', ')}`}
            >
              {units.map((unit) => (
                <div className="launch-countdown-unit" key={unit.label}>
                  <span className="flip-clock-pair" aria-hidden="true">
                    {unit.value.split('').map((digit, index) => (
                      <FlipDigit key={unit.label + '-' + index} value={digit} />
                    ))}
                  </span>
                  <span className="launch-countdown-label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
          {(showDiscordLink || additionalLinks.length > 0) && (
            <div className="launch-links">
              {showDiscordLink && (
                <a
                  className="launch-link"
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.discordAria}
                >
                  {copy.discordLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {additionalLinks.map((link) => (
                <a
                  className="launch-link"
                  href={link.url}
                  key={link.label + '-' + link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
