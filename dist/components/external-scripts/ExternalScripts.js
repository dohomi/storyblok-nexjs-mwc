import { useEffect, useState } from 'react';
import { CONFIG } from '../../utils/config';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import StoryblokService from '../../utils/StoryblokService';
import { useScript } from '../../utils/hooks/useScript';
const ExternalScripts = ({ settings }) => {
    const insideStoryblok = StoryblokService.insideVisualComposer();
    const tawkToId = CONFIG.TAWKTO || settings.tawkto;
    const scrolled = useScrollTrigger({ disableHysteresis: true });
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        if (scrolled) {
            setIsScrolled(true);
        }
    }, [scrolled]);
    const tawkToScriptName = !insideStoryblok && tawkToId && isScrolled ? 'https://embed.tawk.to/' + tawkToId + '/default' : '';
    const tawkToScript = useScript(tawkToScriptName);
    if (tawkToScriptName && tawkToScript.error) {
        console.error('Tawkto script could not load');
    }
    return null;
};
export default ExternalScripts;
