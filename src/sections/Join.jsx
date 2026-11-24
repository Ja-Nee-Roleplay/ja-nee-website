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
            <DiscordAction className="button button--gold button--large">
              {siteConfig.discord.inviteUrl ? 'Join our Discord' : 'Discord invite needed'}
              <Icon name="arrow" size={18} />
            </DiscordAction>
            {!siteConfig.discord.inviteUrl && (
              <p className="join-config-note">
                Add the official invite URL in <code>siteConfig.js</code>. This button will open it in a new tab.
              </p>
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
                <strong>{widgetFailed ? 'Widget could not load.' : 'Your Discord widget goes here.'}</strong>
                <p>
                  {widgetFailed
                    ? 'The invite button remains available when the official invite is configured.'
                    : 'Add the Discord Server ID and enable the server widget in siteConfig.js.'}
                </p>
                <span className="widget-placeholder-code">WIDGET / {siteConfig.discord.serverId ? 'CHECK SETTINGS' : 'AWAITING SERVER ID'}</span>
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
