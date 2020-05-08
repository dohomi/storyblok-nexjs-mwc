import { useEffect, useState } from 'react';
import { CONFIG } from '../../utils/config';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import StoryblokService from '../../utils/StoryblokService';
import { useScript } from '../../utils/hooks/useScript';
var ExternalScripts = function (_a) {
    var settings = _a.settings;
    var insideStoryblok = StoryblokService.insideVisualComposer();
    var tawkToId = CONFIG.TAWKTO || settings.tawkto;
    var scrolled = useScrollTrigger({ disableHysteresis: true });
    var _b = useState(false), isScrolled = _b[0], setIsScrolled = _b[1];
    useEffect(function () {
        if (scrolled) {
            setIsScrolled(true);
        }
    }, [scrolled]);
    var tawkToScriptName = !insideStoryblok && tawkToId && isScrolled ? 'https://embed.tawk.to/' + tawkToId + '/default' : '';
    var tawkToScript = useScript(tawkToScriptName);
    if (tawkToScriptName && tawkToScript.error) {
        console.error('Tawkto script could not load');
    }
    return null;
};
export default ExternalScripts;
