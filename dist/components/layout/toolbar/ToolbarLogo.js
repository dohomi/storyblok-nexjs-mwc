import imageService from '../../../utils/ImageService';
import Link from 'next/link';
import SbEditable from 'storyblok-react';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { homepageLinkHandler } from '../../../utils/linkHandler';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../../utils/intersectionObserverConfig';
import { LogoJsonLd } from 'next-seo';
var ToolbarLogo = function (_a) {
    var _b;
    var content = _a.content, settings = _a.settings;
    var websiteTitle = settings.website_title;
    var websiteLogo = settings.website_logo;
    var websiteLogoInvert = settings.website_logo_invert;
    var height = settings.toolbar_main_height ? settings.toolbar_main_height * 2 : 48 * 2;
    var _c = useInView(intersectionDefaultOptions), refIntersectionObserver = _c[0], inView = _c[1];
    var getImageSrc = function (image) { return imageService(image, '0x' + height); };
    var Logo = (React.createElement("div", { className: "h-100 d-inline-block", ref: refIntersectionObserver },
        websiteLogo && settings.seo_website_url &&
            React.createElement(LogoJsonLd, { logo: imageService(websiteLogo), url: settings.seo_website_url }),
        React.createElement(Link, { as: homepageLinkHandler(), href: "/[...index]", passHref: true },
            React.createElement(MuiLink, { className: clsx('lm-logo-header', (_b = {}, _b['lm-logo-text'] = !websiteLogo, _b)) },
                React.createElement(React.Fragment, null,
                    !websiteLogo && (React.createElement(Typography, null, websiteTitle)),
                    websiteLogo && inView && React.createElement("img", { src: getImageSrc(websiteLogo), className: "lm-logo-img" + (websiteLogoInvert ? ' lm-logo__default' : ''), alt: websiteTitle || 'website logo' }),
                    websiteLogoInvert && inView && React.createElement("img", { src: getImageSrc(websiteLogoInvert), className: "lm-logo-img" + (websiteLogoInvert ? ' lm-logo__inverted' : ''), alt: websiteTitle || 'website logo' }))))));
    if (!content) {
        return Logo;
    }
    return (React.createElement(SbEditable, { content: content }, Logo));
};
export default ToolbarLogo;
