import SbEditable from 'storyblok-react';
import Components from '@components';
import clsx from 'clsx';
import React from 'react';
const ButtonList = ({ content }) => {
    const body = content.body || [];
    const properties = content.property || [];
    const classNames = clsx('d-flex', content.class_names && content.class_names.values, {
        'lm-button-list__margin-left': properties.includes('margin_left')
    });
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: classNames }, body.map(i => Components(i)))));
};
export default ButtonList;
