import React, {createContext, useContext, useState, useEffect} from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'
import ResizeObserver from 'resize-observer-polyfill'

export const WindowDimensionsCtx = createContext(null)

const windowDims = () => {
  const opts = {
    height: window.innerHeight,
    width: window.innerWidth,
    isMobile: DeviceDetectService.getDevice() && DeviceDetectService.getDevice().device === 'mobile'
  }
  return opts
}

const debounce = function (ms, fn) {
  let timer
  return function () {
    clearTimeout(timer)
    const args = Array.prototype.slice.call(arguments)
    args.unshift(this)
    timer = setTimeout(fn.bind.apply(fn, args), ms)
  }
}

const WindowDimensionsProvider = ({children}) => {
  if (typeof window === 'undefined') {
    return (
      <WindowDimensionsCtx.Provider value={{width: 0, height: 0}}>
        {children}
      </WindowDimensionsCtx.Provider>
    )
  }
  const [dimensions, setDimensions] = useState(windowDims())

  useEffect(
    () => {
      const body = document.querySelector('body')
      const checkWindowsDimensions = (entries) => {
        if (!Array.isArray(entries)) {
          return
        }
        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) {
          return
        }
        setDimensions(windowDims())
      }
      const resizeObserver = new ResizeObserver(debounce(500, checkWindowsDimensions))

      resizeObserver.observe(body)

      return () => {
        resizeObserver.unobserve(body)
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
