import React, {createContext, useContext, useState, useEffect} from 'react'

export const WindowDimensionsCtx = createContext(null)

const windowDims = () => {
  /*
  breakpoints from Material spec.
  desktop: 840px,
  tablet: 480px,
   */

  if (typeof window === 'undefined') {
    // todo do something on server side..
    return {
      height: 800,
      width: 600
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
    const handleResize = () => {
      setDimensions(windowDims())
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
