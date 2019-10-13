import Components from 'components';
import SbEditable from 'storyblok-react';
var Footer = function (_a) {
    var settings = _a.settings;
    var content = settings && settings.footer || [];
    return (<SbEditable content={settings}>
      <footer>
        {content.map(function (blok) { return Components(blok); })}
      </footer>
    </SbEditable>);
};
export default Footer;
