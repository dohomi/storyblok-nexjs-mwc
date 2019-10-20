import * as React from 'react'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { TextField, TextFieldProps } from '@rmwc/textfield'
import { ListSearchFieldStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'
import { onSearchTextChange } from '../../utils/state/actions'
import { useGlobalState } from '../../utils/state/state'

const ListSearchField: FunctionComponent<{ content: ListSearchFieldStoryblok }> = ({ content }) => {
  const [searchParams] = useGlobalState('searchParams')
  const [searchText, setSearchText] = useState<string>(searchParams.searchText || '')
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      onSearchTextChange(value)
    },
    // delay in ms
    300
  )
  const props: TextFieldProps = {}

  if (searchText.length > 0) {
    props.trailingIcon = {
      icon: 'close',
      tabIndex: 0,
      onClick: () => {
        setSearchText('')
        debouncedCallback('')
      }
    }
  }

  function onSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value
    setSearchText(value)
    debouncedCallback(value)
  }

  return (
    <SbEditable content={content}>
      <TextField icon="search"
                 id={content._uid}
                 value={searchText}
                 label={content.label}
                 placeholder={content.placeholder}
                 className={clsx({ 'w-100': content.fullwidth })}
                 outlined={content.outlined}
                 onChange={onSearchChange}
                 {...props}
      />
    </SbEditable>
  )
}
export default ListSearchField
