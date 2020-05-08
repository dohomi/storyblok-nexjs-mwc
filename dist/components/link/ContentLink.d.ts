import { FunctionComponent } from 'react';
import { ButtonStoryblok, CardListItemStoryblok, ImageListItemStoryblok, LinkStoryblok, NavItemStoryblok, TimelineItemStoryblok } from '../../typings/generated/components-schema';
declare const ContentLink: FunctionComponent<{
    className: string;
    content: ButtonStoryblok | CardListItemStoryblok | LinkStoryblok | NavItemStoryblok | TimelineItemStoryblok | ImageListItemStoryblok;
    passHref?: boolean;
    isMuiLink?: boolean;
}>;
export default ContentLink;
