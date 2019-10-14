import { FunctionComponent } from 'react'
import StoriesService from '../../utils/StoriesService'


const ListWidget: FunctionComponent = () => {
  const allStories = StoriesService.getAllStories()
  console.log(allStories)
  return (
    <h3>hallo</h3>
  )
}

export default ListWidget
