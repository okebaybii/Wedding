import React, { useEffect, useRef, useState } from 'react'
import type { CoupleInfo, GalleryPhoto, WeddingEvent } from '../../types/wedding.ts'
import type { WeddingJourneySnapshot } from '../../hooks/useWeddingJourney.ts'
import { useDeviceTilt } from '../../hooks/useDeviceTilt.ts'
import {
  createWeddingJourneyRuntime,
  type WeddingJourneyRuntime,
} from './weddingJourneyRuntime.ts'

interface WeddingJourneySceneProps {
  couple: CoupleInfo
  events: WeddingEvent[]
  gallery: GalleryPhoto[]
  heroImage?: string
  journeyRef: React.RefObject<WeddingJourneySnapshot | null>
  paused?: boolean
}

export const WeddingJourneyScene: React.FC<WeddingJourneySceneProps> = ({
  couple,
  events,
  gallery,
  heroImage,
  journeyRef,
  paused = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const runtimeRef = useRef<WeddingJourneyRuntime | null>(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const { tiltX, tiltY } = useDeviceTilt({ disabled: paused || reducedMotion })
  tiltRef.current = { x: tiltX, y: tiltY }

  useEffect(() => {
    document.documentElement.classList.toggle('journey-scene-ready', isReady && !hasFailed)
    document.documentElement.classList.toggle('journey-webgl-failed', hasFailed)

    return () => {
      document.documentElement.classList.remove('journey-scene-ready', 'journey-webgl-failed')
    }
  }, [hasFailed, isReady])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || hasFailed) return

    const runtime = createWeddingJourneyRuntime({
      canvas,
      container,
      content: { couple, events, gallery, heroImage },
      getSnapshot: () => journeyRef.current ?? {
        chapter: 'hero',
        chapterIndex: 0,
        localProgress: 0,
        overallProgress: 0,
      },
      getTilt: () => tiltRef.current,
      reducedMotion,
      paused,
      onReady: () => setIsReady(true),
      onFailure: () => setHasFailed(true),
    })

    runtimeRef.current = runtime
    runtime.start()

    return () => {
      runtime.dispose()
      runtimeRef.current = null
    }
    // Recreate only when the reduced-motion rendering strategy changes.
    // Content updates are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, hasFailed])

  useEffect(() => {
    runtimeRef.current?.setPaused(paused)
  }, [paused])

  useEffect(() => {
    runtimeRef.current?.updateContent({ couple, events, gallery, heroImage })
  }, [couple, events, gallery, heroImage])

  if (hasFailed) return null

  return (
    <div
      ref={containerRef}
      className={`wedding-journey-scene ${isReady ? 'is-ready' : ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="wedding-journey-atmosphere" />
      <div className="wedding-journey-vignette" />
    </div>
  )
}

export default WeddingJourneyScene
