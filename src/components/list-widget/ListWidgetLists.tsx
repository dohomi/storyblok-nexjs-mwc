import * as React from 'react'
import { FunctionComponent } from 'react'
import { ListsStoryblok } from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import { List, SimpleListItem } from '@rmwc/list'
import { Avatar } from '@rmwc/avatar'
import imageService from '../../utils/ImageService'
import { Link } from 'routes'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

const ListWidgetLists: FunctionComponent<{
  items: PageItem[]
  options: ListsStoryblok
}> = ({ items, options }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  const imageSize = options.image_size || 'large'
  const hideImage = options.hide_image
  const getImageSrc = (src: string) => {
    return `"${imageService(src, '64x64/smart')}"`
  }
  return (
    <div ref={refIntersectionObserver}>
      <List twoLine={!!options.two_line}>
        {items.map((item: PageItem) => {
          const itemContent = item.content as PageComponent
          const props = !hideImage ? {
            graphic: {
              size: imageSize,
              icon: inView && !!itemContent.preview_image &&
                <Avatar src={getImageSrc(itemContent.preview_image)} size={imageSize} />
            }
          } : {}
          return (
            <Link to={'/' + item.full_slug}
                  passHref
                  key={String(itemContent._uid)}>
              <SimpleListItem
                text={itemContent.preview_title}
                secondaryText={itemContent.preview_subtitle}
                tag="a"
                {...props}
              />
            </Link>
          )
        })}
      </List>
    </div>
  )
}

export default ListWidgetLists
