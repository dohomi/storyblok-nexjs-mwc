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
const ToolbarLogo = ({ content, settings }) => {
    const websiteTitle = settings.website_title;
    const websiteLogo = settings.website_logo;
    const websiteLogoInvert = settings.website_logo_invert;
    const height = settings.toolbar_main_height ? settings.toolbar_main_height * 2 : 48 * 2;
    const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions);
    const getImageSrc = (image) => imageService(image, '0x' + height);
    const Logo = (React.createElement("div", { className: "h-100 d-inline-block", ref: refIntersectionObserver },
        websiteLogo && settings.seo_website_url &&
            React.createElement(LogoJsonLd, { logo: imageService(websiteLogo), url: settings.seo_website_url }),
        React.createElement(Link, { as: homepageLinkHandler(), href: "/[...index]", passHref: true },
            React.createElement(MuiLink, { className: clsx('lm-logo-header', { ['lm-logo-text']: !websiteLogo }) },
                React.createElement(React.Fragment, null,
                    !websiteLogo && (React.createElement(Typography, null, websiteTitle)),
                    websiteLogo && inView && React.createElement("img", { src: getImageSrc(websiteLogo), className: `lm-logo-img${websiteLogoInvert ? ' lm-logo__default' : ''}`, alt: websiteTitle || 'website logo' }),
                    websiteLogoInvert && inView && React.createElement("img", { src: getImageSrc(websiteLogoInvert), className: `lm-logo-img${websiteLogoInvert ? ' lm-logo__inverted' : ''}`, alt: websiteTitle || 'website logo' }))))));
    if (!content) {
        return Logo;
    }
    return (React.createElement(SbEditable, { content: content }, Logo));
};
export default ToolbarLogo;
