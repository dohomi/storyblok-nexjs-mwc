let {useState, useEffect} = require('react')

function useWindowScrollPosition () {
  if (typeof window === 'undefined') {
    return 0
  }

  let getPosition = () => window.pageYOffset
  //   ({
  //   x: window.pageXOffset,
  //   y: window.pageYOffset
  // })

  let [position, setPosition] = useState(getPosition())

  useEffect(() => {
    let isPainting = false
    let handleScroll = () => {
      if (isPainting) {
        return
      }
      isPainting = true
      window.requestAnimationFrame(() => {
        setPosition(getPosition())
        isPainting = false
      })
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      window.hasPassiveListenerSupport ? {passive: true} : false
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}

module.exports = useWindowScrollPosition
