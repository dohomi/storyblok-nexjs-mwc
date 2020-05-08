import SbEditable from 'storyblok-react';
import Drawer from '@material-ui/core/Drawer';
import Components from '@components';
import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) { return ({
    drawerContent: {
        padding: theme.spacing(3),
        minWidth: '30%'
    }
}); });
var CardWrapWithAction = function (_a) {
    var content = _a.content, className = _a.className, style = _a.style, children = _a.children, options = _a.options;
    var classes = useStyles();
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var body = content.body || [];
    var variants = options.variant || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Card, { className: className, raised: variants.includes('raised'), elevation: options.elevation ? Number(options.elevation) : undefined, style: style },
            React.createElement("a", { onClick: function () { return setOpen(!open); } }, children)),
        React.createElement(Drawer, { open: open, anchor: "right", onClose: function () { return setOpen(false); } },
            React.createElement("div", { className: classes.drawerContent }, body.map(function (blok) { return Components(blok); })))));
};
export default CardWrapWithAction;
