import { AppPageProps } from '../parsePageProperties'
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
  console.log('use storyblok', query)
  if (typeof document !== 'undefined') {
    console.log(document.location)
  }

  let [content, setContent] = useState<AppPageProps>(props)
  useEffect(
    () => {
      insideStoryblok && setContent(props)
    },
    [asPath, insideStoryblok]
  )

  useEffect(
    () => {
      insideStoryblok && StoryblokService.initEditor(content, setContent)
    },
    [insideStoryblok]
  )
  return !insideStoryblok ? props : content
}
