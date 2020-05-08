import { useScrollTrigger } from '@material-ui/core';
import { useDebounce } from 'use-debounce';
export default function useScrollTop() {
    var scrolledWithoutHysteresis = useScrollTrigger({ disableHysteresis: true });
    var value = useDebounce(scrolledWithoutHysteresis, 100)[0];
    return value;
}
