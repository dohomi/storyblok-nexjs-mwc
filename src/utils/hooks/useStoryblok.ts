import { AppPageProps } from '../parsePageProperties'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StoryblokService from '../StoryblokService'

export const useStoryblok = (props: AppPageProps) => {
  const { asPath, query } = useRouter()
  if (!query._storyblok) {
    return props
  }
  let [content, setContent] = useState<AppPageProps>(props)

  useEffect(
    () => {
      setContent(props)
    },
    [asPath]
  )

  useEffect(
    () => {
      StoryblokService.initEditor(content, setContent)
    },
    []
  )
  return content
}
