import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Icon from './Icon.jsx'

export function AccordionItem({ title, children, note, warning, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = 'accordion-panel-' + index

  return (
    <article className={'accordion-item' + (isOpen ? ' is-open' : '')}>
      <h3 className="accordion-title">
        <button
          type="button"
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{title}</span>
          <span className="accordion-icon"><Icon name="plus" size={18} /></span>
        </button>
      </h3>
      <div id={panelId} className="accordion-panel" aria-hidden={!isOpen}>
        <div className="accordion-panel-inner">
          <p>{children}</p>
          {warning && <span className="rule-warning">{siteConfig.copy.common.warningPrefix} {warning}</span>}
          {note && <span className="accordion-note">{note}</span>}
        </div>
      </div>
    </article>
  )
}

export function SectionHeading({ id, eyebrow, title, description, dark = false, index }) {
  return (
    <div className={'section-heading' + (dark ? ' section-heading--light' : '')} data-reveal>
      <div className="section-heading-meta">
        <span className="eyebrow">{eyebrow}</span>
        {index && <span className="section-index">{index}</span>}
      </div>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-intro">{description}</p>}
    </div>
  )
}
