import React, { FunctionComponent, memo } from 'react'
import DrawerContentList from './DrawerContentList'
import { Link } from '@routes'
import imageService from '../../../utils/ImageService'
import { useGlobalState } from '../../../utils/state/state'
import { closeNavigationDrawers } from '../../../utils/state/actions'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import Drawer from '@material-ui/core/Drawer'
import { homepageLinkHandler } from '../../../utils/linkHandler'

const MwcDrawer: FunctionComponent<{ content: GlobalStoryblok }> = ({ content }) => {
  let [isOpen] = useGlobalState('leftNavigationDrawer')
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const websiteSlogan = content.website_slogan
  console.log('render drawer')
  return (
    <Drawer open={isOpen}
            className="lm-main__drawer"
            onClose={() => closeNavigationDrawers()}>
      <div>
        <Link route={homepageLinkHandler()}>
          <a>
            <div className="p-3">
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
              <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'} />}
            </div>
          </a>
        </Link>
        {websiteSlogan && <div>{websiteSlogan}</div>}
      </div>
      <>
        <DrawerContentList {...content} />
      </>
    </Drawer>
  )
}

export default memo(MwcDrawer)
