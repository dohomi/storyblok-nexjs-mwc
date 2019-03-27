import React, {createContext, useContext, useState, useEffect} from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'
import ResizeObserver from 'resize-observer-polyfill'

export const WindowDimensionsCtx = createContext(null)

const windowDims = () => {
  /*
  breakpoints from Material spec.
  desktop: 840px,
  tablet: 480px,
   */
  if (typeof window === 'undefined') {
    return {}
    // const detect = DeviceDetectService.getDevice()
    // let isTablet = detect.device === 'tablet'
    // let isMobile = detect.device === 'mobile'
    // return {
    //   isTablet,
    //   isMobile,
    //   isDesktop: !isTablet && !isMobile
    // }
  }
  let height = window.innerHeight
  let width = window.innerWidth
  // let phone = width <= 480
  // let desktop = width > 840
  return {
    height: height,
    width: width,
    // isTablet: !phone && !desktop,
    // isPhone: phone,
    // isDesktop: desktop
  }
}

const WindowDimensionsProvider = ({children}) => {
  const [dimensions, setDimensions] = useState(windowDims())
  useEffect(() => {
    const body = document.querySelector('body')
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return
      }

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length) {
        return
      }
      setDimensions(windowDims())
    })

    resizeObserver.observe(body)

    return () => {
      resizeObserver.unobserve(body)
    }
  }, [])
  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  )
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => useContext(WindowDimensionsCtx)
