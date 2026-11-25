import { useEffect } from 'react'
import siteConfig from '../config/siteConfig.js'
import { playInterfaceClick } from '../utils/audioFeedback.js'

export default function InteractionSounds() {
  useEffect(() => {
    const audio = siteConfig.audio
    if (!audio.enabled || !audio.interfaceClicksEnabled) return undefined

    function playForTarget(target) {
      const clickedNode = target instanceof Element ? target : target?.parentElement
      if (!clickedNode?.closest('.site-shell')) return
      playInterfaceClick(audio.interfaceClickVolume)
    }

    function handlePointerDown(event) {
      if (event.button !== 0) return
      playForTarget(event.target)
    }

    function handleKeyDown(event) {
      if (event.repeat || !['Enter', ' '].includes(event.key)) return
      const target = event.target instanceof Element ? event.target : event.target?.parentElement
      if (!target?.closest('.site-shell')) return
      if (!target.closest('a, button, [role="button"], summary, input[type="button"], input[type="submit"]')) return
      playInterfaceClick(audio.interfaceClickVolume)
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

  return null
}
