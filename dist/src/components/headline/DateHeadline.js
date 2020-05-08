import { default as React } from 'react';
import Headline from './Headline';
const DateHeadline = ({ content }) => {
    var _a, _b;
    const modifContent = Object.assign(Object.assign({}, content), { text: (_a = content.text) === null || _a === void 0 ? void 0 : _a.replace('{date}', `${new Date().getFullYear()}`), text_xs: (_b = content.text_xs) === null || _b === void 0 ? void 0 : _b.replace('{date}', `${new Date().getFullYear()}`) });
    return (React.createElement(Headline, { content: modifContent }));
};
export default DateHeadline;
