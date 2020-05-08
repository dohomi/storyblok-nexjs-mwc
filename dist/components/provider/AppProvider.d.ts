import { FunctionComponent } from 'react';
import { AppApiRequestPayload } from '../../typings/app';
export declare type AppContextProps = Omit<AppApiRequestPayload, 'locale' | 'settings' | 'page' | 'allStories'> & {
    [k: string]: any;
};
declare const AppProvider: FunctionComponent<{
    content: AppContextProps;
}>;
export declare const useAppContext: () => AppContextProps;
export default AppProvider;
