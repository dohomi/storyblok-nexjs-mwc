import React from 'react';
import MwcComponents from '../src/components/all_components';
// merge all potential components of storyblok. setup components alias in Webpack
let Components = Object.assign({}, MwcComponents);
export default (blok) => {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { key: blok._uid, content: blok });
    }
    return React.createElement(() => (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")), { key: blok._uid });
};
