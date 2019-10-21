import { storiesOf } from '@storybook/react'
import ListSearchAutocomplete from './ListSearchAutocomplete'
import * as React from 'react'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'

const props: ListSearchAutocompleteStoryblok = {
  _uid: '123',
  component: 'list_search_autocomplete',
  label: 'Some Test',
  placeholder: 'Some Placeholder',
  not_found_label: 'There is no item found...'
}

storiesOf('List Widget', module)
  .add(
    'Search Autocomplete',
    () => (
      <>
        <ListSearchAutocomplete content={props} />
        <h3>Without label</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined }} />
        <h3>Without label</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, fullwidth: true }} />
        <h3>Outlined</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, fullwidth: true, outlined: true }} />
      </>
    )
  )
