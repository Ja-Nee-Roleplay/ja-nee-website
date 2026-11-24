import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { assetUrl } from '../utils/siteHelpers.js'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const cursor = siteConfig.cursor
  const [image, setImage] = useState(() => cursor.defaultImage ? assetUrl(cursor.defaultImage) : '')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!cursor.enabled || !cursor.defaultImage || !supportsFinePointer) return undefined

    const root = document.documentElement
    root.classList.add('cursor-active')

    function updatePosition(event) {
      const element = cursorRef.current
      if (!element) return
      element.style.transform = 'translate3d(' + event.clientX + 'px, ' + event.clientY + 'px, 0)'
      setVisible(true)
    }

    function updateCursorImage(event) {
      const target = event.target instanceof Element ? event.target : null
      if (!target) return

      const interactive = target.closest('a, button, summary, [role="button"], [data-cursor="interactive"]')
      const textField = target.closest('input, textarea, [contenteditable="true"], [data-cursor="text"]')
      const nextImage = textField
        ? (cursor.textImage || cursor.defaultImage)
        : interactive
          ? (cursor.interactionImage || cursor.pointerImage || cursor.defaultImage)
          : cursor.defaultImage

      if (nextImage) setImage(assetUrl(nextImage))
    }

    function hideCursor() {
      setVisible(false)
    }

    function showCursor() {
      setVisible(true)
    }

    window.addEventListener('pointermove', updatePosition, { passive: true })
    document.addEventListener('pointerover', updateCursorImage, { passive: true })
    document.addEventListener('pointerleave', hideCursor)
    document.addEventListener('pointerenter', showCursor)

    return () => {
      root.classList.remove('cursor-active')
      window.removeEventListener('pointermove', updatePosition)
      document.removeEventListener('pointerover', updateCursorImage)
      document.removeEventListener('pointerleave', hideCursor)
      document.removeEventListener('pointerenter', showCursor)
    }
  }, [cursor])

  if (!cursor.enabled || !cursor.defaultImage) return null

  return (
    <img
      ref={cursorRef}
      className={'custom-cursor' + (cursor.animate ? ' custom-cursor--animate' : '')}
      src={image}
      alt=""
      aria-hidden="true"
      width={cursor.width}
      height={cursor.height}
      style={{
        width: cursor.width,
        height: cursor.height,
        marginLeft: -cursor.hotspotX,
        marginTop: -cursor.hotspotY,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}