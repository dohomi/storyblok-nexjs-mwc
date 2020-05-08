import React from 'react';
import SbEditable from 'storyblok-react';
import BackgroundImage from './BackgroundImage';
import Components from '@components';
import Grid from '@material-ui/core/Grid';
import BackgroundElements from './BackgroundElements';
import useBackgroundBox from './useBackgroundBox';
var xsSpanMap = {
    1: 3,
    2: 6,
    3: 9,
    4: 12,
    'false': false,
    'auto': 'auto',
    'true': true
};
var smSpanMap = {
    1: 1,
    2: 2,
    3: 4,
    4: 6,
    5: 7,
    6: 9,
    7: 11,
    8: 12,
    'false': false,
    'auto': 'auto',
    'true': true
};
var mdSpanMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    'false': false,
    'auto': 'auto',
    'true': true
};
var GridColumn = function (_a) {
    var content = _a.content;
    // const classes = useStyles(content)
    var background = (Array.isArray(content.background) && content.background[0]) || undefined;
    var _b = useBackgroundBox({ background: background }), className = _b.className, style = _b.style;
    var mdWidth = mdSpanMap[content.width_general];
    var smWidth = smSpanMap[content.width_tablet];
    if (!smWidth && mdWidth) {
        smWidth = mdWidth;
        if (typeof mdWidth === 'number' && mdWidth > 8) {
            smWidth = 12;
        }
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { item: true, xs: content.width_phone ? xsSpanMap[content.width_phone] : 12, sm: smWidth, md: mdWidth, className: className, style: style },
            (background === null || background === void 0 ? void 0 : background.image) && React.createElement(BackgroundImage, { content: background }),
            (background === null || background === void 0 ? void 0 : background.background_elements) && background.background_elements.length > 0 &&
                React.createElement(BackgroundElements, { elements: background.background_elements }),
            (content.justify || content.align_content || content.align_items) ? (React.createElement(Grid, { container: true, direction: 'column', className: 'mh-100', justify: content.justify ? content.justify : undefined, alignItems: content.align_items ? content.align_items : undefined, alignContent: content.align_content ? content.align_content : undefined }, content.body && content.body.map(function (blok) { return Components(blok); }))) : content.body && content.body.map(function (blok) { return Components(blok); }))));
};
export default GridColumn;
