import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading, AccordionItem } from '../components/ContentBlocks.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Rules() {
  const categories = siteConfig.rules.categories
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '')
  const currentCategory = categories.find((category) => category.id === activeCategory) || categories[0]

  return (
    <section
      id="rules"
      className="section rules-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.rules)}
      aria-labelledby="rules-title"
    >
      <div className="page-shell">
        <SectionHeading
          id="rules-title"
          eyebrow="03 / BEFORE YOU PLAY"
          title="A good scene starts with shared ground."
          description="A little shared understanding makes it easier for everyone to settle in and enjoy the story."
          index="03"
        />

        <div className="rules-layout">
          <aside className="rules-aside" data-reveal>
            <span className="aside-kicker">THE COMMUNITY GUIDE</span>
            <p>Choose a chapter to explore.</p>
            <div className="rule-tabs" role="tablist" aria-label="Rule categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  id={'rule-tab-' + category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  aria-controls="rules-panel"
                  tabIndex={activeCategory === category.id ? 0 : -1}
                  className={activeCategory === category.id ? 'is-active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(event) => {
                    const currentIndex = categories.findIndex((item) => item.id === category.id)
                    let nextIndex = null
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % categories.length
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + categories.length) % categories.length
                    if (event.key === 'Home') nextIndex = 0
                    if (event.key === 'End') nextIndex = categories.length - 1
                    if (nextIndex !== null) {
                      event.preventDefault()
                      const nextCategory = categories[nextIndex]
                      setActiveCategory(nextCategory.id)
                      document.getElementById('rule-tab-' + nextCategory.id)?.focus()
                    }
                  }}
                >
                  <span>{category.label}</span><span className="tab-index">{String(categories.indexOf(category) + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <span className="rules-aside-foot">RULES CAN CHANGE<br />CHECK OFFICIAL UPDATES</span>
          </aside>

          <div
            id="rules-panel"
            className="rules-panel"
            role="tabpanel"
            aria-labelledby={currentCategory ? 'rule-tab-' + currentCategory.id : undefined}
            data-reveal
          >
            <div className="rules-panel-head">
              <div>
                <span className="eyebrow">JA-NEE RP / COMMUNITY GUIDE</span>
                <h3>{currentCategory?.label || 'Rules'}</h3>
              </div>
              <span className="rules-count">{String(currentCategory?.rules.length || 0).padStart(2, '0')} ITEMS</span>
            </div>
            <p className="placeholder-banner" role="note">{siteConfig.rules.starterNotice}</p>
            {currentCategory?.rules.length ? (
              <div className="accordion-list">
                {currentCategory.rules.map((rule, index) => (
                  <AccordionItem
                    key={currentCategory.id + '-' + rule.title}
                    index={'rule-' + currentCategory.id + '-' + index}
                    title={rule.title}
                    note={rule.note}
                    warning={rule.warning}
                    example
                  >
                    {rule.description}
                  </AccordionItem>
                ))}
              </div>
            ) : (
              <p className="empty-content">No rules are listed in this chapter yet. Add official entries in <code>siteConfig.js</code>.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
