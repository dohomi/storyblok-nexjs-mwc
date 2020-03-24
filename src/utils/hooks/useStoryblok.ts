import { AppPageProps } from '../parsePageProperties'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StoryblokService from '../StoryblokService'

export const useStoryblok = (props: AppPageProps) => {
  const { asPath, query } = useRouter()
  const insideStoryblok = !!query._storyblok

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
