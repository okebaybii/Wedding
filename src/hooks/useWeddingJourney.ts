import { useEffect, useRef } from 'react'

export const weddingJourneyChapters = [
  'hero',
  'invitation',
  'couple',
  'events',
  'gallery',
  'rsvp',
  'guestbook',
  'finale',
] as const

export type WeddingJourneyChapter = (typeof weddingJourneyChapters)[number]

export interface WeddingJourneySnapshot {
  chapter: WeddingJourneyChapter
  chapterIndex: number
  localProgress: number
  overallProgress: number
}

const initialSnapshot: WeddingJourneySnapshot = {
  chapter: 'hero',
  chapterIndex: 0,
  localProgress: 0,
  overallProgress: 0,
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Tracks the viewport through the wedding chapters without causing React renders.
 * The Three.js scene reads this ref from its own animation loop.
 */
export function useWeddingJourney(enabled = true) {
  const snapshotRef = useRef<WeddingJourneySnapshot | null>({ ...initialSnapshot })

  useEffect(() => {
    if (!enabled) {
      snapshotRef.current = { ...initialSnapshot }
      return
    }

    let rafId = 0

    const measure = () => {
      rafId = 0
      const entries: Array<{
        chapter: WeddingJourneyChapter
        chapterIndex: number
        section: HTMLElement
      }> = []

      weddingJourneyChapters.forEach((chapter, chapterIndex) => {
        const section = document.querySelector<HTMLElement>(`[data-journey-chapter="${chapter}"]`)
        if (section) entries.push({ chapter, chapterIndex, section })
      })

      if (entries.length === 0) return

      // Calculate waypoint scroll targets for each chapter so that when a section
      // is centered in the viewport, the 3D camera aligns exactly with that chapter.
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight)

      const targets: number[] = entries.map((entry, index) => {
        if (index === 0) return 0
        if (index === entries.length - 1) return maxScroll

        const rect = entry.section.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const sectionCenter = sectionTop + entry.section.offsetHeight * 0.5
        const idealScroll = sectionCenter - viewportHeight * 0.5
        return Math.max(0, Math.min(maxScroll, idealScroll))
      })

      // Ensure strictly monotonic progression between waypoints
      for (let i = 1; i < targets.length; i += 1) {
        if (targets[i] <= targets[i - 1]) {
          targets[i] = Math.min(maxScroll, targets[i - 1] + 1)
        }
      }

      let activeIndex = 0
      let localProgress = 0

      if (scrollY <= targets[0]) {
        activeIndex = 0
        localProgress = 0
      } else if (scrollY >= targets[targets.length - 1]) {
        activeIndex = entries.length - 1
        localProgress = 0
      } else {
        for (let i = 0; i < targets.length - 1; i += 1) {
          if (scrollY >= targets[i] && scrollY < targets[i + 1]) {
            activeIndex = i
            const span = Math.max(1, targets[i + 1] - targets[i])
            localProgress = clamp01((scrollY - targets[i]) / span)
            break
          }
        }
      }

      const activeEntry = entries[activeIndex]
      const denominator = Math.max(1, weddingJourneyChapters.length - 1)
      const overallProgress = clamp01((activeEntry.chapterIndex + localProgress) / denominator)

      snapshotRef.current = {
        chapter: activeEntry.chapter,
        chapterIndex: activeEntry.chapterIndex,
        localProgress,
        overallProgress,
      }
    }

    const scheduleMeasure = () => {
      if (rafId === 0) rafId = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      if (rafId !== 0) window.cancelAnimationFrame(rafId)
    }
  }, [enabled])

  return snapshotRef
}

export default useWeddingJourney
