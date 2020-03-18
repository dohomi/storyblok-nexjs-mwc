import React, { FunctionComponent, memo } from 'react'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import { useGlobalState } from '../../../utils/state/state'
import BackgroundBox, { BackgroundBoxProps } from '../../section/BackgroundBox'
import BackgroundImage from '../../section/BackgroundImage'
import BackgroundElements from '../../section/BackgroundElements'
import Link from 'next/link'
import { homepageLinkHandler } from '../../../utils/linkHandler'
import imageService from '../../../utils/ImageService'
import ContentSpace from '../ContentSpace'
import DrawerContentList from './DrawerContentList'
import MwcDrawer from './MwcDrawer'

const DrawerElement: FunctionComponent<{
  settings: GlobalStoryblok
}> = ({ settings }) => {
  const [appSetup] = useGlobalState('appSetup')
  const websiteTitle = settings.website_title
  const websiteLogo = settings.website_logo
  const websiteSlogan = settings.website_slogan
  const background = Array.isArray(settings.drawer_background) && settings.drawer_background[0]
  return (
    <BackgroundBox background={background}>
      {(backgroundProps: BackgroundBoxProps) => (
        <MwcDrawer backgroundProps={backgroundProps}>
          {(background?.image || background?.background_elements) && <BackgroundImage content={background} />}
          {background?.background_elements && background.background_elements.length > 0 &&
          <BackgroundElements elements={background.background_elements} />}
          {!appSetup.hasDrawer && (<div>
            <Link href="/[...index]" as={homepageLinkHandler()}>
              <a>
                <div className="p-3">
                  {!websiteLogo && websiteTitle}
                  {websiteLogo &&
                  <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'} />}
                </div>
              </a>
            </Link>
            {websiteSlogan && <div>{websiteSlogan}</div>}
          </div>)}
          {appSetup.drawerBelowToolbar && (
            <ContentSpace />
          )}
          <DrawerContentList content={settings} />
        </MwcDrawer>
      )}
    </BackgroundBox>
  )
}

export default memo(DrawerElement)
