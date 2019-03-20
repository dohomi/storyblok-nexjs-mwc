let {useState, useEffect} = require('react')

let supportsPassive = false

const checkPassiveEventListener = () => {
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      }
    })
    window.addEventListener('testPassive', null, opts)
    window.removeEventListener('testPassive', null, opts)
  } catch (e) {
  }
}


function useWindowScrollPosition () {
  if (typeof window === 'undefined') {
    return 0
  }

  checkPassiveEventListener()

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
      supportsPassive ? {passive: true} : false
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}

module.exports = useWindowScrollPosition
