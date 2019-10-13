import SbEditable from 'storyblok-react';
import React from 'react';
import Image from '../image/Image';
import PromotionItem from './PromotionItem';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var Promotion = function (_a) {
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var image = content.image && content.image[0];
    var body = content.body || [];
    return (<SbEditable content={content}>
      <div className="lm-promotion">
        <Image content={image}/>
        {body.map(function (blok) { return <PromotionItem {...blok} dimensions={dimensions} key={blok._uid}/>; })}
      </div>
    </SbEditable>);
};
export default Promotion;
