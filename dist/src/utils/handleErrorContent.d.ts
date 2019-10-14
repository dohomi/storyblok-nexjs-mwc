import { AppPageProps } from './parsePageProperties';
import { NextApiResponse } from 'next';
declare const handleErrorContent: (e: any, res: NextApiResponse<any>, languagePrefix?: string) => Promise<AppPageProps>;
export default handleErrorContent;
