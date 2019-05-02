import SbEditable from 'storyblok-react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {memo} from 'react'
import NavList from './NavList'
import CollapsedNavList from './CollapsedNavList'

const NavContainer = ({content,dimensions}) => {
  return (
    <SbEditable content={content}>
      {dimensions.isMobile && content.collapse_on_mobile ? (
        <CollapsedNavList {...content}/>
      ) : (
        <NavList {...content}/>
      )}
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(memo(NavContainer))
