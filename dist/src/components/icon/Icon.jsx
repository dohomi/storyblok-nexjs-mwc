import SbEditable from 'storyblok-react';
import React from 'react';
import clsx from 'clsx';
var IconMwc = function (_a) {
    var _b;
    var content = _a.content;
    var iconName = content.name && content.name.name;
    var iconClasses = clsx('material-icons', 'rmwc-icon', (_b = {}, _b['rmwc-icon--size-' + content.size] = !!content.size, _b));
    var containerClasses = clsx(content.class_names && content.class_names.values);
    return (<SbEditable content={content}>
      <div className={containerClasses}>
        <i className={iconClasses}>{iconName}</i>
      </div>
    </SbEditable>);
};
export default IconMwc;
