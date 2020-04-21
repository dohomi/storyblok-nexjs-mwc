import React, { FunctionComponent } from 'react'
import { ListWidgetStoryblok, NavItemStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'
import NavList from '../nav-list/NavList'
import { AppApiRequestPayload } from '../../typings/app'

const ListWidgetLinks: FunctionComponent<{
  items: AppApiRequestPayload['allStories']
  options: NavListStoryblok,
  content: ListWidgetStoryblok
}> = ({ items, options, content }) => {
  const listProps = {
    ...options,
    _uid: content._uid,
    body: items.map((item) => {
      const opts: NavItemStoryblok = {
        _uid: content._uid + item.uuid,
        component: 'nav_item',
        name: (item.content && (item.content.preview_title || item.name)) || '',
        link: {
          cached_url: item.full_slug,
          linktype: 'story'
        }
      }
      return opts
    })
  }
  return (
    <NavList content={listProps} />
  )
}
export default ListWidgetLinks
