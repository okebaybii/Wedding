/**
 * Device Tilt & Orientation Hook for D--Webdding
 *
 * Features:
 * - Tracks mobile gyroscope (DeviceOrientationEvent) with iOS 13+ permission support
 * - Tracks desktop mouse position as fallback
 * - Returns normalized { tiltX, tiltY } in [-1, 1]
 * - Smooth lerp interpolation for silky 60fps 3D parallax effects on card, envelope, and camera
 * - Battery-friendly: pauses RAF loop when motion settles
 * - Respects prefers-reduced-motion media query
 */

import { useState, useEffect, useRef, useCallback } from 'react'

export interface DeviceTiltOptions {
  lerpFactor?: number // Default: 0.08 for smooth luxury easing
  maxTiltAngle?: number // Gyroscope degree threshold for +/-1, default: 30
  neutralBeta?: number // Neutral holding angle for phone in hand (degrees), default: 45
  disabled?: boolean
}

export interface DeviceTiltState {
  tiltX: number // Lerped normalized [-1, 1]
  tiltY: number // Lerped normalized [-1, 1]
  rawTiltX: number // Immediate unlerped [-1, 1]
  rawTiltY: number // Immediate unlerped [-1, 1]
  isMobile: boolean
  hasGyroscope: boolean
  permissionState: 'unknown' | 'granted' | 'denied' | 'prompt'
  requestPermission: () => Promise<boolean>
  resetTilt: () => void
}

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function useDeviceTilt(options: DeviceTiltOptions = {}): DeviceTiltState {
  const {
    lerpFactor = 0.08,
    maxTiltAngle = 30,
    neutralBeta = 45,
    disabled = false,
  } = options

  const [tilt, setTilt] = useState<{ tiltX: number; tiltY: number }>({ tiltX: 0, tiltY: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [hasGyroscope, setHasGyroscope] = useState(false)
  const [permissionState, setPermissionState] = useState<'unknown' | 'granted' | 'denied' | 'prompt'>('unknown')

  // Refs for animation loop
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rawX = useRef(0)
  const rawY = useRef(0)
  const rafId = useRef<number | null>(null)
  const isLoopRunning = useRef(false)
  const orientationHandlerAttached = useRef(false)

  // Check device type and permission requirement on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mobileCheck =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

    setIsMobile(mobileCheck)

    const orientationEvent = window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission | undefined

    if (orientationEvent && typeof orientationEvent.requestPermission === 'function') {
      // iOS 13+ requires explicit user gesture permission
      setPermissionState('prompt')
    } else if (orientationEvent) {
      // Standard Android / non-iOS mobile
      setPermissionState('granted')
    }
  }, [])

  // Start or ensure the RAF interpolation loop is running
  const startLoop = useCallback(() => {
    if (isLoopRunning.current) return
    isLoopRunning.current = true

    const loop = () => {
      // Linear interpolation
      const diffX = targetX.current - currentX.current
      const diffY = targetY.current - currentY.current

      // Epsilon check to settle animation and save CPU/battery
      if (Math.abs(diffX) < 0.0005 && Math.abs(diffY) < 0.0005) {
        currentX.current = targetX.current
        currentY.current = targetY.current
        setTilt({
          tiltX: currentX.current,
          tiltY: currentY.current,
        })
        isLoopRunning.current = false
        rafId.current = null
        return
      }

      currentX.current += diffX * lerpFactor
      currentY.current += diffY * lerpFactor

      setTilt({
        tiltX: currentX.current,
        tiltY: currentY.current,
      })

      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)
  }, [lerpFactor])

  // Explicit permission request for iOS 13+
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false

    const orientationEvent = window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission | undefined

    if (orientationEvent && typeof orientationEvent.requestPermission === 'function') {
      try {
        const response = await orientationEvent.requestPermission()
        if (response === 'granted') {
          setPermissionState('granted')
          return true
        } else {
          setPermissionState('denied')
          return false
        }
      } catch {
        setPermissionState('denied')
        return false
      }
    } else {
      setPermissionState('granted')
      return true
    }
  }, [])

  // Reset tilt to zero
  const resetTilt = useCallback(() => {
    targetX.current = 0
    targetY.current = 0
    rawX.current = 0
    rawY.current = 0
    startLoop()
  }, [startLoop])

  // Gyroscope orientation listener
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (permissionState !== 'granted') return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null && e.beta === null) return

      if (!hasGyroscope) {
        setHasGyroscope(true)
      }

      // gamma: left-to-right roll in [-90, 90]
      const gamma = e.gamma ?? 0
      // beta: front-to-back pitch in [-180, 180]
      const beta = e.beta ?? 0

      // Normalize gamma to [-1, 1] with maxTiltAngle threshold
      const normX = clamp(gamma / maxTiltAngle, -1, 1)

      // Normalize beta relative to comfortable hand-held neutral angle (~45 deg)
      const normY = clamp((beta - neutralBeta) / maxTiltAngle, -1, 1)

      rawX.current = normX
      rawY.current = normY
      targetX.current = normX
      targetY.current = normY

      startLoop()
    }

    window.addEventListener('deviceorientation', handleOrientation, true)
    orientationHandlerAttached.current = true

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
      orientationHandlerAttached.current = false
    }
  }, [disabled, permissionState, maxTiltAngle, neutralBeta, hasGyroscope, startLoop])

  // Desktop Mouse Move listener (active on desktop or when no gyro events detected)
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      // If mobile gyroscope is currently active and reporting, let gyro take precedence
      if (hasGyroscope && isMobile) return

      const width = window.innerWidth
      const height = window.innerHeight

      if (width === 0 || height === 0) return

      // Map [0, width] -> [-1, 1]
      const normX = clamp((e.clientX / width) * 2 - 1, -1, 1)
      // Map [0, height] -> [-1, 1]
      const normY = clamp((e.clientY / height) * 2 - 1, -1, 1)

      rawX.current = normX
      rawY.current = normY
      targetX.current = normX
      targetY.current = normY

      startLoop()
    }

    const handleMouseLeave = () => {
      targetX.current = 0
      targetY.current = 0
      rawX.current = 0
      rawY.current = 0
      startLoop()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
        isLoopRunning.current = false
      }
    }
  }, [disabled, hasGyroscope, isMobile, startLoop])

  return {
    tiltX: tilt.tiltX,
    tiltY: tilt.tiltY,
    rawTiltX: rawX.current,
    rawTiltY: rawY.current,
    isMobile,
    hasGyroscope,
    permissionState,
    requestPermission,
    resetTilt,
  }
}

export default useDeviceTilt
