import * as React from 'react'
import { ChangeEvent, FunctionComponent, useState } from 'react'
// import { TextField, TextFieldProps } from '@rmwc/textfield'
import { ListSearchFieldStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import { useDebouncedCallback } from 'use-debounce'
import { onSearchTextChange } from '../../utils/state/actions'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import { Icon } from '@material-ui/core'

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
  // const props = {}
  //
  // if (searchText.length > 0) {
  //   props.trailingIcon = {
  //     icon: 'close',
  //     tabIndex: 0,
  //     onClick: () => {
  //       setSearchText('')
  //       debouncedCallback('')
  //     }
  //   }
  // }


  // className={clsx({ 'w-100': content.fullwidth })}

  function onSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value
    setSearchText(value)
    debouncedCallback(value)
  }

  return (
    <SbEditable content={content}>
      <TextField
        InputProps={{
          startAdornment: <Icon>search</Icon>
        }}
        id={content._uid}
        value={searchText}
        label={content.label}
        type="search"
        placeholder={content.placeholder}
        variant={'outlined'}
        onChange={onSearchChange}
      />
    </SbEditable>
  )
}
export default ListSearchField
