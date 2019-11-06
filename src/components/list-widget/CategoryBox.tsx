import * as React from 'react'
import { ChangeEvent, CSSProperties, FunctionComponent, useState } from 'react'
import { CategoryBoxStoryblok, CategoryStoryblok } from '../../typings/generated/components-schema'
import StoriesService from '../../utils/StoriesService'
// import { Checkbox } from '@rmwc/checkbox'
import { CategoryItem } from '../../typings/generated/schema'
import SbEditable from 'storyblok-react'
import { setSearchCategory } from '../../utils/state/actions'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CategoryBox: FunctionComponent<{ content: CategoryBoxStoryblok }> = ({ content }) => {
  const { query } = useRouter()
  let initialValues: string[] = []
  if (query.search__categories) {
    initialValues = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories]
  }
  const [selected, setSelected] = useState<string[]>(initialValues)
  let categories: CategoryItem[] = StoriesService.getAllCategories() || []

  const filterByTags = (content.filter_by_tags && content.filter_by_tags.values) || []
  const filterByCategories = content.filter_categories || []
  if (filterByTags || filterByCategories.length) {
    categories = categories.filter((category: CategoryItem) => {
      const categoryContent = category.content as CategoryStoryblok
      if (!(categoryContent.tag_reference && categoryContent.tag_reference.values)) return false // remove all categories without tag_reference
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

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.currentTarget.checked
    const value = event.currentTarget.value
    if (isChecked) {
      const currentCategories = [...selected, value]
      setSelected(currentCategories)
      setSearchCategory(currentCategories)

    } else {
      const currentCategories = selected.filter(i => i !== value)
      setSelected(currentCategories)
      setSearchCategory(currentCategories)
    }
  }

  let style: CSSProperties = {}
  // const style = { maxHeight: '500px', overflowY: 'auto' }
  return (
    <SbEditable content={content}>
      <div style={style} className={clsx(content.class_names && content.class_names.values)}>
        {categories.map((category: CategoryItem) => {
          const value = category.content && category.content.tag_reference && category.content.tag_reference.values
          return (
            <div key={category.uuid as string}>
              <FormControlLabel control={
                <Checkbox id={category.uuid as string}
                          name={category.uuid as string}
                          checked={selected.includes(value)}
                          value={value}
                          onChange={onChange}
                />
              } label={category.content && category.content.name} />

            </div>
          )
        })}
      </div>
    </SbEditable>
  )
}

export default CategoryBox
