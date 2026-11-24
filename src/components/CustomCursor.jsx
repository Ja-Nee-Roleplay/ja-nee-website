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
    root.classList.add('cursor-active')

    function updatePosition(event) {
      const element = cursorRef.current
      if (!element) return
      element.style.transform = 'translate3d(' + event.clientX + 'px, ' + event.clientY + 'px, 0)'
      element.style.opacity = '1'
    }

    function updateCursorImage(event) {
      const target = event.target instanceof Element ? event.target : null
      const element = cursorRef.current
      if (!target || !element) return

      const textField = target.closest('input, textarea, [contenteditable="true"], [data-cursor="text"]')
      const link = target.closest('a[href], [role="link"]')
      const button = target.closest('button, summary, [role="button"], [data-cursor="interactive"]')
      const text = target.closest('h1, h2, h3, h4, h5, h6, p, li, label, blockquote, figcaption, strong, em, [data-cursor="text"]')
      const nextType = textField ? 'text' : link ? 'interaction' : button ? 'pointer' : text ? 'text' : 'default'
      const path = {
        default: cursor.defaultImage,
        pointer: cursor.pointerImage || cursor.defaultImage,
        text: cursor.textImage || cursor.defaultImage,
        interaction: cursor.interactionImage || cursor.pointerImage || cursor.defaultImage,
      }[nextType]
      const hotspot = cursor.hotspots?.[nextType] || cursor.hotspots?.default || defaultHotspot
      const image = assetUrl(path)

      if (element.dataset.cursorImage !== image) {
        element.src = image
        element.dataset.cursorImage = image
      }
      element.style.marginLeft = -hotspot.x + 'px'
      element.style.marginTop = -hotspot.y + 'px'
    }

    function hideCursor() {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }

    window.addEventListener('pointermove', updatePosition, { passive: true })
    document.addEventListener('pointerover', updateCursorImage, { passive: true })
    document.addEventListener('mouseleave', hideCursor)
    window.addEventListener('blur', hideCursor)

    return () => {
      root.classList.remove('cursor-active')
      window.removeEventListener('pointermove', updatePosition)
      document.removeEventListener('pointerover', updateCursorImage)
      document.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('blur', hideCursor)
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
        marginLeft: -defaultHotspot.x,
        marginTop: -defaultHotspot.y,
        opacity: 0,
      }}
    />
  )
}
