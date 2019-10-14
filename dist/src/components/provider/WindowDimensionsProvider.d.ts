import React from 'react';
export declare type WithWindowDimensionsProps = {
    width: number;
    height: number;
    isMobile: boolean;
};
export declare const WindowDimensionsCtx: React.Context<WithWindowDimensionsProps>;
declare const WindowDimensionsProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export default WindowDimensionsProvider;
export declare const useWindowDimensions: () => WithWindowDimensionsProps;
