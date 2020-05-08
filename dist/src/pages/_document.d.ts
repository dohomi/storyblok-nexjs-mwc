/// <reference types="react" />
import Document, { DocumentContext } from 'next/document';
declare class MyDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<{
        isProduction: boolean;
        styles: {}[];
        html: string;
        head?: (JSX.Element | null)[] | undefined;
    }>;
    setGoogleGTag(): {
        __html: string;
    };
    render(): JSX.Element;
}
export default MyDocument;
