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
import imageService from '../../utils/ImageService'

const MwcDrawer = (props) => {
  const content = props.content
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const websiteSlogan = content.website_slogan
  return (
    <Drawer modal
            open={props.isDrawerOpen}
            onClose={() => props.onDrawerClose()}>
      <DrawerHeader>
        <Link route="/">
          <a>
            <DrawerTitle>
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
              <img src={imageService(websiteLogo, '0x128')} height="56" alt={websiteTitle || 'website logo'}/>}
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
