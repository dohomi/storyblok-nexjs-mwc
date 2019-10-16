import { FunctionComponent } from 'react'
import { CategoryBoxStoryblok } from '../../typings/generated/components-schema'
import StoriesService from '../../utils/StoriesService'
import { Checkbox } from '@rmwc/checkbox'

const CategoryBox: FunctionComponent<{ content: CategoryBoxStoryblok }> = ({ content }) => {
  const categories = StoriesService.getAllCategories()
  console.log(content, categories)
  return (
    <div>
      {categories.map(category => (
        <div key={category._uid}>
          <Checkbox name={category._uid} label={category.name} />
        </div>
      ))}
    </div>
  )
}

export default CategoryBox
