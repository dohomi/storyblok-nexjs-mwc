import LinkItem from './LinkItem'
import { SimpleListItem } from '@rmwc/list'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'

const DrawerButton: FunctionComponent<ButtonStoryblok> = (props) => {
  const buttonProps = {
    text: props.label || props.name,
    graphic: props.icon && props.icon.name
  }
  return (
    <LinkItem  {...props}>
      <SimpleListItem {...buttonProps} />
    </LinkItem>
  )
}

export default DrawerButton
