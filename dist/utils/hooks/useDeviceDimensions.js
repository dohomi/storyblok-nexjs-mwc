import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
export default function useDeviceDimensions() {
    var theme = useTheme();
    var isMobile = useMediaQuery(theme.breakpoints.only('xs'));
    return { isMobile: isMobile };
}
