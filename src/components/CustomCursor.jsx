import { useEffect, useRef } from 'react'
import siteConfig from '../config/siteConfig.js'
import { assetUrl } from '../utils/siteHelpers.js'

const cursor = siteConfig.cursor
const defaultHotspot = cursor.hotspots?.default || { x: cursor.hotspotX, y: cursor.hotspotY }

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!cursor.enabled || !cursor.defaultImage || !supportsFinePointer) return undefined

    const root = document.documentElement
    let cursorType = 'default'
    let activeHotspot = defaultHotspot
    let animationFrame = 0
    let pointerX = 0
    let pointerY = 0
    let pointerInside = false
    root.classList.add('cursor-active')

    const imageByType = {
      default: assetUrl(cursor.defaultImage),
      pointer: assetUrl(cursor.pointerImage || cursor.defaultImage),
      text: assetUrl(cursor.textImage || cursor.defaultImage),
      interaction: assetUrl(cursor.interactionImage || cursor.pointerImage || cursor.defaultImage),
    }
    const preloadedImages = [...new Set(Object.values(imageByType))].map((src) => {
      const image = new Image()
      image.src = src
      return image
    })

    function applyPosition(x, y) {
      const element = cursorRef.current
      if (!element) return
      element.style.transform = 'translate3d(' + (x - activeHotspot.x) + 'px, ' + (y - activeHotspot.y) + 'px, 0)'
    }

    function showCursor(event) {
      if (event.pointerType === 'touch') return
      pointerX = event.clientX
      pointerY = event.clientY
      pointerInside = true
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
      applyPosition(pointerX, pointerY)
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
    }

    function updatePosition(event) {
      if (event.pointerType === 'touch') return
      if (!pointerInside) {
        showCursor(event)
        return
      }

      pointerX = event.clientX
      pointerY = event.clientY
      if (animationFrame) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        if (pointerInside) applyPosition(pointerX, pointerY)
      })
    }

    function updateCursorImage(event) {
      if (event.pointerType === 'touch') return
      const target = event.target instanceof Element ? event.target : null
      const element = cursorRef.current
      if (!target || !element) return

      const textField = target.closest(
        'textarea, [contenteditable="true"], [data-cursor="text"], input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"])',
      )
      const link = target.closest('a[href]:not([aria-disabled="true"]), [role="link"]:not([aria-disabled="true"])')
      const button = target.closest(
        'button:not(:disabled):not([aria-disabled="true"]), summary, select, [role="button"]:not([aria-disabled="true"]), [data-cursor="interactive"]',
      )
      const nextType = textField ? 'text' : link ? 'interaction' : button ? 'pointer' : 'default'
      if (nextType === cursorType) return

      cursorType = nextType
      activeHotspot = cursor.hotspots?.[nextType] || cursor.hotspots?.default || defaultHotspot
      const image = imageByType[nextType]

      if (element.dataset.cursorImage !== image) {
        element.src = image
        element.dataset.cursorImage = image
      }
      pointerX = event.clientX
      pointerY = event.clientY
      applyPosition(pointerX, pointerY)
    }

    function hideCursor() {
      pointerInside = false
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') hideCursor()
    }

    const page = document.documentElement
    page.addEventListener('pointerenter', showCursor)
    page.addEventListener('pointerleave', hideCursor)
    window.addEventListener('pointermove', updatePosition, { passive: true })
    document.addEventListener('pointerover', updateCursorImage, { passive: true })
    window.addEventListener('blur', hideCursor)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      root.classList.remove('cursor-active')
      page.removeEventListener('pointerenter', showCursor)
      page.removeEventListener('pointerleave', hideCursor)
      window.removeEventListener('pointermove', updatePosition)
      document.removeEventListener('pointerover', updateCursorImage)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      preloadedImages.length = 0
    }
  }, [])

  if (!cursor.enabled || !cursor.defaultImage) return null

  return (
    <img
      ref={cursorRef}
      className={'custom-cursor' + (cursor.animate ? ' custom-cursor--animate' : '')}
      src={assetUrl(cursor.defaultImage)}
      alt=""
      aria-hidden="true"
      width={cursor.width}
      height={cursor.height}
      style={{
        width: cursor.width,
        height: cursor.height,
        opacity: 0,
      }}
    />
  )
}
