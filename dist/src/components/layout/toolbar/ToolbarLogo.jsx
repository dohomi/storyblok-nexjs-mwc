import imageService from '../../../utils/ImageService';
import { Link } from 'routes';
import { TopAppBarTitle } from '@rmwc/top-app-bar';
import SbEditable from 'storyblok-react';
var ToolbarLogo = function (_a) {
    var content = _a.content, settings = _a.settings;
    var websiteTitle = settings.website_title;
    var websiteLogo = settings.website_logo && imageService(settings.website_logo, '0x' + 48 * 2);
    var websiteLogoInverted = settings.website_logo_invert && imageService(settings.website_logo_invert, '0x' + 48 * 2);
    var CurrentLink = function () { return <Link route="/">
    <a className="lm-logo-header">
      {!websiteLogo && (<TopAppBarTitle>
          {websiteTitle}
        </TopAppBarTitle>)}
      {websiteLogo &&
        <img src={websiteLogo} height="56" className={"img-fluid" + (websiteLogoInverted ? ' lm-logo__default' : '')} alt={websiteTitle || 'website logo'}/>}
      {websiteLogoInverted &&
        <img src={websiteLogoInverted} className={"img-fluid" + (websiteLogoInverted ? ' lm-logo__inverted' : '')} height="56" alt="inverted logo"/>}
    </a>
  </Link>; };
    if (!content) {
        return CurrentLink();
    }
    return (<SbEditable content={content}>
      {CurrentLink()}
    </SbEditable>);
};
export default ToolbarLogo;
