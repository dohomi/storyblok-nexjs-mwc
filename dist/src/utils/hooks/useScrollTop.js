import { useScrollTrigger } from '@material-ui/core';
import { useDebounce } from 'use-debounce';
export default function useScrollTop() {
    const scrolledWithoutHysteresis = useScrollTrigger({ disableHysteresis: true });
    const [value] = useDebounce(scrolledWithoutHysteresis, 100);
    return value;
}
