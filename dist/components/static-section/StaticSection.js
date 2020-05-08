import Components from '@components';
import React from 'react';
import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import { useAppContext } from '../provider/AppProvider';
const StaticSection = ({ content }) => {
    if (!content.container) {
        return null;
    }
    const { allStaticContent } = useAppContext();
    const containerContent = allStaticContent.find((item) => item.uuid === content.container);
    const body = (containerContent && containerContent.content && containerContent.content.body) || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(content.class_names && content.class_names.values) }, body.map((blok) => Components(blok)))));
};
export default StaticSection;
