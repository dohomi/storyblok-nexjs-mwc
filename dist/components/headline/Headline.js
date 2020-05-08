import SbEditable from 'storyblok-react';
import React from 'react';
import clsx from 'clsx';
import { componentLogger } from '../../utils/componentLogger';
import Typography from '@material-ui/core/Typography';
import { mapTypographyVariant } from '../../utils/muiMapProps';
var Headline = function (_a) {
    var _b;
    var content = _a.content;
    componentLogger(content);
    var component = content.tag ? content.tag : undefined;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Typography, { className: clsx(content.style, content.style_props, content.class_names && content.class_names.values, (_b = {},
                _b["lm-font-" + content.font] = content.font,
                _b)), component: component, align: content.align ? content.align : undefined, color: content.color ? content.color : undefined, style: {
                color: content.custom_color && content.custom_color.rgba ? content.custom_color.rgba : undefined,
                lineHeight: content.line_height ? content.line_height : undefined,
                fontSize: content.font_size ? content.font_size : undefined,
                letterSpacing: content.letter_spacing ? content.letter_spacing : undefined
            }, variant: mapTypographyVariant[content.typography ? content.typography : 'headline4'] },
            !!content.text_xs && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "d-none d-sm-block" }, content.text),
                React.createElement("span", { className: "d-block d-sm-none" }, content.text_xs))),
            React.createElement(React.Fragment, null),
            !content.text_xs && content.text)));
};
export default Headline;
