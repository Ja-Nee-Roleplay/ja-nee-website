import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { assetUrl } from '../utils/siteHelpers.js'

function randomBetween(minimum, maximum, fallback) {
  const min = Number(minimum)
  const max = Number(maximum)
  if (!Number.isFinite(min) || !Number.isFinite(max)) return fallback
  return Math.round(Math.min(min, max) + Math.random() * Math.abs(max - min))
}

function choose(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value))
}

const pixelGlyphs = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  6: ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  '.': ['00000', '00000', '00000', '00000', '00000', '00110', '00110'],
  ',': ['00000', '00000', '00000', '00000', '00110', '00110', '00100'],
  "'": ['00100', '00100', '00010', '00000', '00000', '00000', '00000'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  ':': ['00000', '00110', '00110', '00000', '00110', '00110', '00000'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
}

function PixelText({ value }) {
  const words = String(value || '').toUpperCase().trim().split(/\s+/)
  const lines = ['']

  words.forEach((word) => {
    const lastLine = lines.length - 1
    const nextLine = lines[lastLine] ? `${lines[lastLine]} ${word}` : word
    if (nextLine.length > 23 && lines[lastLine]) lines.push(word)
    else lines[lastLine] = nextLine
  })

  const width = Math.max(1, ...lines.map((line) => line.length * 6 - 1))
  const height = lines.length * 9 - 2
  const blocks = []

  lines.forEach((line, lineIndex) => {
    Array.from(line).forEach((character, characterIndex) => {
      const glyph = pixelGlyphs[character] || pixelGlyphs['?']
      glyph.forEach((row, rowIndex) => {
        Array.from(row).forEach((pixel, columnIndex) => {
          if (pixel === '1') {
            blocks.push(
              <rect
                key={`${lineIndex}-${characterIndex}-${rowIndex}-${columnIndex}`}
                x={characterIndex * 6 + columnIndex}
                y={lineIndex * 9 + rowIndex}
                width="1"
                height="1"
              />,
            )
          }
        })
      })
    })
  })

  return (
    <svg
      className="roaming-mascot__pixel-copy"
      viewBox={`0 0 ${width} ${height}`}
      width={width * 1.4}
      height={height * 1.4}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {blocks}
    </svg>
  )
}

function visibleInViewport(element) {
  if (!element || element.getAttribute('aria-disabled') === 'true') return false
  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)
  return style.display !== 'none'
    && style.visibility !== 'hidden'
    && rect.width > 0
    && rect.height > 0
    && rect.bottom > 12
    && rect.top < window.innerHeight - 12
    && rect.right > 0
    && rect.left < window.innerWidth
}

