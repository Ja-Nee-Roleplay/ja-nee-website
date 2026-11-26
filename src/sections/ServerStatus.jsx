import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import { ServerStatusCard } from '../components/SiteNav.jsx'

export default function ServerStatusSection({ status }) {
  const section = siteConfig.statusSection
  const state = siteConfig.statusSection.glow[status?.state]
    ? status.state
    : 'unknown'

  return (
    <section
      id="status"
      className="section server-status-section"
      data-status-state={state}
      style={{ '--server-status-glow': section.glow[state] }}
      aria-labelledby="server-status-title"
    >
      <div className="page-shell server-status-layout">
        <SectionHeading
          id="server-status-title"
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          index={section.index}
          dark
        />
        <div className="server-status-display" data-reveal>
          <span className="server-status-display-label">{siteConfig.copy.status.buttonLabel}</span>
          <ServerStatusCard status={status} />
        </div>
      </div>
    </section>
  )
}
