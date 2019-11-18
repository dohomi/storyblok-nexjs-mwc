import * as React from 'react'
import { FunctionComponent } from 'react'
import { ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { Link } from '@routes'
import SbEditable from 'storyblok-react'
import ListItem from '@material-ui/core/ListItem'
import LmMuiAvatar from '../avatar/LmMuiAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { internalLinkHandler } from '../../utils/linkHandler'


const ListWidgetLists: FunctionComponent<{
  items: PageItem[]
  options: ListsStoryblok
  content: ListWidgetStoryblok
}> = ({ items, options, content }) => {
  const imageSize = options.image_size || 'large'
  const hideImage = options.hide_image
  return (
    <SbEditable content={content}>
      <List>
        {items.map((item: PageItem) => {
          const itemContent = item.content as PageComponent

          return (
            <Link href={internalLinkHandler(item.full_slug as string)}
                  key={item.uuid as string}
                  passHref>
              <ListItem component={'a'}>
                {!hideImage && itemContent.preview_image && (
                  <ListItemAvatar>
                    <LmMuiAvatar src={itemContent.preview_image} size={imageSize} />
                  </ListItemAvatar>
                )}
                <ListItemText primary={itemContent.preview_title || item.name}
                              secondary={!options.hide_subtitle && itemContent.preview_subtitle}></ListItemText>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </SbEditable>
  )
}

export default ListWidgetLists
