import * as React from 'react'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { ListSearchFieldStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import { useDebouncedCallback } from 'use-debounce'
import { onSearchTextChange } from '../../utils/state/actions'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import clsx from 'clsx'
import { Magnify } from 'mdi-material-ui'

const ListSearchField: FunctionComponent<{ content: ListSearchFieldStoryblok }> = ({ content }) => {
  const { query } = useRouter()
  const [searchText, setSearchText] = useState<string>(query.search__text as string || '')
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      onSearchTextChange(value)
    },
    // delay in ms
    300
  )

  function onSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value
    setSearchText(value)
    debouncedCallback(value)
  }

  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        <TextField
          InputProps={{
            startAdornment: <Magnify />
          }}
          id={content._uid}
          value={searchText}
          label={content.label}
          type="search"
          placeholder={content.placeholder}
          variant={'outlined'}
          onChange={onSearchChange}
        />
      </div>
    </SbEditable>
  )
}
export default ListSearchField
