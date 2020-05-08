import React, { memo } from 'react';
import BackgroundImage from '../../section/BackgroundImage';
import BackgroundElements from '../../section/BackgroundElements';
import Link from 'next/link';
import { homepageLinkHandler } from '../../../utils/linkHandler';
import imageService from '../../../utils/ImageService';
import ContentSpace from '../ContentSpace';
import DrawerContentList from './DrawerContentList';
import MwcDrawer from './MwcDrawer';
import { useAppSetup } from '../../provider/AppSetupProvider';
import useBackgroundBox from '../../section/useBackgroundBox';
var DrawerElement = function (_a) {
    var settings = _a.settings;
    var appSetup = useAppSetup();
    var background = Array.isArray(settings.drawer_background) && settings.drawer_background[0];
    var backgroundProps = useBackgroundBox({ background: background });
    var websiteTitle = settings.website_title;
    var websiteLogo = settings.website_logo;
    var websiteSlogan = settings.website_slogan;
    return (React.createElement(MwcDrawer, { backgroundProps: backgroundProps },
        ((background === null || background === void 0 ? void 0 : background.image) || (background === null || background === void 0 ? void 0 : background.background_elements)) && React.createElement(BackgroundImage, { content: background }),
        (background === null || background === void 0 ? void 0 : background.background_elements) && background.background_elements.length > 0 &&
            React.createElement(BackgroundElements, { elements: background.background_elements }),
        React.createElement("div", null,
            appSetup.drawerBelowToolbar && (React.createElement(ContentSpace, null)),
            !appSetup.hasDrawer && !appSetup.drawerBelowToolbar && (React.createElement("div", null,
                React.createElement(Link, { href: "/[...index]", as: homepageLinkHandler() },
                    React.createElement("a", null,
                        React.createElement("div", { className: "p-3" },
                            !websiteLogo && websiteTitle,
                            websiteLogo &&
                                React.createElement("img", { src: imageService(websiteLogo, '0x128'), height: "48", alt: websiteTitle || 'website logo' })))),
                websiteSlogan && React.createElement("div", null, websiteSlogan))),
            React.createElement(DrawerContentList, { content: settings }))));
};
export default memo(DrawerElement);
