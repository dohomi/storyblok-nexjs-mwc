import LinkItem from './LinkItem'
import {SimpleListItem} from '@rmwc/list'

const DrawerButton = (props) => {
  const buttonProps = {
    text: props.label || props.name,
    graphic: props.icon && props.icon.name
  }
  return (
    <LinkItem  {...props}>
      <SimpleListItem {...buttonProps}/>
    </LinkItem>
  )
}

export default DrawerButton
