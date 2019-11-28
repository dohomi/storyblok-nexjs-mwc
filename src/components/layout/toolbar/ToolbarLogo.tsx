import imageService from '../../../utils/ImageService'
import Link from 'next/link'
import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok, ToolbarLogoStoryblok } from '../../../typings/generated/components-schema'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import { homepageLinkHandler } from '../../../utils/linkHandler'
import clsx from 'clsx'


const ToolbarLogo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const websiteTitle = settings.website_title
  const height = settings.toolbar_main_height ? settings.toolbar_main_height * 2 : 48 * 2
  const websiteLogo = settings.website_logo && imageService(settings.website_logo, '0x' + height)
  const websiteLogoInverted = settings.website_logo_invert && imageService(settings.website_logo_invert, '0x' + height)

  const as = homepageLinkHandler()
  console.log(as)
  const Logo = (
    <div className="h-100 d-inline-block">
      <Link as={homepageLinkHandler()} href="/[...index]" passHref>
        <MuiLink className={clsx('lm-logo-header', { ['lm-logo-text']: !websiteLogo })}>
          <>
            {!websiteLogo && (
              <Typography>
                {websiteTitle}
              </Typography>
            )}
            {websiteLogo &&
            <img src={websiteLogo}
                 className={`lm-logo-img${websiteLogoInverted ? ' lm-logo__default' : ''}`}
                 alt={websiteTitle || 'website logo'} />}
            {websiteLogoInverted && <img src={websiteLogoInverted}
                                         className={`lm-logo-img${websiteLogoInverted ? ' lm-logo__inverted' : ''}`}
                                         alt={websiteTitle || 'website logo'} />}
          </>
        </MuiLink>
      </Link>
    </div>
  )
  if (!content) {
    return Logo
  }
  return (
    <SbEditable content={content}>
      {Logo}
    </SbEditable>
  )
}

export default ToolbarLogo
