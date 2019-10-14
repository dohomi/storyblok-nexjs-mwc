import * as React from 'react';
import HeaderCustom from './HeaderCustom';
import HeaderSimple from './HeaderSimple';
var Header = function (props) {
    if (props.settings.multi_toolbar && props.settings.multi_toolbar.length) {
        return <HeaderCustom {...props}/>;
    }
    return <HeaderSimple {...props}/>;
};
export default Header;
