import * as React from 'react';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import SbEditable from 'storyblok-react';
import { Link } from 'routes';
import { componentLogger } from '../../utils/componentLogger';
import { linkHandler } from '../../utils/linkHandler';
import CustomMenu from './CustomMenu';
var Child = function (nestedProps) {
    var props = {};
    var link = nestedProps.link || {};
    linkHandler(props, link, { openExternal: !!nestedProps.open_external });
    return props.to ? (<Link to={props.to}><a>{nestedProps.label}</a></Link>) : (<a href={props.href}>{nestedProps.label}</a>);
};
var MtMenu = function (_a) {
    var content = _a.content;
    componentLogger(content);
    var menuItems = content.body || [];
    var isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item';
    if (isCustom) {
        return <CustomMenu content={content}/>;
    }
    var borderRadius = typeof content.border_radius === 'number' ? content.border_radius : 4;
    return (<SbEditable content={content}>
      {
    // @ts-ignore
    <SimpleMenu style={{ borderRadius: borderRadius + "px" }} handle={<Button trailingIcon="expand_more">{content.title}</Button>}>
          {menuItems.map(function (nestedProps) { return (<MenuItem key={nestedProps._uid}>
              {Child(nestedProps)}
            </MenuItem>); })}
        </SimpleMenu>}
    </SbEditable>);
};
export default MtMenu;
