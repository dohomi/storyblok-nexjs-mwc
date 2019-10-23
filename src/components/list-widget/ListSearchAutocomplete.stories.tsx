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

storiesOf('List Widget Addons', module)
  .add(
    'Search Autocomplete',
    () => (
      <div className="p-3">
        <h3>Default:</h3>
        <ListSearchAutocomplete content={{ ...props, label: 'Search' }} />
        <h3>Default without label:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined }} />
        <h3>Fullwidth:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, fullwidth: true }} />
        <h3>Square:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, shape: 'square' }} />
        <h3>Square fullwidth:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, fullwidth: true, shape: 'square' }} />
        <h3>Rounded:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, shape: 'rounded' }} />
        <h3>Rounded fullwidth:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, fullwidth: true, shape: 'rounded' }} />
      </div>
    )
  )
  .add(
    'Outlined Autocomplete',
    () => (
      <div className="p-3">
        <h3>Default:</h3>
        <ListSearchAutocomplete content={{ ...props, label: 'Search', outlined: true }} />
        <h3>Default without label:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, outlined: true }} />
        <h3>Fullwidth:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, fullwidth: true, outlined: true }} />
        <h3>Square:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, outlined: true, shape: 'square' }} />
        <h3>Square fullwidth:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, fullwidth: true, outlined: true, shape: 'square' }} />
        <h3>Rounded:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, outlined: true, shape: 'rounded' }} />
        <h3>Rounded fullwidth:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, fullwidth: true, outlined: true, shape: 'rounded' }} />
      </div>
    )
  )
  .add(
    'Shaped Menu',
    () => (
      <div className="p-3">
        <h3>Default:</h3>
        <ListSearchAutocomplete content={{ ...props, label: 'Search', outlined: true }} />
        <h3>Default without label:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, menu_border_radius: '0px', shape: 'square' }} />
        <h3>Fullwidth:</h3>
        <ListSearchAutocomplete
          content={{ ...props, label: undefined, fullwidth: true, outlined: true, menu_border_radius: '16px' }} />
        <h3>Square:</h3>
        <ListSearchAutocomplete
          content={{
            ...props,
            label: undefined,
            outlined: true,
            shape: 'square',
            menu_border_radius: '0px 4px 16px 16px'
          }} />
      </div>
    )
  )
