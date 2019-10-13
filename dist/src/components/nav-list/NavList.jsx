import SbEditable from 'storyblok-react';
import * as React from 'react';
import { memo } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import NavListItem from './NavListItem';
import clsx from 'clsx';
var NavList = function (_a) {
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var body = content && content.body || [];
    if (dimensions.isMobile && content.collapse_on_mobile) {
        var metaIcon = content.collapse_icon && content.collapse_icon.name || 'chevron_right';
        return (<SbEditable content={content}>
        <CollapsibleList handle={<SimpleListItem text={content.header} metaIcon={metaIcon}/>}>
          {body.map(function (blok) { return <NavListItem {...blok} key={blok._uid}/>; })}
        </CollapsibleList>
      </SbEditable>);
    }
    var properties = content.properties || [];
    var header = content.header;
    var navClassNames = clsx(content.style, 'nav', properties);
    return (<SbEditable content={content}>
      {header && <h4 className="nav-list__header">{header}</h4>}
      <nav className={navClassNames}>
        {body.map(function (blok) { return <NavListItem {...blok} key={blok._uid}/>; })}
      </nav>
    </SbEditable>);
};
export default memo(NavList);
