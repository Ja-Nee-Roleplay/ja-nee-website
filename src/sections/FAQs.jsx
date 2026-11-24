import { useMemo, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading, AccordionItem } from '../components/ContentBlocks.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function FAQs() {
  const categories = useMemo(
    () => ['All questions', ...new Set(siteConfig.faqs.map((faq) => faq.category).filter(Boolean))],
    [],
  )
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const visibleFaqs = siteConfig.faqs.filter(
    (faq) => activeCategory === 'All questions' || faq.category === activeCategory,
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
            eyebrow="04 / QUICK ANSWERS"
            title="Before you step inside."
            description="A few quick answers to make the first steps feel simple."
            index="04"
          />
          <div className="faq-category-picker" aria-label="Filter questions by topic">
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
          <p className="faq-placeholder-note">SOME DETAILS ARE STILL BEING PREPARED</p>
        </div>

        <div className="faq-list" data-reveal>
          {visibleFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              index={'faq-' + index + '-' + faq.question.replace(/[^a-z0-9]/gi, '-').toLowerCase()}
              title={faq.question}
              example={faq.isExample}
            >
              {faq.answer}
            </AccordionItem>
          ))}
          {!visibleFaqs.length && (
            <p className="empty-content">No questions in this topic yet. Add one in the FAQ list in <code>siteConfig.js</code>.</p>
          )}
        </div>
      </div>
    </section>
  )
}
