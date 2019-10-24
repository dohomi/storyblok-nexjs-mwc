import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu'
import { TextField } from '@rmwc/textfield'
import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import StoryblokService from '../../utils/StoryblokService'
import { PageItem } from '../../typings/generated/schema'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import clsx from 'clsx'

const ListSearchAutocomplete: FunctionComponent<{ content: ListSearchAutocompleteStoryblok }> = ({ content }) => {
  const [items, setItems] = useState<PageItem[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  const [debounceFunc] = useDebouncedCallback(
    (value) => {
      if (value.length < 3) {
        return
      }
      StoryblokService.getSearch(`cdn/stories`, {
        per_page: 25,
        sort_by: 'content.preview_title:desc',
        excluding_fields: 'body,right_body,meta_robots,property,seo_body',
        search_term: value,
        filter_query: {
          'component': {
            'in': 'page'
          }
        }
      }).then(res => {
        setItems(res.data.stories)
        setOpen(true)
        setSearchText(value)
      })
    },
    400
  )

  function onSearchChange(value: string) {
    setSearchText(value)
    debounceFunc(value)
  }

  return (
    <MenuSurfaceAnchor className="lm-search__anchor">
      <Menu open={open}
            className={clsx('lm-search__menu', {
              'lm-search__menu-right': content.menu_align_right
            })}
            onClose={() => setOpen(false)}
            anchorCorner="bottomStart"
            style={{ borderRadius: content.menu_border_radius }}
            hoistToBody={false}
      >
        {items.length < 1 && (
          <MenuItem>{content.not_found_label}</MenuItem>
        )}
        {items.map(item => (
          <MenuItem
            key={item.uuid as string}>{item.content && (item.content.preview_title || item.content.meta_title || item.name)}</MenuItem>
        ))}
      </Menu>
      <TextField placeholder={content.placeholder}
                 label={content.label}
                 id={content._uid}
                 icon={(content.icon && content.icon.name) || 'search'}
                 value={searchText}
                 className={clsx('lm-search__autocomplete lm-form', {
                   'w-100': content.fullwidth,
                   ['lm-form__shaped']: content.shape === 'rounded',
                   ['lm-form__square']: content.shape === 'square'
                 })}
                 outlined={content.outlined}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.currentTarget.value)}
                 trailingIcon={{
                   icon: searchText.length > 0 ? 'close' : '',
                   tabIndex: 0,
                   onClick: () => {
                     setSearchText('')
                     setItems([])
                   }
                 }}
      />
    </MenuSurfaceAnchor>
  )
}

export default ListSearchAutocomplete
