import { useEffect } from 'react'
import StoryblokService from '../StoryblokService'
import { useGlobalState } from '../state/state'
import { CONFIG } from '../StoriesService'

export default function useExternalScripts() {
  const insideStoryblok = StoryblokService.insideVisualComposer()
  const tawkToId = CONFIG.TAWKTO
  if (typeof window === 'undefined' || !tawkToId || insideStoryblok || process.env.NODE_ENV !== 'production') {
    return
  }
  const [isTop] = useGlobalState('isScrollTop')
  useEffect(
    () => {
      if (!isTop && !document.getElementById('tawkToScript')) {
        const s1 = document.createElement('script')
        s1.id = 'tawkToScript'
        s1.async = true
        s1.src = 'https://embed.tawk.to/' + tawkToId + '/default'
        s1.setAttribute('crossorigin', '*')
        const s0 = document.getElementsByTagName('script')[0]
        if (!s0 || !s0.parentNode) {
          throw new Error('DOM is missing')
        }
        s0.parentNode.insertBefore(s1, s0)
        document.body.appendChild(s0)
        document.body.appendChild(s1)
      }
    },
    [isTop, tawkToId, insideStoryblok]
  )
  return null
}
