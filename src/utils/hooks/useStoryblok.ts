import { AppPageProps } from '../../typings/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StoryblokService from '../StoryblokService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'

export const useStoryblok = (props: AppPageProps) => {
  const { query } = useRouter() // query only set in SSR mode

  const { page, settings } = props
  if (query) {
    StoryblokService.setQuery(query)
  }
  // const insideStoryblok = !!query?._storyblok
  const settingsUid = props.settings?.uuid
  const pageUid = props.page?.uuid

  const [statePage, setPage] = useState<PageStoryblok>(page)
  const [stateSettings, setSettings] = useState<GlobalStoryblok>(settings)

  useEffect(
    () => {
      if (pageUid !== statePage?.uuid) {
        // console.log('different page', pageUid, statePage.uuid)
        setPage(page)
      }
    },
    [pageUid, statePage, page]
  )

  useEffect(
    () => {
      if (settingsUid !== stateSettings?.uuid) {
        // console.log('different settings', settingsUid, stateSettings.uuid)
        setSettings(settings)
      }
    },
    [settingsUid, stateSettings, settings]
  )


  useEffect(
    () => {
      StoryblokService.initEditor({ page, setPage, settings, setSettings })
    },
    []
  )
  // return !insideStoryblok ? props : content
  // return content
  // console.log(props.page._uid)
  return {
    page: statePage,
    settings: stateSettings,
    error: props.error
  }
}
