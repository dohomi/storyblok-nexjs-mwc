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
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../../utils/intersectionObserverConfig'


const ToolbarLogo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const websiteTitle = settings.website_title
  const websiteLogo = settings.website_logo
  const websiteLogoInvert = settings.website_logo_invert
  const height = settings.toolbar_main_height ? settings.toolbar_main_height * 2 : 48 * 2
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)

  const getImageSrc = (image: string) => imageService(image, '0x' + height)

  const Logo = (
    <div className="h-100 d-inline-block" ref={refIntersectionObserver}>
      <Link as={homepageLinkHandler()} href="/[...index]" passHref>
        <MuiLink className={clsx('lm-logo-header', { ['lm-logo-text']: !websiteLogo })}>
          <>
            {!websiteLogo && (
              <Typography>
                {websiteTitle}
              </Typography>
            )}
            {websiteLogo && inView && <img src={getImageSrc(websiteLogo)}
                                           className={`lm-logo-img${websiteLogoInvert ? ' lm-logo__default' : ''}`}
                                           alt={websiteTitle || 'website logo'} />}
            {websiteLogoInvert && inView && <img src={getImageSrc(websiteLogoInvert)}
                                                 className={`lm-logo-img${websiteLogoInvert ? ' lm-logo__inverted' : ''}`}
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
