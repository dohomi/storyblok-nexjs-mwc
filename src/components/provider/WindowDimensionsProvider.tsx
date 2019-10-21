import React, { createContext, useContext, useEffect, useState } from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'
import { useDebouncedCallback } from 'use-debounce'

export type WithWindowDimensionsProps = {
  width: number
  height: number
  isMobile: boolean
}

let defaultValue: WithWindowDimensionsProps = {
  height: 0,
  width: 0,
  isMobile: false
}
export const WindowDimensionsCtx = createContext(defaultValue)

const getWindowDimensions = () => {
  const opts = {
    height: window.innerHeight,
    width: window.innerWidth,
    isMobile: DeviceDetectService.getDevice() && DeviceDetectService.getDevice().device === 'mobile'
  }
  return opts
}

// todo: make this SSR ready with providing req from getInitialProps
const WindowDimensionsProvider = ({ children }: { children: any }) => {
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

  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  )
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => useContext(WindowDimensionsCtx)
