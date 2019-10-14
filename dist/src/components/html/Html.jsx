import SbEditable from 'storyblok-react';
var Html = function (_a) {
    var content = _a.content;
    return (<SbEditable content={content}>
      <div dangerouslySetInnerHTML={{ __html: content.body }}/>
    </SbEditable>);
};
export default Html;
