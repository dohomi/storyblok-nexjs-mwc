import LinkItem from './LinkItem';
import { SimpleListItem } from '@rmwc/list';
import * as React from 'react';
var DrawerButton = function (props) {
    var buttonProps = {
        text: props.label || props.name,
        graphic: props.icon && props.icon.name
    };
    return (<LinkItem {...props}>
      <SimpleListItem {...buttonProps}/>
    </LinkItem>);
};
export default DrawerButton;
