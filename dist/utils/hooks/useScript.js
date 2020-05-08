// Hook
import { useEffect, useState } from 'react';
var cachedScripts = [];
export function useScript(src) {
    // Keeping track of script loaded and error state
    var _a = useState({
        loaded: false,
        error: false
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        // If cachedScripts array already includes src that means another instance ...
        // ... of this hook already loaded this script, so no need to load again.
        if (!src) {
            return;
        }
        if (cachedScripts.includes(src)) {
            setState({
                loaded: true,
                error: false
            });
            return;
        }
        else {
            cachedScripts.push(src);
            // Create script
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            script_1.setAttribute('crossorigin', '*');
            // Script event listener callbacks for load and error
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false
                });
            };
            var onScriptError_1 = function () {
                // Remove from cachedScripts we can try loading again
                var index = cachedScripts.indexOf(src);
                if (index >= 0)
                    cachedScripts.splice(index, 1);
                script_1.remove();
                setState({
                    loaded: true,
                    error: true
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            // Add script to document body
            document.body.appendChild(script_1);
            // Remove event listeners on cleanup
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, [src] // Only re-run effect if script src changes
    );
    return { loaded: state.loaded, error: state.error };
}
