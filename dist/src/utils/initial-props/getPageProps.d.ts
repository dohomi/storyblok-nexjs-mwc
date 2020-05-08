import { AppPageProps } from '../../typings/app';
declare const getPageProps: (slug: string | string[], ssrHostname?: string | undefined) => Promise<AppPageProps>;
export default getPageProps;
