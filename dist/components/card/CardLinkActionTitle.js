import Typography from '@material-ui/core/Typography';
import React from 'react';
import clsx from 'clsx';
import { mapTypographyVariant } from '../../utils/muiMapProps';
var CardListActionTitles = function (_a) {
    var content = _a.content, options = _a.options;
    return (React.createElement(React.Fragment, null,
        content.title && React.createElement(Typography, { component: options.title_tag || 'h3', className: clsx(options.title_class_name && options.title_class_name.values), variant: mapTypographyVariant[options.title_typography ? options.title_typography : 'headline6'] }, content.title),
        content.subtitle && React.createElement(Typography, { component: options.subtitle_tag || 'h4', className: clsx(options.subtitle_class_name && options.subtitle_class_name.values), variant: mapTypographyVariant[options.subtitle_typography ? options.subtitle_typography : 'subtitle2'] }, content.subtitle)));
};
export default CardListActionTitles;
