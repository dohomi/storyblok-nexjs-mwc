import * as React from 'react';
import { memo } from 'react';
import HeaderCustom from './HeaderCustom';
import HeaderSimple from './HeaderSimple';
var Header = function (_a) {
    var settings = _a.settings;
    if (settings.multi_toolbar && settings.multi_toolbar.length) {
        return React.createElement(HeaderCustom, { settings: settings });
    }
    return React.createElement(HeaderSimple, { settings: settings });
};
export default memo(Header);
