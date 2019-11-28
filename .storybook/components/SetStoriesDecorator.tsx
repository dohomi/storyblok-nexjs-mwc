import * as React from 'react'
import { useEffect, useState } from 'react'
import StoryblokService from '../../src/utils/StoryblokService'
import StoriesService from '../../src/utils/StoriesService'
import { AppConfigProps } from '../../src/utils/parsePageProperties'
import { CONFIG_STORYBOOK } from './configStorybook'

const SetStoriesDecorator = (storyFunc: Function) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  // StoryblokService.setToken('Xzl0aUdUwWqtCsD37fHMmQtt')
  const config: AppConfigProps = { ...CONFIG_STORYBOOK.app }
  StoryblokService.initialize(config)
  StoriesService.setConfig(config)
  useEffect(
    () => {
      const fetch = async () => {
        let [categories, stories, tags] = await Promise.all([
          StoryblokService.getAll('cdn/stories', {
            per_page: 100,
            sort_by: 'content.name:asc',
            filter_query: {
              'component': {
                'in': 'category'
              }
            }
          }),
          StoryblokService.getAll(`cdn/stories`, {
            per_page: 100,
            excluding_fields: 'body,meta_robots,property,meta_title,meta_description,seo_body',
            sort_by: 'published_at:desc',
            filter_query: {
              'component': {
                'in': 'page'
              }
            }
          }),
          StoryblokService.get('cdn/tags')
        ])
        StoriesService.setAllStories(stories || [])
        StoriesService.setAllCategories(categories || [])
        const tagList = (tags && tags.data.tags && tags.data.tags.map((item: { name: string, taggings_count: number }) => ({
          value: item.name,
          label: `${item.name} (${item.taggings_count})`
        }))) || []
        StoriesService.setAllTags(tagList)
        setLoaded(true)
      }

      fetch()
    },
    []
  )
  if (loaded) {
    return (
      <div className="p-3">
        {storyFunc()}
      </div>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }
}
export default SetStoriesDecorator
