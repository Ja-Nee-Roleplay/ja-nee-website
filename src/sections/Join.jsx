import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { DiscordAction } from '../components/SiteNav.jsx'
import { discordWidgetDataUrl, discordWidgetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Join() {
  const [widgetState, setWidgetState] = useState(
    siteConfig.discord.widgetEnabled && siteConfig.discord.serverId ? 'checking' : 'not-configured',
  )
  const widgetUrl = siteConfig.discord.widgetEnabled ? discordWidgetUrl() : ''
  const widgetDataUrl = siteConfig.discord.widgetEnabled ? discordWidgetDataUrl() : ''
  const copy = siteConfig.copy.join

  useEffect(() => {
    if (!widgetDataUrl) {
      return undefined
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(
      () => controller.abort(),
      siteConfig.discord.widgetCheckTimeoutMs,
    )

    fetch(widgetDataUrl, { signal: controller.signal, cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          setWidgetState(response.status === 403 ? 'disabled' : response.status === 404 ? 'not-found' : 'unavailable')
          return null
        }
        return response.json()
      })
      .then((data) => {
        if (data) setWidgetState(data.id ? 'ready' : 'not-found')
      })
      .catch((error) => setWidgetState(error?.name === 'AbortError' ? 'timeout' : 'unavailable'))
      .finally(() => window.clearTimeout(timeout))

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [widgetDataUrl])

  const showWidget = Boolean(widgetUrl && widgetState === 'ready')

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
            eyebrow={copy.eyebrow}
            title={siteConfig.discord.heading}
            description={siteConfig.discord.message}
            dark
            index={copy.index}
          />
          <div className="join-actions">
            {siteConfig.discord.inviteUrl ? (
              <DiscordAction className="button button--gold button--large">
                {copy.inviteLabel}
                <Icon name="arrow" size={18} />
              </DiscordAction>
            ) : (
              <p className="join-config-note"><span className="community-link-dot" /> {copy.inviteUnavailable}</p>
            )}
          </div>
          <div className="join-promise">
            <span className="join-promise-line" aria-hidden="true" />
            <p>{copy.promise}</p>
          </div>
        </div>

        <div className="discord-widget-wrap" data-reveal>
          <div className="widget-frame">
            <div className="widget-frame-head">
              <span><span className="widget-live-dot" /> {copy.widgetHeading}</span>
              <span className="widget-frame-mark">{copy.widgetMark}</span>
            </div>
            {showWidget ? (
              <iframe
                className="discord-widget"
                src={widgetUrl}
                title={copy.widgetIframeTitle}
                width={siteConfig.discord.widgetWidth}
                height={siteConfig.discord.widgetHeight}
                loading="lazy"
                onError={() => setWidgetState('unavailable')}
              />
            ) : widgetState === 'checking' ? (
              <div className="widget-loading" role="status" aria-live="polite">
                <span className="widget-loading-orbit"><Icon name="discord" size={27} /></span>
                <strong>{copy.widgetLoadingTitle}</strong>
                <p>{copy.widgetLoadingMessage}</p>
                <span className="widget-loading-bar" aria-hidden="true" />
              </div>
            ) : (
              <div className="widget-fallback" role="note">
                <span className="widget-fallback-icon"><Icon name="discord" size={32} /></span>
                <strong>{copy.widgetUnavailableTitle}</strong>
                <p>
                  {widgetState === 'disabled'
                    ? copy.widgetDisabledMessage
                    : widgetState === 'not-found'
                      ? copy.widgetServerNotFoundMessage
                      : widgetState === 'timeout'
                        ? copy.widgetTimeoutMessage
                        : widgetState === 'not-configured'
                          ? copy.widgetNotConfiguredMessage
                          : copy.widgetNetworkMessage}
                </p>
                {siteConfig.discord.inviteUrl && (
                  <DiscordAction className="widget-fallback-link">
                    {copy.inviteLabel}<Icon name="arrow" size={15} />
                  </DiscordAction>
                )}
                <span className="widget-placeholder-code">{copy.widgetPlaceholder}</span>
              </div>
            )}
            <div className="widget-frame-foot">
              <span>{copy.widgetFooterBrand}</span>
              <span>{copy.widgetFooterLabel}</span>
            </div>
          </div>
          <p className="widget-caption">{copy.widgetCaption}</p>
        </div>
      </div>
      <div className="join-decoration" aria-hidden="true">{copy.decoration.map((line) => <span key={line}>{line}</span>)}</div>
    </section>
  )
}
