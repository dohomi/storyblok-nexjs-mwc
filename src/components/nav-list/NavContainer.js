import SbEditable from 'storyblok-react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {memo} from 'react'
import NavList from './NavList'
import CollapsedNavList from './CollapsedNavList'

const NavContainer = ({content,isMobile}) => {
  // const isSmall = React.useMemo(
  //   () => {
  //     return props.dimensions.width > 0 && props.dimensions.width <= 600
  //   },
  //   [props.dimensions.width]
  // )

  return (
    <SbEditable content={content}>
      {isMobile && content.collapse_on_mobile ? (
        <CollapsedNavList {...content}/>
      ) : (
        <NavList {...content}/>
      )}
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({isMobile: dimensions.width > 0 && dimensions.width <= 600}))(memo(NavContainer))
