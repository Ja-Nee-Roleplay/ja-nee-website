import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'

const EMPTY_STATUS = {
  state: 'unknown',
  players: null,
  maxPlayers: null,
  lastUpdated: null,
  message: siteConfig.copy.status.notConnected,
}

function parseCount(value) {
  const count = Number(value)
  return Number.isFinite(count) && count >= 0 ? count : null
}

function readServerPayload(payload) {
  const data = payload && typeof payload === 'object'
    ? (payload.Data && typeof payload.Data === 'object' ? payload.Data
      : payload.data && typeof payload.data === 'object' ? payload.data
        : payload)
    : null

  if (!data) return null

  const rawState = data.status || data.serverStatus || data.state || data.availability
  const normalisedState = typeof rawState === 'string' ? rawState.toLowerCase().trim() : ''
  const validStates = ['online', 'offline', 'restarting', 'maintenance']

  if (normalisedState === 'unknown') {
    return {
      state: 'unknown',
      players: null,
      maxPlayers: null,
      message: typeof data.message === 'string' ? data.message : '',
    }
  }

  const players = parseCount(
    data.players ?? data.clients ?? data.currentPlayers ?? data.playerCount,
  )
  const maxPlayers = parseCount(
    data.maxPlayers ?? data.max_players ?? data.sv_maxclients ?? data.capacity,
  )

  if (validStates.includes(normalisedState)) {
    return { state: normalisedState, players, maxPlayers }
  }

  // Cfx.re dynamic.json returns player and capacity fields but no maintenance state.
  if (players !== null || maxPlayers !== null || typeof data.hostname === 'string') {
    return { state: 'online', players, maxPlayers }
  }

  return null
}

function getStatusUrl(settings) {
  if (settings.statusApiEndpoint) return settings.statusApiEndpoint.trim()
  if (!settings.serverIp) return ''
  const host = settings.serverIp.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '')
  return 'http://' + host + ':' + settings.serverPort + settings.directEndpointPath
}

export function useServerStatus() {
  const url = getStatusUrl(siteConfig.fivem)
  const [status, setStatus] = useState(() => url
    ? { ...EMPTY_STATUS, message: siteConfig.copy.status.checking }
    : EMPTY_STATUS)

  useEffect(() => {
    let stopped = false
    let intervalId
    let activeController = null
    let lastSuccessfulUpdate = null

    if (!url) return undefined

    async function refreshStatus() {
      const controller = new AbortController()
      activeController = controller
      const timeoutId = window.setTimeout(
        () => controller.abort(),
        siteConfig.fivem.timeoutMs,
      )

      try {
        const response = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('http')

        const payload = await response.json()
        const parsed = readServerPayload(payload)
        if (!parsed) throw new Error('unsupported')

        if (parsed.state === 'unknown') {
          if (!stopped) {
            setStatus({
              ...parsed,
              lastUpdated: lastSuccessfulUpdate,
              message: parsed.message || siteConfig.copy.status.unreachable,
            })
          }
          return
        }

        lastSuccessfulUpdate = new Date()
        if (!stopped) {
          setStatus({
            ...parsed,
            lastUpdated: lastSuccessfulUpdate,
            message: '',
          })
        }
      } catch (error) {
        if (!stopped) {
          setStatus({
            state: 'unknown',
            players: null,
            maxPlayers: null,
            lastUpdated: lastSuccessfulUpdate,
            message: error.name === 'AbortError'
              ? siteConfig.copy.status.timedOut
              : error.message === 'unsupported'
                ? siteConfig.copy.status.unsupportedResponse
                : siteConfig.copy.status.unreachable,
          })
        }
      } finally {
        window.clearTimeout(timeoutId)
        if (activeController === controller) activeController = null
      }
    }

    refreshStatus()
    intervalId = window.setInterval(
      refreshStatus,
      Math.max(15000, siteConfig.fivem.refreshIntervalMs),
    )

    return () => {
      stopped = true
      window.clearInterval(intervalId)
      activeController?.abort()
    }
  }, [url])

  return status
}
