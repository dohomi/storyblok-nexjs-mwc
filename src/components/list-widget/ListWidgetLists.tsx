import React, { FunctionComponent } from 'react'
import { ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Link from 'next/link'
import SbEditable from 'storyblok-react'
import ListItem from '@material-ui/core/ListItem'
import { LmMuiAvatar } from '../avatar/LmMuiAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { internalLinkHandler } from '../../utils/linkHandler'
import { AppApiRequestPayload } from '../../typings/app'


const ListWidgetLists: FunctionComponent<{
  items: AppApiRequestPayload['allStories']
  options: ListsStoryblok
  content: ListWidgetStoryblok
}> = ({ items, options, content }) => {
  const imageSize = options.image_size || 'large'
  const hideImage = options.hide_image
  return (
    <SbEditable content={content}>
      <List>
        {items.map((item) => (
          <Link href="/[...index]"
                as={internalLinkHandler(item.full_slug)}
                key={item.uuid}
                passHref
                prefetch={false}>
            <ListItem component={'a'}>
              {!hideImage && item.content.preview_image && (
                <ListItemAvatar>
                  <LmMuiAvatar src={item.content.preview_image} size={imageSize} />
                </ListItemAvatar>
              )}
              <ListItemText primary={item.content.preview_title || item.name}
                            secondary={!options.hide_subtitle && item.content.preview_subtitle}></ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </SbEditable>
  )
}

export default ListWidgetLists
