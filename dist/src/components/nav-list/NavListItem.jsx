var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { linkHandler } from '../../utils/linkHandler';
import { Link } from 'routes';
import SbEditable from 'storyblok-react';
var NavListItem = function (props) {
    var content = __assign({}, props);
    linkHandler(content, props.link || {}, { openExternal: !!props.open_external });
    return (<SbEditable content={content}>
      {content.to ? (<Link to={content.to}><a className="nav-link">{content.name}</a></Link>) : (<a href={content.href} className="nav-link">{content.name}</a>)}
    </SbEditable>);
};
export default NavListItem;
