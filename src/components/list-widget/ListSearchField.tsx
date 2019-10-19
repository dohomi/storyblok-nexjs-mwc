import * as React from 'react'
import { ChangeEvent, FunctionComponent } from 'react'
import { TextField } from '@rmwc/textfield'
import { ListSearchFieldStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'
import { onSearchTextChange } from '../../utils/state/actions'

const ListSearchField: FunctionComponent<{ content: ListSearchFieldStoryblok }> = ({ content }) => {
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      onSearchTextChange(value)
    },
    // delay in ms
    300
  )
  return (
    <SbEditable content={content}>
      <TextField icon="search"
                 id={content._uid}
                 label={content.label}
                 placeholder={content.placeholder}
                 className={clsx({ 'w-100': content.fullwidth })}
                 outlined={content.outlined}
                 type="search"
                 onChange={(ev: ChangeEvent<HTMLInputElement>) => debouncedCallback(ev.currentTarget.value)} />
    </SbEditable>
  )
}
export default ListSearchField
