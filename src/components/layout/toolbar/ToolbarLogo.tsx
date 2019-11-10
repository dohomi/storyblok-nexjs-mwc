import imageService from '../../../utils/ImageService'
import { Link } from '@routes'
import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok, ToolbarLogoStoryblok } from '../../../typings/generated/components-schema'
import StoriesService from '../../../utils/StoriesService'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import { useTheme } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const ToolbarLogo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const theme = useTheme()
  const trigger = useScrollTrigger()

  console.log(theme)
  const availableHeight = theme.mixins.toolbar
  console.log(availableHeight)
  const websiteTitle = settings.website_title
  const websiteLogo = settings.website_logo && imageService(settings.website_logo, '0x' + 48 * 2)
  const websiteLogoInverted = settings.website_logo_invert && imageService(settings.website_logo_invert, '0x' + 48 * 2)

  const CurrentLink = () => (
    <Link route={StoriesService.locale ? `/${StoriesService.locale}` : '/'} passHref>
      <MuiLink className="lm-logo-header">
        <Collapse collapsedHeight={'64px'} in={!trigger}>
          {!websiteLogo && (
            <Typography>
              {websiteTitle}
            </Typography>
          )}
          {websiteLogo &&
          <img src={websiteLogo}
               className={`lm-logo-img${websiteLogoInverted ? ' lm-logo__default' : ''}`}
               alt={websiteTitle || 'website logo'} />}
          {websiteLogoInverted &&
          <img src={websiteLogoInverted}
               className={`lm-logo-img${websiteLogoInverted ? ' lm-logo__inverted' : ''}`}
               alt={websiteTitle || 'website logo'} />}
        </Collapse>
      </MuiLink>
    </Link>
  )
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
