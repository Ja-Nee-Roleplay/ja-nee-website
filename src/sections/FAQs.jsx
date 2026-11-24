import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading, AccordionItem } from '../components/ContentBlocks.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function FAQs() {
  const copy = siteConfig.copy.faqs
  const section = siteConfig.faqSection
  const categories = [copy.allCategory, ...new Set(siteConfig.faqs.map((faq) => faq.category).filter(Boolean))]
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const visibleFaqs = siteConfig.faqs.filter(
    (faq) => activeCategory === copy.allCategory || faq.category === activeCategory,
  )

  return (
    <section
      id="faqs"
      className="section faq-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.faqs)}
      aria-labelledby="faq-title"
    >
      <div className="page-shell faq-layout">
        <div className="faq-intro">
          <SectionHeading
            id="faq-title"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            index={section.index}
          />
          <div className="faq-category-picker" aria-label={copy.filterLabel}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'is-active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="faq-placeholder-note">{copy.statusNote}</p>
        </div>

        <div className="faq-list" data-reveal>
          {visibleFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              index={'faq-' + index + '-' + faq.question.replace(/[^a-z0-9]/gi, '-').toLowerCase()}
              title={faq.question}
            >
              {faq.answer}
            </AccordionItem>
          ))}
          {!visibleFaqs.length && (
            <p className="empty-content">{copy.emptyState} <span>{copy.emptyStateHint}</span></p>
          )}
        </div>
      </div>
    </section>
  )
}
