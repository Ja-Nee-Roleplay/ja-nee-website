import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('home')

  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const sections = sectionKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id)
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.3, 0.55] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionKey])

  return activeSection
}