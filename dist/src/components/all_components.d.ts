/// <reference types="react" />
/// <reference types="next" />
/// <reference types="@emotion/core" />
declare const Components: {
    'page': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").PageStoryblok;
    }>;
    'table': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").TableStoryblok;
    }>;
    'accordion': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").AccordionStoryblok;
    }>;
    'promotion': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").PromotionStoryblok;
    }>;
    'divider': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").DividerStoryblok;
    }>;
    'html': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HtmlStoryblok;
    }>;
    'pricing': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").PricingStoryblok;
    }>;
    'hubspot_form': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HubspotFormStoryblok;
    }>;
    'hubspot_meeting': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HubspotMeetingStoryblok;
        disableEmbed?: boolean | undefined;
    }>;
    'button_list': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ButtonListStoryblok;
    }>;
    'section': import("react").FunctionComponent<{
        content: import("./section/Section").SectionProps;
    }>;
    'headline': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").HeadlineStoryblok;
    }>;
    'paragraph': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ParagraphStoryblok;
    }>;
    'row': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").RowStoryblok;
    }>;
    'column': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ColumnStoryblok;
    }>;
    'image': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ImageStoryblok;
    }>;
    'image_list': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ImageListStoryblok;
    }>;
    'button': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").ButtonStoryblok;
    }>;
    'nav_list': import("react").NamedExoticComponent<{
        content: import("../typings/generated/components-schema").NavListStoryblok;
    }>;
    'row_nested': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").RowNestedStoryblok;
    }>;
    'nav_menu': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").NavMenuStoryblok;
    }>;
    'icon': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").IconStoryblok;
    }>;
    'iframe': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").IframeStoryblok;
    }>;
    'slider': import("react").NamedExoticComponent<{
        content: import("../typings/generated/components-schema").SliderStoryblok;
    }>;
    'section_video_bg': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").SectionVideoBgStoryblok;
    }>;
    'card_list': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").CardListStoryblok;
    }>;
    'section_parallax': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").SectionParallaxStoryblok;
    }>;
    'form': import("react").FunctionComponent<{
        content: import("../typings/generated/components-schema").FormStoryblok;
        customData?: any;
    }>;
};
export default Components;
