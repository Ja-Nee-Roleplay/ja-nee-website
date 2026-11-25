import { useEffect } from 'react'
import siteConfig from '../config/siteConfig.js'
import { playInterfaceClick } from '../utils/audioFeedback.js'

export default function InteractionSounds() {
  useEffect(() => {
    const audio = siteConfig.audio
    if (!audio.enabled || !audio.interfaceClicksEnabled) return undefined

    function handleClick(event) {
      if (event.button !== 0) return
      const clickedNode = event.target instanceof Element ? event.target : event.target?.parentElement
      if (!clickedNode?.closest('.site-shell')) return
      playInterfaceClick(audio.interfaceClickVolume)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
