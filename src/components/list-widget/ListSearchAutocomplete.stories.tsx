import { storiesOf } from '@storybook/react'
import ListSearchAutocomplete from './ListSearchAutocomplete'
import * as React from 'react'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import { storyListSearchAutocomplete } from '../../../.storybook/dummy/layout/toolbar'
import SetStoriesDecorator from '../../../.storybook/components/SetStoriesDecorator'

const props: ListSearchAutocompleteStoryblok = {
  _uid: '123',
  component: 'list_search_autocomplete',
  label: 'Some Test',
  placeholder: 'Some Placeholder',
  not_found_label: 'There is no item found...'
}


storiesOf('Search Autocomplete', module)
  .addDecorator(SetStoriesDecorator)
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
    'Mobile',
    () => (
      <div>
        <h3>Mobile sm:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, mobile_breakpoint: 'sm' }} />
        <h3>Mobile lg:</h3>
        <ListSearchAutocomplete content={{ ...props, label: undefined, mobile_breakpoint: 'lg' }} />
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
        <h3>Align Menu to the right</h3>
        <div className="text-center">
          <ListSearchAutocomplete
            content={{
              ...props,
              label: undefined,
              outlined: true,
              shape: 'square',
              menu_border_radius: '0px',
              menu_align_right: true
            }} />
        </div>
      </div>
    )
  )
  .add(
    'Playground',
    () => (
      <div className="text-center p-5">
        <ListSearchAutocomplete
          content={storyListSearchAutocomplete({
            options: {
              placeholder: 'Search..'
            }
          })} />
      </div>
    )
  )
