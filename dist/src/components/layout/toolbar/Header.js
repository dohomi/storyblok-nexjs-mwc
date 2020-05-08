import * as React from 'react';
import { memo } from 'react';
import HeaderCustom from './HeaderCustom';
import HeaderSimple from './HeaderSimple';
const Header = ({ settings }) => {
    if (settings.multi_toolbar && settings.multi_toolbar.length) {
        return React.createElement(HeaderCustom, { settings: settings });
    }
    return React.createElement(HeaderSimple, { settings: settings });
};
export default memo(Header);
