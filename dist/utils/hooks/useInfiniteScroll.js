import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
export function useInfiniteScroll(collection, perPage) {
    if (perPage === void 0) { perPage = 30; }
    var _a = useState(1), page = _a[0], setPage = _a[1];
    var _b = useInView({ triggerOnce: true }), useRef = _b[0], inView = _b[1];
    var offset = (page - 1) * perPage;
    useEffect(function () {
        if (inView) {
            setPage(page + 1);
        }
    }, [inView]);
    return {
        ref: useRef,
        data: collection.slice(0, offset + perPage),
        hasMore: Math.ceil(collection.length / perPage) > page
    };
}
