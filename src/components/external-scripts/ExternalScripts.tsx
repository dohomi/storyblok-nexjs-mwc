import { FunctionComponent, useEffect, useState } from 'react'
import { CONFIG } from '../../utils/config'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import StoryblokService from '../../utils/StoryblokService'

const ExternalScripts: FunctionComponent = () => {
  const insideStoryblok = StoryblokService.insideVisualComposer()
  const tawkToId = CONFIG.TAWKTO

  const scrolled = useScrollTrigger({ disableHysteresis: true })
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(
    () => {
      if (scrolled) {
        setIsScrolled(true)
      }
    },
    [scrolled]
  )
  useEffect(
    () => {
      if (!insideStoryblok && tawkToId && isScrolled && !document.getElementById('tawkToScript')) {
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
    [isScrolled, tawkToId, insideStoryblok]
  )
  return null
}

export default ExternalScripts
