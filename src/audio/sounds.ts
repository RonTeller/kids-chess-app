// Simple audio utility using Web Audio API for gentle game sounds

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

// Play a gentle "pop" sound for piece moves
export function playMoveSound() {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.setValueAtTime(400, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1)
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.15)
}

// Play a cheerful "ding" for capturing stars
export function playStarSound() {
  const ctx = getAudioContext()

  // Play two notes for a pleasant chime
  const frequencies = [523, 659] // C5 and E5

  frequencies.forEach((freq, i) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)
    oscillator.type = 'sine'

    const startTime = ctx.currentTime + i * 0.08
    gainNode.gain.setValueAtTime(0.25, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.3)
  })
}

// Play a celebratory sound for completing a phase
export function playCelebrationSound() {
  const ctx = getAudioContext()

  // Play a cheerful ascending arpeggio
  const frequencies = [523, 659, 784, 1047] // C5, E5, G5, C6

  frequencies.forEach((freq, i) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
    oscillator.type = 'sine'

    const startTime = ctx.currentTime + i * 0.1
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.4)
  })
}

// Play fireworks celebration sound
export function playFireworksSound() {
  const ctx = getAudioContext()

  // Multiple bursts of sound
  for (let burst = 0; burst < 3; burst++) {
    const burstTime = ctx.currentTime + burst * 0.4

    // Each burst has multiple frequencies
    const frequencies = [400, 500, 600, 800].map(f => f + Math.random() * 100)

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(freq, burstTime)
      oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, burstTime + 0.3)
      oscillator.type = 'sine'

      const startTime = burstTime + i * 0.02
      gainNode.gain.setValueAtTime(0.15, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  }
}
