import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading, AccordionItem } from '../components/ContentBlocks.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Rules() {
  const copy = siteConfig.copy.rules
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
          eyebrow={siteConfig.rules.eyebrow}
          title={siteConfig.rules.title}
          description={siteConfig.rules.description}
          index={siteConfig.rules.index}
        />

        <div className="rules-layout">
          <aside className="rules-aside" data-reveal>
            <span className="aside-kicker">{copy.asideKicker}</span>
            <p>{copy.asideDescription}</p>
            <div className="rule-tabs" role="tablist" aria-label={copy.tabsLabel}>
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
            <span className="rules-aside-foot">{copy.footerNote.map((line) => <span key={line}>{line}</span>)}</span>
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
                <span className="eyebrow">{copy.panelEyebrow}</span>
                <h3>{currentCategory?.label || copy.defaultCategory}</h3>
              </div>
              <span className="rules-count">{String(currentCategory?.rules.length || 0).padStart(2, '0')} {copy.itemCountSuffix}</span>
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
              <p className="empty-content">{copy.emptyState} <span>{copy.emptyStateHint}</span></p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
