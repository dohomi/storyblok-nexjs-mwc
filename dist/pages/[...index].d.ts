/// <reference types="node" />
import Index from '../components/pages/Index';
export declare const getStaticProps: import("next").GetStaticProps<{
    [key: string]: any;
}, import("querystring").ParsedUrlQuery>;
export declare const getStaticPaths: import("next").GetStaticPaths<import("querystring").ParsedUrlQuery>;
export default Index;
