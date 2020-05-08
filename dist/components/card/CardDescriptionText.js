import { default as React } from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { mapTypographyVariant } from '../../utils/muiMapProps';
var CardDescriptionText = function (_a) {
    var content = _a.content, options = _a.options;
    var description = content.description;
    var descriptionMaxCharacter = options.description_max_character;
    if (!description || descriptionMaxCharacter === 0) {
        return null;
    }
    if (descriptionMaxCharacter && description.length > descriptionMaxCharacter) {
        description = description.substr(0, descriptionMaxCharacter) + '..';
    }
    return React.createElement(Typography, { component: "p", variant: mapTypographyVariant[options.description_typography || 'body1'], className: clsx(options.description_class_name && options.description_class_name.values) }, description);
};
export default CardDescriptionText;
