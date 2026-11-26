let audioContext = null
let countdownBusyUntil = 0
let interfaceBusyUntil = 0
let mascotBusyUntil = 0

function getAudioContext() {
  if (audioContext) return audioContext
  if (typeof window === 'undefined') return null

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
  if (!AudioContextConstructor) return null

  audioContext = new AudioContextConstructor({ latencyHint: 'interactive' })
  return audioContext
}

function clampVolume(volume) {
  const parsedVolume = Number(volume)
  if (!Number.isFinite(parsedVolume)) return 0
  return Math.min(1, Math.max(0, parsedVolume))
}

function scheduleClick(context, volume, type) {
  if (!context || context.state !== 'running') return

  const now = context.currentTime
  const isCountdown = type === 'countdown'
  if (volume <= 0) return
  if (isCountdown) {
    if (now < countdownBusyUntil || now < mascotBusyUntil) return
    countdownBusyUntil = now + 0.07
  } else {
    // UI sounds never overlap countdown ticks or the mascot's entrance/exit cue.
    if (now < interfaceBusyUntil || now < countdownBusyUntil || now < mascotBusyUntil) return
    interfaceBusyUntil = now + 0.045
  }

  const duration = isCountdown ? 0.032 : 0.026
  const noiseBuffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * duration),
    context.sampleRate,
  )
  const noiseData = noiseBuffer.getChannelData(0)
  for (let index = 0; index < noiseData.length; index += 1) {
    const decay = 1 - index / noiseData.length
    // Fixed, repeatable noise keeps each countdown tick at the same perceived level.
    const seed = Math.sin((index + 1) * 12.9898) * 43758.5453
    const sample = (seed - Math.floor(seed)) * 2 - 1
    noiseData[index] = sample * decay * decay
  }

  const noise = context.createBufferSource()
  noise.buffer = noiseBuffer
  const filter = context.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(isCountdown ? 1450 : 980, now)
  filter.Q.setValueAtTime(0.8, now)
  const noiseEnvelope = context.createGain()
  noiseEnvelope.gain.setValueAtTime(0.0001, now)
  noiseEnvelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.72), now + 0.002)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  noise.connect(filter)
  filter.connect(noiseEnvelope)
  noiseEnvelope.connect(context.destination)
  noise.start(now)
  noise.stop(now + duration)

  const tone = context.createOscillator()
  tone.type = 'sine'
  tone.frequency.setValueAtTime(isCountdown ? 740 : 520, now)
  tone.frequency.exponentialRampToValueAtTime(isCountdown ? 390 : 300, now + 0.05)
  const toneEnvelope = context.createGain()
  toneEnvelope.gain.setValueAtTime(0.0001, now)
  toneEnvelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.36), now + 0.002)
  toneEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.052)
  tone.connect(toneEnvelope)
  toneEnvelope.connect(context.destination)
  tone.start(now)
  tone.stop(now + 0.055)
}

export function playInterfaceClick(volume) {
  const context = getAudioContext()
  if (!context) return

  const safeVolume = clampVolume(volume)
  if (context.state === 'suspended') {
    // This is called directly by a user click, which unlocks audio in browsers.
    context.resume().then(() => scheduleClick(context, safeVolume, 'interface')).catch(() => {})
    return
  }

  scheduleClick(context, safeVolume, 'interface')
}

export function playCountdownClick(volume) {
  // Do not create/resume audio from a timer callback; wait for a user gesture first.
  if (!audioContext || audioContext.state !== 'running') return
  scheduleClick(audioContext, clampVolume(volume), 'countdown')
}

export function playMascotCue(volume, phase = 'appear') {
  if (!audioContext || audioContext.state !== 'running') return

  const safeVolume = clampVolume(volume)
  if (safeVolume <= 0) return

  const now = audioContext.currentTime
  if (now < mascotBusyUntil || now < countdownBusyUntil || now < interfaceBusyUntil) return

  const duration = 0.14
  mascotBusyUntil = now + duration

  const tone = audioContext.createOscillator()
  tone.type = 'sine'
  tone.frequency.setValueAtTime(phase === 'appear' ? 590 : 760, now)
  tone.frequency.exponentialRampToValueAtTime(phase === 'appear' ? 810 : 520, now + duration)

  const envelope = audioContext.createGain()
  envelope.gain.setValueAtTime(0.0001, now)
  envelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, safeVolume), now + 0.012)
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  tone.connect(envelope)
  envelope.connect(audioContext.destination)
  tone.start(now)
  tone.stop(now + duration)
}
