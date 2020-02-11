import { GlobalStoryblok } from '../../typings/generated/components-schema'
import { useEffect } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'
import { setScrollTop, setScrollTriggered } from '../state/actions'

export default function useAppScroll({ settings, hasFeature }: { settings: GlobalStoryblok, hasFeature?: boolean }) {
  const scrolledWithoutHysteresis = useScrollTrigger({ disableHysteresis: true })
  const scrolledWithHysteresis = useScrollTrigger({ disableHysteresis: false })
  const isScrollCollapse = settings.toolbar_config && settings.toolbar_config.includes('scroll_collapse')
  const needsWatching = !!(settings.toolbar_main_height || hasFeature)
  useEffect(
    () => {
      if (isScrollCollapse) {
        setScrollTriggered(scrolledWithHysteresis)
      }
    },
    [scrolledWithHysteresis, isScrollCollapse]
  )

  useEffect(
    () => {
      if (needsWatching) {
        setScrollTop(!scrolledWithoutHysteresis)
      }
    },
    [scrolledWithoutHysteresis, needsWatching]
  )
}
