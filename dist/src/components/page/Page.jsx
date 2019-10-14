// @ts-ignore
import Components from 'components';
import SbEditable from 'storyblok-react';
import { ParallaxProvider } from 'react-scroll-parallax';
var Page = function (props) {
    var content = props.content;
    var body = content.body || [];
    if (!body.length) {
        return <div>There is no content yet...</div>;
    }
    return (<SbEditable content={content}>
      <ParallaxProvider>
        {body.map(function (blok) {
        return Components(blok);
    })}
      </ParallaxProvider>
    </SbEditable>);
};
export default Page;
