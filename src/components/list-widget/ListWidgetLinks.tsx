import * as React from 'react'
import { FunctionComponent } from 'react'
import { PageItem } from '../../typings/generated/schema'
import { ListWidgetStoryblok, NavItemStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'
import NavList from '../nav-list/NavList'

const ListWidgetLinks: FunctionComponent<{
  items: PageItem[]
  options: NavListStoryblok,
  content: ListWidgetStoryblok
}> = ({ items, options, content }) => {
  const listProps = {
    ...options,
    _uid: content._uid,
    body: items.map((item: PageItem) => {
      const opts: NavItemStoryblok = {
        _uid: content._uid + item.uuid as string,
        component: 'nav_item',
        name: (item.content && (item.content.preview_title || item.name)) || '',
        link: {
          cached_url: '/' + item.full_slug,
          linktype: 'stories'
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
