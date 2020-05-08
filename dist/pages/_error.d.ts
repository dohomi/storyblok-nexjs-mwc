import { NextPage } from 'next';
import { AppPageProps } from '../typings/app';
declare type ErrorComponentProps = {
    statusCode: number;
    page?: AppPageProps['page'];
    settings: AppPageProps['settings'];
};
declare const Error: NextPage<ErrorComponentProps>;
export default Error;
