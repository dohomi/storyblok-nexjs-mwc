import SbEditable from 'storyblok-react';
import * as React from 'react';
import Components from '@components';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
var FlexRow = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { container: true, direction: content.column ? 'column' : 'row', justify: content.justify ? content.justify : undefined, alignItems: content.align_items ? content.align_items : undefined, alignContent: content.align_content ? content.align_content : undefined, className: clsx(content.class_names && content.class_names.values, {
                'mh-100': content.full_height
            }) }, body.map(function (item) { return Components(item); }))));
};
export default FlexRow;
