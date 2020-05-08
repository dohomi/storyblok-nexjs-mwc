import React, { FunctionComponent } from 'react';
export declare type WithWindowDimensionsProps = {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};
export declare const WindowDimensionsCtx: React.Context<WithWindowDimensionsProps>;
declare const WindowDimensionsProvider: FunctionComponent;
export default WindowDimensionsProvider;
export declare const useWindowDimensions: () => WithWindowDimensionsProps;
