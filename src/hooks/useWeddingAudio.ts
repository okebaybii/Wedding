/**
 * Web Audio Synthesizer & Sound Effects for D--Webdding
 *
 * Fully self-contained Web Audio API solution:
 * - 0 external MP3 dependencies (100% reliable, 0 network latency, 0 404 errors)
 * - Sound Effects: Wax Seal Break, Paper Rustle, Celestial Chime
 * - Background Music: Acoustic Canon in D arpeggio loop with procedural reverb and delay
 * - Autoplay policy safe with audio context resumption on first user gesture
 */

import { useSyncExternalStore, useCallback, useEffect } from 'react'

export interface WeddingAudioState {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  trackTitle: string
  startMusic: () => Promise<void>
  pauseMusic: () => void
  toggleMusic: () => Promise<void>
  setVolume: (volume: number) => void
  toggleMute: () => void
  playWaxBreakSFX: () => void
  playPaperRustleSFX: () => void
  playChimeSFX: () => void
}

interface ChordNote {
  beatOffset: number
  freq: number
  duration: number
  velocity: number
}

// 8-Bar Canon in D acoustic chord progression with delicate harp/piano arpeggio
const CANON_IN_D_CHORDS: ChordNote[][] = [
  // Bar 1: D Major (D - F# - A)
  [
    { beatOffset: 0.0, freq: 146.83, duration: 2.4, velocity: 0.65 }, // D3 (Bass)
    { beatOffset: 0.5, freq: 220.00, duration: 1.4, velocity: 0.40 }, // A3
    { beatOffset: 1.0, freq: 293.66, duration: 1.4, velocity: 0.45 }, // D4
    { beatOffset: 1.5, freq: 369.99, duration: 1.4, velocity: 0.45 }, // F#4
    { beatOffset: 2.0, freq: 440.00, duration: 1.6, velocity: 0.55 }, // A4
    { beatOffset: 2.0, freq: 739.99, duration: 2.0, velocity: 0.50 }, // F#5 (Top Melody)
    { beatOffset: 2.5, freq: 587.33, duration: 1.2, velocity: 0.42 }, // D5
    { beatOffset: 3.0, freq: 440.00, duration: 1.2, velocity: 0.38 }, // A4
    { beatOffset: 3.5, freq: 369.99, duration: 1.2, velocity: 0.35 }, // F#4
  ],
  // Bar 2: A Major (A - C# - E)
  [
    { beatOffset: 0.0, freq: 110.00, duration: 2.4, velocity: 0.65 }, // A2 (Bass)
    { beatOffset: 0.5, freq: 164.81, duration: 1.4, velocity: 0.40 }, // E3
    { beatOffset: 1.0, freq: 220.00, duration: 1.4, velocity: 0.45 }, // A3
    { beatOffset: 1.5, freq: 277.18, duration: 1.4, velocity: 0.45 }, // C#4
    { beatOffset: 2.0, freq: 329.63, duration: 1.6, velocity: 0.55 }, // E4
    { beatOffset: 2.0, freq: 659.25, duration: 2.0, velocity: 0.50 }, // E5 (Top Melody)
    { beatOffset: 2.5, freq: 440.00, duration: 1.2, velocity: 0.42 }, // A4
    { beatOffset: 3.0, freq: 329.63, duration: 1.2, velocity: 0.38 }, // E4
    { beatOffset: 3.5, freq: 277.18, duration: 1.2, velocity: 0.35 }, // C#4
  ],
  // Bar 3: B Minor (B - D - F#)
  [
    { beatOffset: 0.0, freq: 123.47, duration: 2.4, velocity: 0.65 }, // B2 (Bass)
    { beatOffset: 0.5, freq: 185.00, duration: 1.4, velocity: 0.40 }, // F#3
    { beatOffset: 1.0, freq: 246.94, duration: 1.4, velocity: 0.45 }, // B3
    { beatOffset: 1.5, freq: 293.66, duration: 1.4, velocity: 0.45 }, // D4
    { beatOffset: 2.0, freq: 369.99, duration: 1.6, velocity: 0.55 }, // F#4
    { beatOffset: 2.0, freq: 587.33, duration: 2.0, velocity: 0.50 }, // D5 (Top Melody)
    { beatOffset: 2.5, freq: 493.88, duration: 1.2, velocity: 0.42 }, // B4
    { beatOffset: 3.0, freq: 369.99, duration: 1.2, velocity: 0.38 }, // F#4
    { beatOffset: 3.5, freq: 293.66, duration: 1.2, velocity: 0.35 }, // D4
  ],
  // Bar 4: F# Minor (F# - A - C#)
  [
    { beatOffset: 0.0, freq: 92.50,  duration: 2.4, velocity: 0.65 }, // F#2 (Bass)
    { beatOffset: 0.5, freq: 138.59, duration: 1.4, velocity: 0.40 }, // C#3
    { beatOffset: 1.0, freq: 185.00, duration: 1.4, velocity: 0.45 }, // F#3
    { beatOffset: 1.5, freq: 220.00, duration: 1.4, velocity: 0.45 }, // A3
    { beatOffset: 2.0, freq: 277.18, duration: 1.6, velocity: 0.55 }, // C#4
    { beatOffset: 2.0, freq: 554.37, duration: 2.0, velocity: 0.50 }, // C#5 (Top Melody)
    { beatOffset: 2.5, freq: 369.99, duration: 1.2, velocity: 0.42 }, // F#4
    { beatOffset: 3.0, freq: 277.18, duration: 1.2, velocity: 0.38 }, // C#4
    { beatOffset: 3.5, freq: 220.00, duration: 1.2, velocity: 0.35 }, // A3
  ],
  // Bar 5: G Major (G - B - D)
  [
    { beatOffset: 0.0, freq: 98.00,  duration: 2.4, velocity: 0.65 }, // G2 (Bass)
    { beatOffset: 0.5, freq: 146.83, duration: 1.4, velocity: 0.40 }, // D3
    { beatOffset: 1.0, freq: 196.00, duration: 1.4, velocity: 0.45 }, // G3
    { beatOffset: 1.5, freq: 246.94, duration: 1.4, velocity: 0.45 }, // B3
    { beatOffset: 2.0, freq: 293.66, duration: 1.6, velocity: 0.55 }, // D4
    { beatOffset: 2.0, freq: 493.88, duration: 2.0, velocity: 0.50 }, // B4 (Top Melody)
    { beatOffset: 2.5, freq: 392.00, duration: 1.2, velocity: 0.42 }, // G4
    { beatOffset: 3.0, freq: 293.66, duration: 1.2, velocity: 0.38 }, // D4
    { beatOffset: 3.5, freq: 246.94, duration: 1.2, velocity: 0.35 }, // B3
  ],
  // Bar 6: D Major (D - F# - A)
  [
    { beatOffset: 0.0, freq: 146.83, duration: 2.4, velocity: 0.65 }, // D3 (Bass)
    { beatOffset: 0.5, freq: 220.00, duration: 1.4, velocity: 0.40 }, // A3
    { beatOffset: 1.0, freq: 293.66, duration: 1.4, velocity: 0.45 }, // D4
    { beatOffset: 1.5, freq: 369.99, duration: 1.4, velocity: 0.45 }, // F#4
    { beatOffset: 2.0, freq: 440.00, duration: 1.6, velocity: 0.55 }, // A4
    { beatOffset: 2.0, freq: 440.00, duration: 2.0, velocity: 0.48 }, // A4 (Melody)
    { beatOffset: 2.5, freq: 369.99, duration: 1.2, velocity: 0.42 }, // F#4
    { beatOffset: 3.0, freq: 293.66, duration: 1.2, velocity: 0.38 }, // D4
    { beatOffset: 3.5, freq: 220.00, duration: 1.2, velocity: 0.35 }, // A3
  ],
  // Bar 7: G Major (G - B - D)
  [
    { beatOffset: 0.0, freq: 98.00,  duration: 2.4, velocity: 0.65 }, // G2 (Bass)
    { beatOffset: 0.5, freq: 146.83, duration: 1.4, velocity: 0.40 }, // D3
    { beatOffset: 1.0, freq: 196.00, duration: 1.4, velocity: 0.45 }, // G3
    { beatOffset: 1.5, freq: 246.94, duration: 1.4, velocity: 0.45 }, // B3
    { beatOffset: 2.0, freq: 293.66, duration: 1.6, velocity: 0.55 }, // D4
    { beatOffset: 2.0, freq: 392.00, duration: 2.0, velocity: 0.50 }, // G4 (Top Melody)
    { beatOffset: 2.5, freq: 369.99, duration: 1.2, velocity: 0.42 }, // F#4
    { beatOffset: 3.0, freq: 293.66, duration: 1.2, velocity: 0.38 }, // D4
    { beatOffset: 3.5, freq: 246.94, duration: 1.2, velocity: 0.35 }, // B3
  ],
  // Bar 8: A Major / A7sus4 -> A (Lead back to D)
  [
    { beatOffset: 0.0, freq: 110.00, duration: 2.4, velocity: 0.65 }, // A2 (Bass)
    { beatOffset: 0.5, freq: 164.81, duration: 1.4, velocity: 0.40 }, // E3
    { beatOffset: 1.0, freq: 220.00, duration: 1.4, velocity: 0.45 }, // A3
    { beatOffset: 1.5, freq: 293.66, duration: 1.4, velocity: 0.45 }, // D4 (sus4)
    { beatOffset: 2.0, freq: 277.18, duration: 1.6, velocity: 0.55 }, // C#4 (resolution)
    { beatOffset: 2.0, freq: 554.37, duration: 2.0, velocity: 0.52 }, // C#5 (High resolution)
    { beatOffset: 2.5, freq: 440.00, duration: 1.2, velocity: 0.42 }, // A4
    { beatOffset: 3.0, freq: 329.63, duration: 1.2, velocity: 0.38 }, // E4
    { beatOffset: 3.5, freq: 277.18, duration: 1.2, velocity: 0.35 }, // C#4
  ],
]

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private bgmGain: GainNode | null = null
  private sfxGain: GainNode | null = null
  private reverbNode: ConvolverNode | null = null
  private delayNodeLeft: DelayNode | null = null
  private delayNodeRight: DelayNode | null = null

  private isPlaying = false
  private isMuted = false
  private volume = 0.7
  private trackTitle = 'Canon in D (Acoustic)'

  private timerId: number | null = null
  private currentBar = 0
  private nextBarStartTime = 0
  private readonly tempoBpm = 66 // serenade tempo
  private readonly beatsPerBar = 4
  private listeners: Set<() => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      // Setup global click listener to unlock AudioContext automatically
      const unlockAudio = () => {
        this.resumeContext()
        window.removeEventListener('pointerdown', unlockAudio)
        window.removeEventListener('keydown', unlockAudio)
      }
      window.addEventListener('pointerdown', unlockAudio, { passive: true })
      window.addEventListener('keydown', unlockAudio, { passive: true })
    }
  }

  private initAudio() {
    if (this.audioCtx) return

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext

    if (!AudioContextClass) return

    this.audioCtx = new AudioContextClass()

    // Master bus
    this.masterGain = this.audioCtx.createGain()
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime)
    this.masterGain.connect(this.audioCtx.destination)

    // SFX bus
    this.sfxGain = this.audioCtx.createGain()
    this.sfxGain.gain.setValueAtTime(0.85, this.audioCtx.currentTime)
    this.sfxGain.connect(this.masterGain)

    // BGM bus
    this.bgmGain = this.audioCtx.createGain()
    this.bgmGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime)
    this.bgmGain.connect(this.masterGain)

    // Procedural Reverb for ethereal acoustic warmth
    try {
      this.reverbNode = this.audioCtx.createConvolver()
      this.reverbNode.buffer = this.createImpulseResponse(this.audioCtx, 1.8, 2.5)

      const reverbGain = this.audioCtx.createGain()
      reverbGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime)
      this.reverbNode.connect(reverbGain)
      reverbGain.connect(this.masterGain)
    } catch {
      // Fallback gracefully if convolver fails on edge browsers
      this.reverbNode = null
    }

    // Warm Stereo Delay line
    try {
      this.delayNodeLeft = this.audioCtx.createDelay()
      this.delayNodeRight = this.audioCtx.createDelay()
      this.delayNodeLeft.delayTime.setValueAtTime(0.32, this.audioCtx.currentTime)
      this.delayNodeRight.delayTime.setValueAtTime(0.48, this.audioCtx.currentTime)

      const delayFeedback = this.audioCtx.createGain()
      delayFeedback.gain.setValueAtTime(0.24, this.audioCtx.currentTime)

      const delayFilter = this.audioCtx.createBiquadFilter()
      delayFilter.type = 'lowpass'
      delayFilter.frequency.setValueAtTime(1400, this.audioCtx.currentTime)

      const delayOutputGain = this.audioCtx.createGain()
      delayOutputGain.gain.setValueAtTime(0.25, this.audioCtx.currentTime)

      // Delay chain
      this.delayNodeLeft.connect(delayFilter)
      this.delayNodeRight.connect(delayFilter)
      delayFilter.connect(delayFeedback)
      delayFeedback.connect(this.delayNodeLeft)
      delayFilter.connect(delayOutputGain)
      delayOutputGain.connect(this.masterGain)
    } catch {
      this.delayNodeLeft = null
      this.delayNodeRight = null
    }
  }

  // Generates lush acoustic room reflection impulse procedurally
  private createImpulseResponse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate
    const length = rate * duration
    const impulse = ctx.createBuffer(2, length, rate)
    const left = impulse.getChannelData(0)
    const right = impulse.getChannelData(1)

    for (let i = 0; i < length; i++) {
      const n = i / length
      const envelope = Math.pow(1 - n, decay)
      // Filtered noise with slight stereo decorrelation
      left[i] = (Math.random() * 2 - 1) * envelope
      right[i] = (Math.random() * 2 - 1) * envelope
    }

    return impulse
  }

  private async resumeContext(): Promise<void> {
    this.initAudio()
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume()
      } catch {
        // User gesture still required
      }
    }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify() {
    this.listeners.forEach((fn) => fn())
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      trackTitle: this.trackTitle,
    }
  }

  public async startMusic(): Promise<void> {
    await this.resumeContext()
    if (!this.audioCtx || !this.bgmGain) return

    if (this.isPlaying) return

    this.isPlaying = true
    this.notify()

    // Smooth fade in
    const now = this.audioCtx.currentTime
    this.bgmGain.gain.cancelScheduledValues(now)
    this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now)
    this.bgmGain.gain.linearRampToValueAtTime(0.55, now + 1.2)

    this.currentBar = 0
    this.nextBarStartTime = now + 0.1
    this.startScheduler()
  }

  public pauseMusic(): void {
    if (!this.isPlaying) return
    this.isPlaying = false
    this.notify()

    if (this.audioCtx && this.bgmGain) {
      const now = this.audioCtx.currentTime
      this.bgmGain.gain.cancelScheduledValues(now)
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now)
      this.bgmGain.gain.linearRampToValueAtTime(0.0001, now + 0.6)
    }

    if (this.timerId !== null) {
      window.clearTimeout(this.timerId)
      this.timerId = null
    }
  }

  public toggleMusic = async (): Promise<void> => {
    if (this.isPlaying) {
      this.pauseMusic()
    } else {
      await this.startMusic()
    }
  }

  public setVolume = (newVol: number): void => {
    this.volume = Math.max(0, Math.min(1, newVol))
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime)
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime)
    }
    this.notify()
  }

  public toggleMute = (): void => {
    this.isMuted = !this.isMuted
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime)
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume,
        this.audioCtx.currentTime
      )
    }
    this.notify()
  }

  private startScheduler() {
    if (!this.isPlaying) return

    const secondsPerBeat = 60 / this.tempoBpm
    const barDuration = secondsPerBeat * this.beatsPerBar
    const scheduleAheadTime = 0.35 // seconds to schedule ahead

    const loop = () => {
      if (!this.isPlaying || !this.audioCtx) return

      const currentTime = this.audioCtx.currentTime

      while (this.nextBarStartTime < currentTime + scheduleAheadTime) {
        this.scheduleBar(this.currentBar, this.nextBarStartTime, secondsPerBeat)
        this.nextBarStartTime += barDuration
        this.currentBar = (this.currentBar + 1) % CANON_IN_D_CHORDS.length
      }

      this.timerId = window.setTimeout(loop, 100)
    }

    loop()
  }

  private scheduleBar(barIndex: number, barStartTime: number, secondsPerBeat: number) {
    const chordNotes = CANON_IN_D_CHORDS[barIndex]
    if (!chordNotes) return

    for (const note of chordNotes) {
      const noteTime = barStartTime + note.beatOffset * secondsPerBeat
      this.playAcousticNote(note.freq, noteTime, note.duration, note.velocity)
    }
  }

  // Synthesizes a warm, delicate acoustic piano/harp note with overtones & subtle body
  private playAcousticNote(freq: number, time: number, duration: number, velocity: number) {
    if (!this.audioCtx || !this.bgmGain) return

    // 1. Fundamental oscillator (Sine for pure warm acoustic tone)
    const osc1 = this.audioCtx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, time)

    // 2. Harmonic body oscillator (Triangle with dynamic lowpass for hammer/pluck touch)
    const osc2 = this.audioCtx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq, time)

    const osc2Filter = this.audioCtx.createBiquadFilter()
    osc2Filter.type = 'lowpass'
    osc2Filter.frequency.setValueAtTime(2200, time)
    osc2Filter.frequency.exponentialRampToValueAtTime(500, time + Math.min(duration, 0.8))

    const osc2Gain = this.audioCtx.createGain()
    osc2Gain.gain.setValueAtTime(0.24 * velocity, time)
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.7)

    osc2.connect(osc2Filter)
    osc2Filter.connect(osc2Gain)

    // 3. Bell shimmer / pluck harmonic (higher harmonic with fast decay)
    const oscChime = this.audioCtx.createOscillator()
    oscChime.type = 'sine'
    oscChime.frequency.setValueAtTime(freq * 2.756, time) // inharmonic bell sparkle

    const chimeGain = this.audioCtx.createGain()
    chimeGain.gain.setValueAtTime(0.06 * velocity, time)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12)
    oscChime.connect(chimeGain)

    // Master note gain envelope
    const noteGain = this.audioCtx.createGain()
    const attackTime = 0.012
    noteGain.gain.setValueAtTime(0.0001, time)
    noteGain.gain.linearRampToValueAtTime(velocity * 0.45, time + attackTime)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

    osc1.connect(noteGain)
    osc2Gain.connect(noteGain)
    chimeGain.connect(noteGain)

    // Connect to dry BGM bus
    noteGain.connect(this.bgmGain)

    // Connect to space effects (Reverb & Stereo Delay)
    if (this.reverbNode) {
      noteGain.connect(this.reverbNode)
    }
    if (this.delayNodeLeft && this.delayNodeRight) {
      noteGain.connect(this.delayNodeLeft)
      noteGain.connect(this.delayNodeRight)
    }

    // Lifecycle cleanup
    const stopTime = time + duration + 0.1
    osc1.start(time)
    osc2.start(time)
    oscChime.start(time)

    osc1.stop(stopTime)
    osc2.stop(stopTime)
    oscChime.stop(stopTime)
  }

  // SFX 1: Wax seal breaking - crisp physical fracture snap & sub-thump
  public playWaxBreakSFX = (): void => {
    this.resumeContext()
    if (!this.audioCtx || !this.sfxGain) return

    const now = this.audioCtx.currentTime

    // 1. Initial sharp snap transient (filtered noise burst)
    const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.04) // 40ms
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const noiseSource = this.audioCtx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const snapFilter = this.audioCtx.createBiquadFilter()
    snapFilter.type = 'bandpass'
    snapFilter.frequency.setValueAtTime(2800, now)
    snapFilter.Q.setValueAtTime(3.5, now)

    const snapGain = this.audioCtx.createGain()
    snapGain.gain.setValueAtTime(0.65, now)
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038)

    noiseSource.connect(snapFilter)
    snapFilter.connect(snapGain)
    snapGain.connect(this.sfxGain)

    noiseSource.start(now)
    noiseSource.stop(now + 0.04)

    // 2. Secondary micro-crack (14ms later, simulates wax split crackle)
    const microBufferSize = Math.floor(this.audioCtx.sampleRate * 0.025)
    const microBuffer = this.audioCtx.createBuffer(1, microBufferSize, this.audioCtx.sampleRate)
    const microData = microBuffer.getChannelData(0)
    for (let i = 0; i < microBufferSize; i++) {
      microData[i] = Math.random() * 2 - 1
    }

    const microSource = this.audioCtx.createBufferSource()
    microSource.buffer = microBuffer

    const microFilter = this.audioCtx.createBiquadFilter()
    microFilter.type = 'highpass'
    microFilter.frequency.setValueAtTime(3600, now + 0.014)

    const microGain = this.audioCtx.createGain()
    microGain.gain.setValueAtTime(0.0001, now)
    microGain.gain.setValueAtTime(0.40, now + 0.014)
    microGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

    microSource.connect(microFilter)
    microFilter.connect(microGain)
    microGain.connect(this.sfxGain)

    microSource.start(now + 0.014)
    microSource.stop(now + 0.04)

    // 3. Tactile low-frequency body thud (structural release from paper)
    const thumpOsc = this.audioCtx.createOscillator()
    thumpOsc.type = 'sine'
    thumpOsc.frequency.setValueAtTime(160, now)
    thumpOsc.frequency.exponentialRampToValueAtTime(38, now + 0.065)

    const thumpGain = this.audioCtx.createGain()
    thumpGain.gain.setValueAtTime(0.45, now)
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07)

    thumpOsc.connect(thumpGain)
    thumpGain.connect(this.sfxGain)

    thumpOsc.start(now)
    thumpOsc.stop(now + 0.075)
  }

  // SFX 2: Soft paper unfolding rustle sound (pink noise with organic envelope)
  public playPaperRustleSFX = (): void => {
    this.resumeContext()
    if (!this.audioCtx || !this.sfxGain) return

    const now = this.audioCtx.currentTime
    const duration = 0.52
    const sampleRate = this.audioCtx.sampleRate
    const bufferLength = Math.floor(sampleRate * duration)

    // Generate Pink Noise using Paul Kellet's filter method
    const buffer = this.audioCtx.createBuffer(1, bufferLength, sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

    for (let i = 0; i < bufferLength; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      b6 = white * 0.115926
      data[i] = pink * 0.12
    }

    const source = this.audioCtx.createBufferSource()
    source.buffer = buffer

    // Bandpass filter to simulate fine paper texture friction
    const filter = this.audioCtx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1100, now)
    filter.frequency.exponentialRampToValueAtTime(1850, now + 0.22)
    filter.frequency.exponentialRampToValueAtTime(1300, now + duration)
    filter.Q.setValueAtTime(1.2, now)

    // Dual-wave organic envelope simulating paper unfold waves
    const gain = this.audioCtx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.24, now + 0.04)  // initial fold lift
    gain.gain.linearRampToValueAtTime(0.12, now + 0.13)  // subtle dip
    gain.gain.linearRampToValueAtTime(0.28, now + 0.24)  // full paper expansion
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration) // gentle fade

    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.sfxGain)

    source.start(now)
    source.stop(now + duration + 0.05)
  }

  // SFX 3: Delicate celestial chime/harp tone (harmonic chord cascade with long decay)
  public playChimeSFX = (): void => {
    this.resumeContext()
    if (!this.audioCtx || !this.sfxGain) return

    const now = this.audioCtx.currentTime
    // Celestial D Major Chime Chord: D5, F#5, A5, D6, F#6, A6
    const chimeFreqs = [587.33, 739.99, 880.00, 1174.66, 1479.98, 1760.00]
    const staggerTime = 0.052

    chimeFreqs.forEach((freq, idx) => {
      if (!this.audioCtx || !this.sfxGain) return
      const noteTime = now + idx * staggerTime
      const decayDuration = 2.4 - idx * 0.15

      // 1. Pure celestial sine fundamental
      const osc = this.audioCtx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, noteTime)

      // 2. High chime sparkle overtone
      const sparkleOsc = this.audioCtx.createOscillator()
      sparkleOsc.type = 'sine'
      sparkleOsc.frequency.setValueAtTime(freq * 2.756, noteTime)

      const sparkleGain = this.audioCtx.createGain()
      sparkleGain.gain.setValueAtTime(0.06, noteTime)
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.65)
      sparkleOsc.connect(sparkleGain)

      // Note envelope
      const gain = this.audioCtx.createGain()
      gain.gain.setValueAtTime(0.0001, noteTime)
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + decayDuration)

      osc.connect(gain)
      sparkleGain.connect(gain)
      gain.connect(this.sfxGain)

      // Send to procedural reverb for ethereal cathedral bloom
      if (this.reverbNode) {
        gain.connect(this.reverbNode)
      }

      osc.start(noteTime)
      sparkleOsc.start(noteTime)
      osc.stop(noteTime + decayDuration + 0.1)
      sparkleOsc.stop(noteTime + decayDuration + 0.1)
    })
  }
}

