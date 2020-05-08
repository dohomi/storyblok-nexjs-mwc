import Components from '@components';
import React from 'react';
import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import { useAppContext } from '../provider/AppProvider';
var StaticSection = function (_a) {
    var content = _a.content;
    if (!content.container) {
        return null;
    }
    var allStaticContent = useAppContext().allStaticContent;
    var containerContent = allStaticContent.find(function (item) { return item.uuid === content.container; });
    var body = (containerContent && containerContent.content && containerContent.content.body) || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(content.class_names && content.class_names.values) }, body.map(function (blok) { return Components(blok); }))));
};
export default StaticSection;
