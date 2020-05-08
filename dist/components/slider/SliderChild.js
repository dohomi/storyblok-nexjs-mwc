import React from 'react';
import Components from '@components';
const SliderChild = ({ body, sectionVariant }) => {
    return (React.createElement("div", { className: "d-flex h-100 lm-slider__container flex-row justify-content-center" }, body.map(item => {
        if (item.component === 'section') {
            let newOpts = Object.assign(Object.assign({}, item), { presetVariant: sectionVariant || 'transparent' });
            return Components(newOpts);
        }
        return React.createElement("div", { key: `child_${item._uid}`, className: "flex-grow-1" }, Components(item));
    })));
};
export default SliderChild;
