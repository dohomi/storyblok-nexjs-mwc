import { AppPageProps } from '../../typings/app'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import StoryblokService from '../StoryblokService'
import { getBaseProps } from '@initialData/getBaseProps'

export const useStoryblok = (props: AppPageProps) => {
  const { asPath, query } = useRouter() // query only set in SSR mode
  // const { query } = props
  if (query) {
    StoryblokService.setQuery(query)
  }
  const insideStoryblok = !!query?._storyblok

  let [content, setContent] = useState<AppPageProps>(insideStoryblok ? props : getBaseProps(''))
  useEffect(
    () => {
      insideStoryblok && setContent(props)
    },
    [asPath, insideStoryblok]
  )

  useEffect(
    () => {
      StoryblokService.initEditor(content, setContent)
    },
    []
  )
  // return !insideStoryblok ? props : content
  // return content
  // console.log(props.page._uid)
  return insideStoryblok ? content : {
    settings: useMemo(() => props.settings, [props.settings?._uid]),
    page: props.page,
    error: props.error
  }
}
