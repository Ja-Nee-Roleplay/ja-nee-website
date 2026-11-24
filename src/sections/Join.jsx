import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { DiscordAction } from '../components/SiteNav.jsx'
import { discordWidgetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Join() {
  const [widgetFailed, setWidgetFailed] = useState(false)
  const widgetUrl = siteConfig.discord.widgetEnabled ? discordWidgetUrl() : ''
  const showWidget = Boolean(widgetUrl && !widgetFailed)

  return (
    <section
      id="join"
      className="section join-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.join)}
      aria-labelledby="join-title"
    >
      <div className="page-shell join-layout">
        <div className="join-copy" data-reveal>
          <span className="join-mark"><Icon name="discord" size={29} /></span>
          <SectionHeading
            id="join-title"
            eyebrow="06 / COME SAY HELLO"
            title={siteConfig.discord.heading}
            description={siteConfig.discord.message}
            dark
            index="06"
          />
          <div className="join-actions">
            {siteConfig.discord.inviteUrl ? (
              <DiscordAction className="button button--gold button--large">
                Join the community
                <Icon name="arrow" size={18} />
              </DiscordAction>
            ) : (
              <p className="join-config-note"><span className="community-link-dot" /> The official community link will be shared here once it’s ready.</p>
            )}
          </div>
          <div className="join-promise">
            <span className="join-promise-line" aria-hidden="true" />
            <p>One landing page. All the details you need before you join.</p>
          </div>
        </div>

        <div className="discord-widget-wrap" data-reveal>
          <div className="widget-frame">
            <div className="widget-frame-head">
              <span><span className="widget-live-dot" /> DISCORD COMMUNITY</span>
              <span className="widget-frame-mark">JN / RP</span>
            </div>
            {showWidget ? (
              <iframe
                className="discord-widget"
                src={widgetUrl}
                title="Ja-Nee RP Discord server widget"
                width={siteConfig.discord.widgetWidth}
                height={siteConfig.discord.widgetHeight}
                loading="lazy"
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                onError={() => setWidgetFailed(true)}
              />
            ) : (
              <div className="widget-fallback" role="note">
                <span className="widget-fallback-icon"><Icon name="discord" size={32} /></span>
                <strong>{widgetFailed ? 'Community preview unavailable.' : 'A little more of the community.'}</strong>
                <p>
                  {widgetFailed
                    ? 'The official invite will remain available here when the community link is ready.'
                    : 'The community preview will appear here when it’s available.'}
                </p>
                <span className="widget-placeholder-code">JA-NEE RP / COMMUNITY</span>
              </div>
            )}
            <div className="widget-frame-foot">
              <span>JA-NEE RP</span>
              <span>COMMUNITY / CONNECTION</span>
            </div>
          </div>
          <p className="widget-caption">The embedded widget is optional. The invite link stays separate and works without it.</p>
        </div>
      </div>
      <div className="join-decoration" aria-hidden="true">SEE YOU<br />IN THE CITY</div>
    </section>
  )
}
