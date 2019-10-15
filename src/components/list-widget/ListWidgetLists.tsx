import * as React from 'react'
import { FunctionComponent } from 'react'
import { ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import { List, SimpleListItem } from '@rmwc/list'
import { Avatar } from '@rmwc/avatar'
import imageService from '../../utils/ImageService'

const ListWidgetLists: FunctionComponent<{
  content: ListWidgetStoryblok
  items: PageItem[]
}> = ({ content, items }) => {
  console.log(content)
  // const getImageSrc = (src: string) => {
  //   return imageService(src)
  // }
  return (
    <List>
      {items.map((item: PageItem) => {
        const itemContent = item.content as PageComponent
        return (
          <SimpleListItem key={String(itemContent._uid)}
                          text={itemContent.preview_title}
                          secondaryText={itemContent.preview_subtitle}
                          graphic={{
                            icon: !!itemContent.preview_image &&
                              <Avatar src={String(imageService(itemContent.preview_image))} />
                          }}
          />
        )
      })}
    </List>
  )
}

export default ListWidgetLists
