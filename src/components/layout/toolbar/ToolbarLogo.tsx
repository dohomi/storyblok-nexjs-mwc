import imageService from '../../../utils/ImageService'
import { Link } from '@routes'
import { TopAppBarTitle } from '@rmwc/top-app-bar'
import SbEditable from 'storyblok-react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok, ToolbarLogoStoryblok } from '../../../typings/generated/components-schema'
import StoriesService from '../../../utils/StoriesService'

const ToolbarLogo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const websiteTitle = settings.website_title
  const websiteLogo = settings.website_logo && imageService(settings.website_logo, '0x' + 48 * 2)
  const websiteLogoInverted = settings.website_logo_invert && imageService(settings.website_logo_invert, '0x' + 48 * 2)

  const CurrentLink = () => <Link route={StoriesService.locale ? `/${StoriesService.locale}` : '/'}>
    <a className="lm-logo-header">
      {!websiteLogo && (
        <TopAppBarTitle>
          {websiteTitle}
        </TopAppBarTitle>
      )}
      {websiteLogo &&
      <img src={websiteLogo}
           height="56"
           className={`img-fluid${websiteLogoInverted ? ' lm-logo__default' : ''}`}
           alt={websiteTitle || 'website logo'} />}
      {websiteLogoInverted &&
      <img src={websiteLogoInverted}
           className={`img-fluid${websiteLogoInverted ? ' lm-logo__inverted' : ''}`}
           height="56"
           alt="inverted logo" />}
    </a>
  </Link>
  if (!content) {
    return CurrentLink()
  }
  return (
    <SbEditable content={content}>
      {CurrentLink()}
    </SbEditable>
  )
}

export default ToolbarLogo
