import React, { useEffect, useRef, useState } from 'react'

export interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number // in ms, e.g. 100, 200, 300
  duration?: number // in ms, defaults to 700
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number // in px, defaults to 32
  threshold?: number // 0 to 1, defaults to 0.15
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  direction = 'up',
  distance = 36,
  threshold = 0.15,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = domRef.current
    if (!el) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(${distance}px, 0, 0)`
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={domRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
