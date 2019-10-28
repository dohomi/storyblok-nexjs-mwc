import React, { FunctionComponent } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle } from '@rmwc/drawer'
import DrawerContentList from './DrawerContentList'
import { Link } from '@routes'
import imageService from '../../../utils/ImageService'
import { useGlobalState } from '../../../utils/state/state'
import { closeNavigationDrawers } from '../../../utils/state/actions'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'

const MwcDrawer: FunctionComponent<{ content: GlobalStoryblok }> = ({ content }) => {
  let [isOpen] = useGlobalState('leftNavigationDrawer')
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const websiteSlogan = content.website_slogan
  return (
    <Drawer modal
            open={isOpen}
            onClose={() => closeNavigationDrawers()}>
      <DrawerHeader>
        <Link route="/">
          <a className="p-2 d-block">
            <DrawerTitle>
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
              <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'} />}
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

export default MwcDrawer
