import { GlobalStoryblok } from '../typings/generated/components-schema'
import { useEffect } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'
import { setScrollTop, setScrollTriggered } from './state/actions'

export default function useAppScroll({ settings }: { settings: GlobalStoryblok }) {
  console.log(settings)
  const scrolledWithoutHysteresis = useScrollTrigger({ disableHysteresis: true })
  const scrolledWithHysteresis = useScrollTrigger({ disableHysteresis: false })
  const isScrollCollapse = settings.toolbar_config && settings.toolbar_config.includes('scroll_collapse')
  const hasToolbarHeight = !!settings.toolbar_main_height
  useEffect(
    () => {
      if (isScrollCollapse) {
        console.log('set SCROLL triggered', scrolledWithHysteresis)
        setScrollTriggered(scrolledWithHysteresis)
      }
    },
    [scrolledWithHysteresis, isScrollCollapse]
  )

  useEffect(
    () => {
      if (hasToolbarHeight) {
        console.log('set TOP triggered', scrolledWithoutHysteresis)
        setScrollTop(!scrolledWithoutHysteresis)
      }
    },
    [scrolledWithoutHysteresis, hasToolbarHeight]
  )
}
