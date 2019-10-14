var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle } from '@rmwc/drawer';
import DrawerContentList from './DrawerContentList';
import { Link } from 'routes';
import imageService from '../../../utils/ImageService';
import { useGlobalState } from '../../../utils/state/state';
import { closeNavigationDrawers } from '../../../utils/state/actions';
var MwcDrawer = function (_a) {
    var content = _a.content;
    var _b = __read(useGlobalState('leftNavigationDrawer'), 1), isOpen = _b[0];
    var websiteTitle = content.website_title;
    var websiteLogo = content.website_logo;
    var websiteSlogan = content.website_slogan;
    return (<Drawer modal open={isOpen} onClose={closeNavigationDrawers}>
      <DrawerHeader>
        <Link route="/">
          <a className="p-2 d-block">
            <DrawerTitle>
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
        <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'}/>}
            </DrawerTitle>
          </a>
        </Link>
        {websiteSlogan && <DrawerSubtitle>{websiteSlogan}</DrawerSubtitle>}
      </DrawerHeader>
      <DrawerContent>
        {DrawerContentList(content)}
      </DrawerContent>
    </Drawer>);
};
export default MwcDrawer;
