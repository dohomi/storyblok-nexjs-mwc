import { NextPage } from 'next';
import { GlobalStoryblok, PageStoryblok } from '../typings/generated/components-schema';
declare type ErrorComponentProps = {
    statusCode: number;
    page?: PageStoryblok;
    settings?: GlobalStoryblok;
};
declare const Error: NextPage<ErrorComponentProps>;
export default Error;
