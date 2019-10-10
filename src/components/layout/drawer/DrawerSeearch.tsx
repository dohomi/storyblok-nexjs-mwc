import { TextField } from '@rmwc/textfield'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ToolbarSearchStoryblok } from '../../../typings/generated/components-schema'

const DrawerSearch: FunctionComponent<ToolbarSearchStoryblok> = (content) =>
  <TextField fullwidth
             id={content._uid}
             placeholder={content.placeholder || 'Search...'}
             icon="search" />

export default DrawerSearch
