import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu'
import { TextField, TextFieldProps } from '@rmwc/textfield'
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
      StoryblokService.getSearch(`cdn/stories`, {
        per_page: 100,
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
  const textFieldProps: TextFieldProps = {}
  if (searchText.length > 0) {
    textFieldProps.trailingIcon = {
      icon: 'close',
      tabIndex: 0,
      onClick: () => {
        setSearchText('')
        setItems([])
      }
    }
  }

  function onSearchChange(value: string) {
    setSearchText(value)
    debounceFunc(value)
  }

  return (
    <MenuSurfaceAnchor>
      <Menu open={open}
            onClose={() => setOpen(false)}
            anchorCorner="bottomLeft"
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
                 value={searchText}
                 className={clsx({ 'w-100': content.fullwidth })}
                 outlined={content.outlined}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.currentTarget.value)}
                 {...textFieldProps}
      />
    </MenuSurfaceAnchor>
  )
}

export default ListSearchAutocomplete