export default function RoamingMascot() {
  const config = siteConfig.mascot
  const messages = siteConfig.copy.mascot
  const [scene, setScene] = useState(null)

  useEffect(() => {
    if (!config.enabled) return undefined

    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (config.respectReducedMotion && motionPreference?.matches) return undefined

    let active = true
    let sceneActive = false
    let firstVisit = true
    let nextTimer
    let walkTimer
    let leaveTimer
    let hideTimer
    let animationFrame

    function clearScheduledVisit() {
      if (nextTimer) window.clearTimeout(nextTimer)
      nextTimer = undefined
    }

    function scheduleNextVisit() {
      if (!active || document.visibilityState === 'hidden') return
      const delay = firstVisit
        ? randomBetween(config.firstVisitDelayMinMs, config.firstVisitDelayMaxMs, 26000)
        : randomBetween(config.returnDelayMinMs, config.returnDelayMaxMs, 54000)
      firstVisit = false
      nextTimer = window.setTimeout(showVisit, delay)
    }

    function findLinkTarget() {
      const targets = Array.from(document.querySelectorAll(
        '.launch-link[href], a.button[href]:not(.button--needs-config), .social-link[href]',
      )).filter(visibleInViewport)
      return targets.length ? choose(targets) : null
    }

    function findCandle() {
      const candle = document.querySelector('.launch-candle')
      if (!candle || !visibleInViewport(candle)) return null
      return { rect: candle.getBoundingClientRect() }
    }

    function chooseAction(candle, link) {
      const options = []
      const addOption = (type, enabled, value) => {
        const weight = Number(value)
        if (enabled && Number.isFinite(weight) && weight > 0) options.push({ type, weight })
      }
      addOption('roast', config.roastMarshmallowEnabled && candle, config.roastMarshmallowWeight)
      addOption('point', config.pointAtLinksEnabled && link, config.pointAtLinksWeight)
      addOption('wave', config.waveEnabled, config.waveWeight)
      addOption('inspect', config.inspectEnabled, config.inspectWeight)
      if (!options.length) return null

      const totalWeight = options.reduce((total, option) => total + option.weight, 0)
      let roll = Math.random() * totalWeight
      for (const option of options) {
        roll -= option.weight
        if (roll < 0) return option.type
      }
      return options[options.length - 1].type
    }

    function showVisit() {
      nextTimer = undefined
      if (!active) return
      if (document.visibilityState === 'hidden') {
        scheduleNextVisit()
        return
      }

      const candle = config.roastMarshmallowEnabled ? findCandle() : null
      const link = config.pointAtLinksEnabled ? findLinkTarget() : null
      const action = chooseAction(candle, link)
      if (!action) {
        scheduleNextVisit()
        return
      }

      const width = window.innerWidth
      const height = window.innerHeight
      const mascotHeight = width <= 620 ? config.mobileHeight : config.desktopHeight
      const mascotWidth = mascotHeight * 0.54
      let destinationX
      let destinationY
      let targetDirection = 'right'
      let speech

      if (action === 'roast' && candle) {
        const rect = candle.rect
        destinationX = rect.left - mascotWidth * 0.15
        destinationY = rect.bottom - mascotHeight + 5
        speech = choose(messages.roast)
      } else if (action === 'point' && link) {
        const rect = link.getBoundingClientRect()
        const targetCenter = rect.left + rect.width / 2
        const standOnLeft = rect.left > mascotWidth + 18
        destinationX = standOnLeft
          ? rect.left - mascotWidth * 0.36
          : rect.right + mascotWidth * 0.36
        destinationY = rect.top + rect.height / 2 - mascotHeight * 0.56
        targetDirection = targetCenter >= destinationX ? 'right' : 'left'
        speech = choose(messages.point)
      } else {
        destinationX = width * (0.22 + Math.random() * 0.56)
        destinationY = height - mascotHeight - 16
        speech = choose(action === 'inspect' ? messages.inspect : messages.wave)
      }

      destinationX = clamp(destinationX, mascotWidth / 2 + 8, width - mascotWidth / 2 - 8)
      destinationY = clamp(destinationY, 26, height - mascotHeight - 12)

      const startsFromLeft = destinationX > width / 2
      const startX = startsFromLeft ? -mascotWidth : width + mascotWidth
      const startY = clamp(destinationY + Math.min(116, mascotHeight * 0.82), 26, height - mascotHeight - 12)
      const walkDirection = startsFromLeft ? 'right' : 'left'
      const visitId = Date.now() + Math.random()
      const visit = {
        id: visitId,
        action,
        x: startX,
        y: startY,
        destinationX,
        destinationY,
        exitX: walkDirection === 'right' ? width + mascotWidth : -mascotWidth,
        height: mascotHeight,
        walkDirection,
        targetDirection,
        phase: 'entering',
        speech,
        bubbleBelow: destinationY < 76,
        bubbleRight: destinationX > width * 0.66,
      }

      setScene(visit)
      sceneActive = true
      animationFrame = window.requestAnimationFrame(() => {
        if (!active) return
        animationFrame = window.requestAnimationFrame(() => {
          if (!active) return
          setScene((current) => current?.id === visitId
            ? { ...current, x: destinationX, y: destinationY, phase: 'walking' }
            : current)
        })
      })

      const walkDuration = Math.max(400, Number(config.walkDurationMs) || 2700)
      const stayDuration = randomBetween(config.stayDurationMinMs, config.stayDurationMaxMs, 5200)
      walkTimer = window.setTimeout(() => {
        if (active) setScene((current) => current?.id === visitId ? { ...current, phase: 'acting' } : current)
      }, walkDuration)
      leaveTimer = window.setTimeout(() => {
        if (active) setScene((current) => current?.id === visitId
          ? { ...current, phase: 'leaving', x: visit.exitX, walkDirection }
          : current)
      }, walkDuration + stayDuration)
      hideTimer = window.setTimeout(() => {
        if (!active) return
        sceneActive = false
        setScene((current) => current?.id === visitId ? null : current)
        scheduleNextVisit()
      }, walkDuration * 2 + stayDuration + 700)
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        clearScheduledVisit()
        if (walkTimer) window.clearTimeout(walkTimer)
        if (leaveTimer) window.clearTimeout(leaveTimer)
        if (hideTimer) window.clearTimeout(hideTimer)
        if (animationFrame) window.cancelAnimationFrame(animationFrame)
        walkTimer = undefined
        leaveTimer = undefined
        hideTimer = undefined
        sceneActive = false
        setScene(null)
      } else if (!nextTimer && !sceneActive) {
        scheduleNextVisit()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    scheduleNextVisit()
    return () => {
      active = false
      clearScheduledVisit()
      if (walkTimer) window.clearTimeout(walkTimer)
      if (leaveTimer) window.clearTimeout(leaveTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [config, messages])

  if (!config.enabled || !scene) return null

  const sprite = scene.phase === 'acting'
    ? (scene.action === 'roast' || scene.action === 'wave' || scene.action === 'inspect'
      ? siteConfig.mascot.frontSprite
      : scene.targetDirection === 'left' ? siteConfig.mascot.walkingLeftSprite : siteConfig.mascot.walkingRightSprite)
    : scene.walkDirection === 'left' ? siteConfig.mascot.walkingLeftSprite : siteConfig.mascot.walkingRightSprite
  const emote = scene.action === 'roast' ? '✦' : scene.action === 'point' ? (scene.targetDirection === 'left' ? '←' : '→') : scene.action === 'wave' ? '✦' : '…'

  return (
    <div
      className={`roaming-mascot roaming-mascot--${scene.action}${scene.bubbleBelow ? ' roaming-mascot--bubble-below' : ''}${scene.bubbleRight ? ' roaming-mascot--bubble-right' : ''}`}
      data-phase={scene.phase}
      data-target-direction={scene.targetDirection}
      aria-hidden="true"
      style={{
        '--mascot-x': `${scene.x}px`,
        '--mascot-y': `${scene.y}px`,
        '--mascot-height': `${scene.height}px`,
        '--mascot-width': `${scene.height * 0.54}px`,
        '--mascot-walk-duration': `${Math.max(400, Number(config.walkDurationMs) || 2700)}ms`,
      }}
    >
      {scene.phase === 'acting' && (
        <span className="roaming-mascot__speech">
          <PixelText value={scene.speech} />
        </span>
      )}
      <img
        className="roaming-mascot__sprite"
        src={assetUrl(sprite)}
        alt=""
        draggable="false"
      />
      {scene.phase === 'acting' && scene.action === 'point' && (
        <span className="roaming-mascot__point-arm" />
      )}
      {scene.phase === 'acting' && scene.action === 'wave' && (
        <span className="roaming-mascot__wave-arm" />
      )}
      {scene.phase === 'acting' && <span className="roaming-mascot__emote">{emote}</span>}
      {scene.action === 'roast' && scene.phase === 'acting' && (
        <span className="roaming-mascot__skewer" />
      )}
    </div>
  )
}
