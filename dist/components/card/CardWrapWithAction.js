import SbEditable from 'storyblok-react';
import Drawer from '@material-ui/core/Drawer';
import Components from '@components';
import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    drawerContent: {
        padding: theme.spacing(3),
        minWidth: '30%'
    }
}));
const CardWrapWithAction = ({ content, className, style, children, options }) => {
    const classes = useStyles();
    let [open, setOpen] = React.useState(false);
    const body = content.body || [];
    const variants = options.variant || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Card, { className: className, raised: variants.includes('raised'), elevation: options.elevation ? Number(options.elevation) : undefined, style: style },
            React.createElement("a", { onClick: () => setOpen(!open) }, children)),
        React.createElement(Drawer, { open: open, anchor: "right", onClose: () => setOpen(false) },
            React.createElement("div", { className: classes.drawerContent }, body.map(blok => Components(blok))))));
};
export default CardWrapWithAction;
