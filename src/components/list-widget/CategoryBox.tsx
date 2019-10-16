import * as React from 'react'
import { ChangeEvent, FunctionComponent } from 'react'
import { CategoryBoxStoryblok, CategoryStoryblok } from '../../typings/generated/components-schema'
import StoriesService from '../../utils/StoriesService'
import { Checkbox } from '@rmwc/checkbox'
import { CategoryItem } from '../../typings/generated/schema'
import SbEditable from 'storyblok-react'
import { addSearchCategory, removeSearchCategory } from '../../utils/state/actions'

const CategoryBox: FunctionComponent<{ content: CategoryBoxStoryblok }> = ({ content }) => {
  let categories: CategoryItem[] = StoriesService.getAllCategories() || []
  const filterByTags = (content.filter_by_tags && content.filter_by_tags.values) || []
  const filterByCategories = content.filter_categories || []
  if (filterByTags || filterByCategories.length) {
    categories = categories.filter((category: CategoryItem) => {
      let exists = true
      if (filterByTags.length) {
        const tagList = category.tag_list || []
        exists = tagList.length && content.match_all_tags
          ? filterByTags.every(element => tagList.includes(element))
          : filterByTags.some(element => tagList.includes(element))
        if (exists) return true
      }
      if (filterByCategories.length) {
        return filterByCategories.includes(category.uuid)
      }
      return exists
    })
  }
  const items = categories.map((category: CategoryItem) => {
    const categoryContent = category.content as CategoryStoryblok
    return {
      _uid: category.uuid as string,
      label: categoryContent.name
    }
  })
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked
    const value = event.currentTarget.value
    if (isChecked) {
      addSearchCategory(value)
    } else {
      removeSearchCategory(value)
    }
  }
  return (
    <SbEditable content={content}>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {items.map(category => (
          <div key={category._uid}>
            <Checkbox id={category._uid}
                      name={category._uid}
                      label={category.label}
                      value={category._uid}
                      onChange={onChange}
            />
          </div>
        ))}
      </div>
    </SbEditable>
  )
}

export default CategoryBox
