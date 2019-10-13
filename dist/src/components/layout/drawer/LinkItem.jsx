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
import { linkHandler } from '../../../utils/linkHandler';
import { Link } from 'routes';
var LinkItem = function (props) {
    var content = __assign({}, props);
    linkHandler(content, content.link || {}, { openExternal: !!props.open_external });
    return content.to ? (<Link to={content.to}><a>{props.children}</a></Link>) : (<a href={content.href}>{props.children}</a>);
};
export default LinkItem;
