import { FunctionComponent } from 'react';
import { GlobalStoryblok } from '../../typings/generated/components-schema';
import { PageSeoProps } from '@initialData/getInitialPageProps';
declare const Head: FunctionComponent<{
    settings: GlobalStoryblok;
    pageSeo: PageSeoProps;
}>;
export default Head;
