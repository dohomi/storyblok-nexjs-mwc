/// <reference types="react" />
/// <reference types="next" />
/// <reference types="@emotion/core" />
import Document, { DocumentContext } from 'next/document';
declare class MyDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<{
        html: string;
        head?: (JSX.Element | null)[] | undefined;
        dataOnly?: true | undefined;
        styles?: {} | import("react").ReactNodeArray | import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>[] | undefined;
    }>;
    render(): JSX.Element;
}
export default MyDocument;
