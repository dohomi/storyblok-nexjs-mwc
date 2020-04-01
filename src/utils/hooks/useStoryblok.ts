import { AppPageProps } from '../../typings/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StoryblokService from '../StoryblokService'

export const useStoryblok = (props: AppPageProps) => {
  const { asPath, query } = useRouter() // query only set in SSR mode
  // const { query } = props
  if (query) {
    StoryblokService.setQuery(query)
  }
  const insideStoryblok = !!query?._storyblok

  let [content, setContent] = useState<AppPageProps>(props)
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
  return !insideStoryblok ? props : content
}
