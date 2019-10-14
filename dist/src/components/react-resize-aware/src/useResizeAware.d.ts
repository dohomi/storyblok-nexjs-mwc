declare const defaultReporter: (target?: HTMLElement | undefined) => {
    width: number | null;
    height: number | null;
};
export default function useResizeAware(reporter?: typeof defaultReporter): any[];
export {};
