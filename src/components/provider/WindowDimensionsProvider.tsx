import React, { createContext, useContext, useEffect, useState } from 'react'
import DeviceDetectService from '../../utils/DeviceDetectService'
import ResizeObserver from 'resize-observer-polyfill'

export type WithWindowDimensionsProps = {
  width: number
  height: number
  isMobile: boolean
}

const defaultValue: WithWindowDimensionsProps = {
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

const debounce = function(ms: number, fn: Function) {
  let timer: any
  return function() {
    clearTimeout(timer)
    const args = Array.prototype.slice.call(arguments) as any
    // @ts-ignore
    args.unshift(this)
    timer = setTimeout(fn.bind.apply(fn, args), ms)
  }
}

const WindowDimensionsProvider = ({ children }: { children: Element[] }) => {
  if (typeof window === 'undefined') {
    return (
      <WindowDimensionsCtx.Provider value={defaultValue}>
        {children}
      </WindowDimensionsCtx.Provider>
    )
  }
  const [dimensions, setDimensions] = useState(getWindowDimensions())

  useEffect(
    () => {
      const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement
      const checkWindowsDimensions = (entries: Element[]) => {
        if (!Array.isArray(entries)) {
          return
        }
        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) {
          return
        }
        setDimensions(getWindowDimensions())
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
