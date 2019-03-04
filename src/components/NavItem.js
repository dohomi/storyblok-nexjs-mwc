import {Link} from '../routes'
import SbEditable from 'storyblok-react'
import Button from './Button'

const NavItem = (props) => {
  const link = props.content.link
  const property = props.content.property || []
  const text = props.content.name

  const btnProps = {
    ...props.content,
    text
  }

  const RawButton = () => (
    <Button content={btnProps} />
  )

  const ButtonChild = () => {
    if (link.linktype === 'story') {
      return (
        <Link route={`/${link.cached_url}`} prefetch>
          <RawButton/>
        </Link>
      )
    }
    return (
      <RawButton/>
    )
  }
  return (
    <SbEditable content={props.content}>
      <ButtonChild/>
    </SbEditable>
  )
}

export default NavItem
