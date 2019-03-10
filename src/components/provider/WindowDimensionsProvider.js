import React, {createContext, useContext, useState, useEffect} from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'

export const WindowDimensionsCtx = createContext(null)

const windowDims = () => {
  /*
  breakpoints from Material spec.
  desktop: 840px,
  tablet: 480px,
   */
  if (typeof window === 'undefined') {
    const detect = DeviceDetectService.getDevice()
    let isTablet = detect.device === 'tablet'
    let isMobile = detect.device === 'mobile'
    return {
      isTablet,
      isMobile,
      isDesktop: !isTablet && !isMobile
    }
  }
  let height = window.innerHeight
  let width = window.innerWidth
  let phone = width <= 480
  let desktop = width > 840
  return {
    height: height,
    width: width,
    isTablet: !phone && !desktop,
    isPhone: phone,
    isDesktop: desktop
  }
}

const WindowDimensionsProvider = ({children}) => {
  const [dimensions, setDimensions] = useState(windowDims())
  useEffect(() => {
    let isActive = false
    const handleResize = () => {
      if (isActive) {
        return
      }
      isActive = true
      window.requestAnimationFrame(() => {
        setDimensions(windowDims())
        isActive = false
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  )
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => {
  return useContext(WindowDimensionsCtx)
}
