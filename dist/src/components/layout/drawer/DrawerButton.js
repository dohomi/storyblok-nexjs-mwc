import * as React from 'react';
import ContentLink from '../../link/ContentLink';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LmIcon from '../../icon/LmIcon';
const DrawerButton = (props) => {
    var _a;
    const { content } = props;
    const buttonProps = {
        text: content.label || content.name,
        graphic: (_a = content.icon) === null || _a === void 0 ? void 0 : _a.name
    };
    return (React.createElement(ContentLink, { content: content, className: "lm-drawer__link", passHref: true },
        React.createElement(ListItem, { button: true },
            buttonProps.graphic && (React.createElement(ListItemIcon, null,
                React.createElement(LmIcon, { iconName: buttonProps.graphic, style: {
                        width: '1.5rem',
                        height: '1.5rem'
                    } }))),
            React.createElement(ListItemText, { primary: buttonProps.text }))));
};
export default DrawerButton;
