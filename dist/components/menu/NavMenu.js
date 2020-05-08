import * as React from 'react';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SbEditable from 'storyblok-react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Components from '@components';
import MenuItem from '@material-ui/core/MenuItem';
import ContentLink from '../link/ContentLink';
import LmIcon from '../icon/LmIcon';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import { useRouter } from 'next/router';
const useStyles = makeStyles({
    paper: (props) => ({
        borderRadius: props.border_radius
    })
});
const NavMenu = ({ content }) => {
    var _a;
    const classes = useStyles(content);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuItems = content.body || [];
    const isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item';
    const router = useRouter();
    const asPath = router === null || router === void 0 ? void 0 : router.asPath;
    useEffect(() => {
        handleClose();
    }, [asPath]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let addons = {};
    if (content.alignment === 'bottomStart') {
        addons = {
            getContentAnchorEl: null,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }
        };
    }
    else if (content.alignment === 'bottomEnd') {
        addons = {
            getContentAnchorEl: null,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        };
    }
    const ExpandIcon = (content.icon && content.icon.name) ? React.createElement(LmIcon, { iconName: content.icon.name }) : React.createElement(ChevronDown, null);
    const CloseIcon = (content.icon_collapse && content.icon_collapse.name) ?
        React.createElement(LmIcon, { iconName: content.icon_collapse.name }) : React.createElement(ChevronUp, null);
    // const StartIcon = content.start_icon?.name ? <LmIcon iconName={content.start_icon.name} /> : null
    return (React.createElement(SbEditable, { content: content },
        React.createElement(React.Fragment, null,
            React.createElement(Button, { endIcon: Boolean(anchorEl) ? CloseIcon : ExpandIcon, startIcon: ((_a = content.start_icon) === null || _a === void 0 ? void 0 : _a.name) && React.createElement(LmIcon, { iconName: content.start_icon.name }), "aria-controls": "simple-menu", "aria-haspopup": "true", className: "lm-default-color", onClick: handleClick }, content.title),
            React.createElement(Menu, Object.assign({ open: Boolean(anchorEl), onClose: handleClose, anchorEl: anchorEl, classes: {
                    paper: classes.paper
                } }, addons),
                isCustom && menuItems.map(blok => Components(blok)),
                !isCustom && (React.createElement("div", null, menuItems.map(nestedProps => (React.createElement(ContentLink, { key: nestedProps._uid, className: 'lm-nav-men__link', content: nestedProps },
                    React.createElement(MenuItem, null, nestedProps.label))))))))));
};
export default NavMenu;
