import React, { createContext, useContext, useEffect, useState } from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'
import { useDebouncedCallback } from 'use-debounce'

export type WithWindowDimensionsProps = {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
}

let defaultValue: WithWindowDimensionsProps = {
  height: 500,
  width: 599, // mobile
  isMobile: false,
  isTablet: false
}

export const WindowDimensionsCtx = createContext(defaultValue)

const WindowDimensionsProvider = ({ children }: { children: any }) => {
  const currentDevice = DeviceDetectService.getDevice()
  let defaultValue: WithWindowDimensionsProps = {
    height: 500,
    width: currentDevice.width,
    isMobile: currentDevice.device === 'mobile',
    isTablet: currentDevice.device === 'tablet'
  }
  if (typeof window !== 'undefined') {
    defaultValue = getWindowDimensions()
  }

  const [dimensions, setDimensions] = useState(defaultValue)
  const [debouncedCallback] = useDebouncedCallback(
    // function
    () => {
      setDimensions(getWindowDimensions())
    },
    // delay in ms
    500
  )
  useEffect(
    () => {
      if (typeof window === 'undefined') {
        return
      }
      window.addEventListener('resize', debouncedCallback)
      return () => {
        window.removeEventListener('resize', debouncedCallback)
      }
    },
    []
  )

  function getWindowDimensions() {
    const opts = {
      ...defaultValue,
      height: window.innerHeight,
      width: window.innerWidth
    }
    return opts
  }

  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  )
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => useContext(WindowDimensionsCtx)
