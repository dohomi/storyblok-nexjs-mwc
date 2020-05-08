/// <reference types="react" />
/// <reference types="next" />
declare const Components: {
    page: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").PageStoryblok;
    }>;
    table: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").TableStoryblok;
    }>;
    accordion: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").AccordionStoryblok;
    }>;
    static_section: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").StaticSectionStoryblok;
    }>;
    static_container: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").StaticContainerStoryblok;
    }>;
    divider: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").DividerStoryblok;
    }>;
    html: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HtmlStoryblok;
    }>;
    hubspot_meeting: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HubspotMeetingStoryblok;
        disableEmbed?: boolean | undefined;
    }>;
    button_list: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ButtonListStoryblok;
    }>;
    section: import("react").FunctionComponent<{
        content: import("./section/Section").SectionProps;
    }>;
    headline: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HeadlineStoryblok;
    }>;
    paragraph: import("react").ComponentType<{
        content: import("../typings/generated/components-schema").ParagraphStoryblok;
    }>;
    row: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").RowStoryblok;
    }>;
    column: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ColumnStoryblok;
    }>;
    image: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ImageStoryblok;
    }>;
    image_list: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ImageListStoryblok;
    }>;
    button: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ButtonStoryblok;
    }>;
    nav_list: import("react").NamedExoticComponent<{
        content: import("../typings/generated/components-schema").NavListStoryblok;
    }>;
    nav_menu: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").NavMenuStoryblok;
    }>;
    icon: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").IconStoryblok;
    }>;
    iframe: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").IframeStoryblok;
    }>;
    slider: import("react").NamedExoticComponent<{
        content: import("../typings/generated/components-schema").SliderStoryblok;
    }>;
    section_video_bg: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").SectionVideoBgStoryblok;
    }>;
    card_list: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").CardListStoryblok;
    }>;
    section_parallax: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").SectionParallaxStoryblok;
    }>;
    tabs: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").TabsStoryblok;
    }>;
    list_widget: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ListWidgetStoryblok;
    }>;
    flex_row: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").FlexRowStoryblok;
    }>;
    iframe_advanced: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").IframeAdvancedStoryblok;
    }>;
    category_box: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").CategoryBoxStoryblok;
    }>;
    list_search_field: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ListSearchFieldStoryblok;
    }>;
    link: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").LinkStoryblok;
    }>;
    list_search_autocomplete: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ListSearchAutocompleteStoryblok;
    }>;
    rich_text_editor: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").RichTextEditorStoryblok;
    }>;
    timeline: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").TimelineStoryblok;
    }>;
    avatar: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").AvatarStoryblok;
    }>;
    date_headline: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").DateHeadlineStoryblok;
    }>;
    motion: import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").MotionStoryblok;
    }>;
};
export default Components;
