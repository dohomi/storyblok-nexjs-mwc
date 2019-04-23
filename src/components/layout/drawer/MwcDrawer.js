import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle
} from '@rmwc/drawer'
import {bool, func, object} from 'prop-types'
import DrawerContentList from './MwcDrawerList'
import {Link} from 'routes/index'
import imageService from '../../../utils/ImageService'
import {toggleLeftNavigation, useGlobalState} from '../../../utils/state/state'

const MwcDrawer = (props) => {

  let [isOpen] = useGlobalState('leftNavigationDrawer')
  const content = props.content
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const websiteSlogan = content.website_slogan
  return (
    <Drawer modal
            open={isOpen}
            onClose={toggleLeftNavigation}>
      <DrawerHeader>
        <Link route="/">
          <a className="p-2 d-block">
            <DrawerTitle>
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
              <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'}/>}
            </DrawerTitle>
          </a>
        </Link>
        {websiteSlogan && <DrawerSubtitle>{websiteSlogan}</DrawerSubtitle>}
      </DrawerHeader>
      <DrawerContent>
        {DrawerContentList(content)}
      </DrawerContent>
    </Drawer>
  )
}

MwcDrawer.propTypes = {
  isDrawerOpen: bool,
  onDrawerClose: func,
  content: object
}

export default MwcDrawer