// Global singleton instance for shared audio state across all components
export const weddingAudioManager = new WeddingAudioManager()

/**
 * Custom React Hook for Wedding Audio Control
 */
export function useWeddingAudio(): WeddingAudioState {
  const state = useSyncExternalStore(
    weddingAudioManager.subscribe,
    weddingAudioManager.getState,
    weddingAudioManager.getState
  )

  const startMusic = useCallback(() => weddingAudioManager.startMusic(), [])
  const pauseMusic = useCallback(() => weddingAudioManager.pauseMusic(), [])
  const toggleMusic = useCallback(() => weddingAudioManager.toggleMusic(), [])
  const setVolume = useCallback((v: number) => weddingAudioManager.setVolume(v), [])
  const toggleMute = useCallback(() => weddingAudioManager.toggleMute(), [])
  const playWaxBreakSFX = useCallback(() => weddingAudioManager.playWaxBreakSFX(), [])
  const playPaperRustleSFX = useCallback(() => weddingAudioManager.playPaperRustleSFX(), [])
  const playChimeSFX = useCallback(() => weddingAudioManager.playChimeSFX(), [])

  // Auto-pause when page is hidden to save battery & respect user context
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && weddingAudioManager.getState().isPlaying) {
        weddingAudioManager.pauseMusic()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return {
    isPlaying: state.isPlaying,
    isMuted: state.isMuted,
    volume: state.volume,
    trackTitle: state.trackTitle,
    startMusic,
    pauseMusic,
    toggleMusic,
    setVolume,
    toggleMute,
    playWaxBreakSFX,
    playPaperRustleSFX,
    playChimeSFX,
  }
}
