import * as React from 'react'
import { FunctionComponent } from 'react'
import { ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import { List, SimpleListItem, SimpleListItemProps } from '@rmwc/list'
import { Avatar } from '@rmwc/avatar'
import imageService from '../../utils/ImageService'
import { Link } from '@routes'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import SbEditable from 'storyblok-react'

const ListWidgetLists: FunctionComponent<{
  items: PageItem[]
  options: ListsStoryblok
  content: ListWidgetStoryblok
}> = ({ items, options, content }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  const imageSize = options.image_size || 'large'
  const hideImage = options.hide_image
  const getImageSrc = (src: string) => {
    return `"${imageService(src, '64x64/smart')}"`
  }
  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <List twoLine={!!options.two_line}>
          {items.map((item: PageItem) => {
            const itemContent = item.content as PageComponent
            const props: SimpleListItemProps = !hideImage && itemContent.preview_image ? {
              graphic: {
                size: imageSize,
                icon: inView && !!itemContent.preview_image &&
                  <Avatar src={getImageSrc(itemContent.preview_image)} size={imageSize} />
              }
            } : {}
            if (itemContent.preview_subtitle && !options.hide_subtitle) {
              props.secondaryText = itemContent.preview_subtitle
            }
            return (
              <Link to={'/' + item.full_slug}
                    key={item.uuid as string}>
                <a>
                  <SimpleListItem
                    text={itemContent.preview_title || item.name}
                    {...props}
                  />
                </a>
              </Link>
            )
          })}
        </List>
      </div>
    </SbEditable>
  )
}

export default ListWidgetLists
