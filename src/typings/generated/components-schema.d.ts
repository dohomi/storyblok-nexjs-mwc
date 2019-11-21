export interface AccordionStoryblok {
  body?: any[];
  _uid: string;
  component: "accordion";
  [k: string]: any;
}

export interface AccordionItemStoryblok {
  title?: string;
  body?: any[];
  _uid: string;
  component: "accordion_item";
  [k: string]: any;
}

export interface BackgroundStoryblok {
  classNames?: {
    values?: string[];
    [k: string]: any;
  };
  image?: string;
  property?: "disable_lazy_load"[];
  image_focal_point?: string;
  background_color?: {
    rgba?: string;
    [k: string]: any;
  };
  elevation?: number;
  border_size?: number;
  border_style?: "solid" | "dashed" | "dotted";
  border_color?: {
    rgba?: string;
    [k: string]: any;
  };
  border_radius?: string;
  background_elements?: any[];
  _uid: string;
  component: "background";
  [k: string]: any;
}

export interface BackgroundElementItemStoryblok {
  url?: string;
  size?: "contain" | "cover";
  size_fixed?: string;
  repeat?: "repeat" | "repeat-x" | "repeat-y" | "round" | "space";
  position_horizontal?: "left" | "center" | "right";
  position_vertical?: "top" | "center" | "bottom";
  _uid: string;
  component: "background_element_item";
  [k: string]: any;
}

export interface BookingStoryblok {
  booking?: string;
  _uid: string;
  component: "booking";
  [k: string]: any;
}

export interface BookingFormStoryblok {
  _uid: string;
  component: "Booking Form";
  [k: string]: any;
}

export interface ButtonStoryblok {
  label?: string;
  image?: string;
  icon?: {
    name?: string;
    [k: string]: any;
  };
  link?: {
    cached_url?: string;
    linktype?: string;
    [k: string]: any;
  };
  open_external?: boolean;
  size?: "dense" | "lm-button-large" | "lm-button-xlarge";
  color?: "primary" | "secondary" | "primary_text" | "secondary_text" | "light" | "dark";
  variant?: "outlined" | "raised" | "unelevated" | "fab";
  corners?: "lm-button-shaped" | "lm-button-square";
  properties?: ("disable-ripple" | "disable-shadow")[];
  font?: "alt1" | "alt2" | "alt3" | "alt4";
  trailing_icon?: {
    name?: string;
    [k: string]: any;
  };
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "button";
  [k: string]: any;
}

export interface ButtonListStoryblok {
  body?: any[];
  property?: ("margin_left" | "align_right")[];
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "button_list";
  [k: string]: any;
}

export interface CardListStoryblok {
  body?: any[];
  variant?: (
    | "over_media"
    | "title_top"
    | "font_white"
    | "raised"
    | "header_top"
    | "text_top_bottom"
    | "text_bottom"
    | "text_center"
    | "text_align_center"
    | "text_align_right"
  )[];
  hide_image?: boolean;
  image_ratio?: "16x9" | "1x1" | "4x3" | "3x2";
  image_size?: "cover" | "contain" | "initial" | "auto";
  elevation?: "0" | "1" | "2" | "4" | "8" | "12" | "16" | "20" | "3" | "5" | "6" | "24" | "22";
  border_radius?: "0" | "2" | "4" | "";
  description_max_character?: number;
  column_count?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  column_count_tablet?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  column_count_phone?: "1" | "2" | "3" | "4";
  column_gap?: "0" | "2" | "4" | "8" | "16" | "24" | "32";
  title_typography?:
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "body1"
    | "body2"
    | "overline"
    | "";
  title_tag?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  title_class_name?: {
    values?: string[];
    [k: string]: any;
  };
  subtitle_typography?:
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "";
  subtitle_tag?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  subtitle_class_name?: {
    values?: string[];
    [k: string]: any;
  };
  description_typography?: "headline4" | "headline5" | "headline6" | "body1" | "body2" | "caption" | "overline";
  description_class_name?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "card_list";
  [k: string]: any;
}

export interface CardListItemStoryblok {
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  link?: {
    cached_url?: string;
    linktype?: string;
    [k: string]: any;
  };
  open_external?: boolean;
  body?: any[];
  _uid: string;
  component: "card_list_item";
  [k: string]: any;
}

export interface CategoryStoryblok {
  tag_reference?: {
    values?: string;
    [k: string]: any;
  };
  name?: string;
  image?: string;
  _uid: string;
  component: "category";
  [k: string]: any;
}

export interface CategoryBoxStoryblok {
  filter_categories?: any[];
  filter_by_tags?: {
    values?: string[];
    [k: string]: any;
  };
  match_all_tags?: boolean;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "category_box";
  [k: string]: any;
}

export interface ColumnStoryblok {
  body?: any[];
  width_general?: "12" | "11" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1" | "false" | "auto" | "true";
  width_phone?: "4" | "3" | "2" | "1" | "false" | "auto" | "true";
  width_tablet?: "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1" | "false" | "auto" | "true";
  background?: any[];
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  align_content?: "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "stretch";
  align_items?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  _uid: string;
  component: "column";
  [k: string]: any;
}

export interface DividerStoryblok {
  color?: {
    rgba?: string;
    [k: string]: any;
  };
  width?: number;
  icon?: {
    name?: string;
    [k: string]: any;
  };
  size?: number;
  _uid: string;
  component: "divider";
  [k: string]: any;
}

export interface FlexRowStoryblok {
  body?: any[];
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  column?: boolean;
  full_height?: boolean;
  justify?: "space-around" | "center" | "space-between" | "space-evenly" | "flex-start" | "flex-end";
  align_items?: "center" | "baseline" | "flex-start" | "flex-end" | "stretch";
  align_content?: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around";
  _uid: string;
  component: "flex_row";
  [k: string]: any;
}

export interface FormStoryblok {
  api?: string;
  border?: ("outlined" | "shaped" | "square")[];
  error_msg_required?: string;
  error_msg_email?: string;
  body?: any[];
  success_body?: any[];
  _uid: string;
  component: "form";
  [k: string]: any;
}

export interface FormCheckboxStoryblok {
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  _uid: string;
  component: "form_checkbox";
  [k: string]: any;
}

export interface FormSelectStoryblok {
  name: string;
  label?: string;
  required?: boolean;
  options?: any[];
  _uid: string;
  component: "form_select";
  [k: string]: any;
}

export interface FormSelectOptionStoryblok {
  value?: string;
  label?: string;
  _uid: string;
  component: "form_select_option";
  [k: string]: any;
}

export interface FormTextfieldStoryblok {
  name: string;
  label?: string;
  type?: "email" | "number";
  textarea?: boolean;
  required?: boolean;
  help_text?: string;
  help_text_persistent?: boolean;
  _uid: string;
  component: "form_textfield";
  [k: string]: any;
}

export interface GlobalStoryblok {
  setup_language?: string;
  setup_supported_languages?: string;
  setup_favicon?: string;
  seo_title?: string;
  toolbar?: any[];
  multi_toolbar?: any[];
  mobile_nav_breakpoint?: "sm" | "md" | "lg" | "xl";
  seo_description?: string;
  seo_robots?: boolean;
  website_logo?: string;
  website_logo_xs?: string;
  website_logo_invert?: string;
  website_logo_invert_xs?: string;
  toolbar_variant?: "primary" | "secondary" | "white" | "dark";
  toolbar_color?: {
    rgba?: string;
    [k: string]: any;
  };
  website_title?: string;
  website_slogan?: string;
  toolbar_config?: ("fixed" | "text_bold" | "fixed_width" | "unelevated")[];
  footer?: any[];
  footer_config?: ("footer-large" | "footer-small")[];
  seo_body?: any[];
  theme_base: "base" | "dark";
  theme_primary?: string;
  theme_primary_contrast?: string;
  theme_secondary?: string;
  theme_secondary_contrast?: string;
  theme_error?: string;
  theme_error_contrast?: string;
  theme_link?: string;
  theme_link_hover?: string;
  theme_font_default?: string;
  theme_font_alt1?: string;
  theme_font_alt2?: string;
  theme_font_alt3?: string;
  theme_font_alt4?: string;
  theme_container_width?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  toolbar_main_height?: number;
  toolbar_font_size?: string;
  _uid: string;
  component: "global";
  [k: string]: any;
}

export interface HeadlineStoryblok {
  text?: string;
  text_xs?: string;
  typography?:
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "subtitle1"
    | "subtitle2"
    | "overline";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
  align?: "left" | "center" | "right" | "justify";
  font?: "alt1" | "alt2" | "alt3" | "alt4";
  custom_color?: {
    rgba?: string;
    [k: string]: any;
  };
  line_height?: string;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  letter_spacing?: string;
  font_size?: string;
  _uid: string;
  component: "headline";
  [k: string]: any;
}

export interface HtmlStoryblok {
  body?: string;
  _uid: string;
  component: "html";
  [k: string]: any;
}

export interface HubspotFormStoryblok {
  form_id?: string;
  portal_id?: string;
  newsletter_subscription?: number;
  body?: any[];
  consent_communication?: string;
  consent_process?: string;
  legitimate_interest?: any[];
  _uid: string;
  component: "hubspot_form";
  [k: string]: any;
}

export interface HubspotMeetingStoryblok {
  meeting_name?: string;
  _uid: string;
  component: "hubspot_meeting";
  [k: string]: any;
}

export interface IconStoryblok {
  name?: {
    name?: string;
    [k: string]: any;
  };
  size?: "xmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge";
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "icon";
  [k: string]: any;
}

export interface IframeStoryblok {
  url?: string;
  responsive_ratio?: "16by9" | "4by3";
  height?: string;
  width?: string;
  display?: "relative" | "absolute";
  property?: "allow_fullscreen"[];
  allow?: ("geolocation" | "microphone" | "camera" | "midi" | "encrypted-media")[];
  _uid: string;
  component: "iframe";
  [k: string]: any;
}

export interface IframeAdvancedStoryblok {
  url?: string;
  height?: string;
  width?: string;
  display?: "relative" | "absolute";
  property?: "allow_fullscreen"[];
  allow?: ("geolocation" | "microphone" | "camera" | "midi" | "encrypted-media")[];
  post_message_key?: string;
  incoming_message_key?: string;
  _uid: string;
  component: "iframe_advanced";
  [k: string]: any;
}

export interface ImageStoryblok {
  source?: string;
  alt?: string;
  width?: number;
  height?: number;
  height_xs?: number;
  height_fill?: boolean;
  property?: ("img-thumbnail" | "rounded" | "rounded-circle" | "square" | "rounded-0")[];
  image_crop?: ("image_crop" | "smart_crop")[];
  focal_point?: string;
  color?: {
    rgba?: string;
    [k: string]: any;
  };
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "image";
  [k: string]: any;
}

export interface ImageCoreStoryblok {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  _uid: string;
  component: "image_core";
  [k: string]: any;
}

export interface ImageListStoryblok {
  body?: any[];
  text_protection?: boolean;
  enable_lightbox?: boolean;
  masonry?: boolean;
  column_count?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  column_count_tablet?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  column_count_phone?: "1" | "2" | "3" | "4";
  column_gap?: "0" | "2" | "4" | "8" | "16" | "24" | "32";
  aspect_ratio?: "1x1" | "16x9" | "4x3" | "3x4" | "3x2" | "2x3" | "1x2" | "2x1";
  image_crop?: "crop" | "smart" | "fit_in";
  fit_in_color?: string;
  _uid: string;
  component: "image_list";
  [k: string]: any;
}

export interface ImageListItemStoryblok {
  source?: string;
  label?: string;
  _uid: string;
  component: "image_list_item";
  [k: string]: any;
}

export interface LinkStoryblok {
  link?: {
    cached_url?: string;
    linktype?: string;
    [k: string]: any;
  };
  open_external?: boolean;
  body?: any[];
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface ListsStoryblok {
  render_as_links?: boolean;
  two_line?: boolean;
  hide_subtitle?: boolean;
  hide_image?: boolean;
  image_size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  _uid: string;
  component: "lists";
  [k: string]: any;
}

export interface ListSearchAutocompleteStoryblok {
  placeholder?: string;
  label?: string;
  not_found_label?: string;
  icon?: {
    name?: string;
    [k: string]: any;
  };
  shape?: "rounded" | "square";
  outlined?: boolean;
  fullwidth?: boolean;
  menu_border_radius?: string;
  menu_align_right?: boolean;
  _uid: string;
  component: "list_search_autocomplete";
  [k: string]: any;
}

export interface ListSearchFieldStoryblok {
  label?: string;
  placeholder?: string;
  fullwidth?: boolean;
  outlined?: boolean;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "list_search_field";
  [k: string]: any;
}

export interface ListWidgetStoryblok {
  enable_for_search?: boolean;
  only_tagged?: boolean;
  tags?: {
    values?: string[];
    [k: string]: any;
  };
  match_all_tags?: boolean;
  sort?: "publish" | "updated" | "created" | "title";
  sort_descending?: boolean;
  maximum_items?: number;
  list_options?: any[];
  _uid: string;
  component: "list_widget";
  [k: string]: any;
}

export interface LogoStoryblok {
  source?: string;
  source_xs?: string;
  alt?: string;
  _uid: string;
  component: "logo";
  [k: string]: any;
}

export interface NavItemStoryblok {
  name?: string;
  link?: {
    cached_url?: string;
    linktype?: string;
    [k: string]: any;
  };
  open_external?: boolean;
  image?: string;
  _uid: string;
  component: "nav_item";
  [k: string]: any;
}

export interface NavListStoryblok {
  header?: string;
  body?: any[];
  properties?: ("flex-column" | "justify-content-center")[];
  collapse_on_mobile?: boolean;
  collapse_icon?: {
    name?: string;
    [k: string]: any;
  };
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "nav_list";
  [k: string]: any;
}

export interface NavMenuStoryblok {
  title?: string;
  border_radius?: string;
  body?: any[];
  alignment?: "bottomStart" | "bottomEnd";
  icon?: {
    name?: string;
    [k: string]: any;
  };
  icon_collapse?: {
    name?: string;
    [k: string]: any;
  };
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "nav_menu";
  [k: string]: any;
}

export interface NavMenuItemStoryblok {
  label?: string;
  link?: {
    cached_url?: string;
    linktype?: string;
    [k: string]: any;
  };
  open_external?: boolean;
  image?: string;
  _uid: string;
  component: "nav_menu_item";
  [k: string]: any;
}

export interface PageStoryblok {
  property?: "has_feature"[];
  meta_title?: string;
  meta_description?: string;
  seo_body?: any[];
  body?: any[];
  meta_robots?: boolean;
  preview_title?: string;
  preview_subtitle?: string;
  preview_teaser?: string;
  preview_image?: string;
  right_body?: any[];
  _uid: string;
  component: "page";
  [k: string]: any;
}

export interface ParagraphStoryblok {
  text?: string;
  typography?:
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "headline1"
    | "headline2"
    | "headline3"
    | "overline"
    | "headline4"
    | "headline5"
    | "headline6";
  font?: "alt1" | "alt2" | "alt3" | "alt4";
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "paragraph";
  [k: string]: any;
}

export interface ParallaxItemStoryblok {
  image?: string;
  amount?: number;
  image_focal_point?: string;
  children?: any[];
  _uid: string;
  component: "parallax_item";
  [k: string]: any;
}

export interface PricingStoryblok {
  body?: any[];
  column_count?: number;
  column_count_tablet?: number;
  column_count_phone?: number;
  column_gap?: "2" | "4" | "8" | "16" | "24" | "32";
  _uid: string;
  component: "pricing";
  [k: string]: any;
}

export interface PricingItemStoryblok {
  image?: any[];
  title?: any[];
  price?: any[];
  subtitle?: any[];
  features?: any[];
  button?: any[];
  promotion?: any[];
  _uid: string;
  component: "pricing_item";
  [k: string]: any;
}

export interface PromotionStoryblok {
  image?: any[];
  body?: any[];
  _uid: string;
  component: "promotion";
  [k: string]: any;
}

export interface PromotionItemStoryblok {
  body?: any[];
  action?: any[];
  position?: "top_left" | "top_right" | "bottom_left" | "bottom_right" | "top_left_overlap" | "bottom_left_overlap";
  variant?: "variant-1" | "variant-2" | "variant-3" | "variant-4";
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "promotion_item";
  [k: string]: any;
}

export interface RichTextEditorStoryblok {
  body?: any;
  typography?:
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "headline1"
    | "headline2"
    | "headline3"
    | "overline"
    | "headline4"
    | "headline5"
    | "headline6";
  font?: "alt1" | "alt2" | "alt3" | "alt4";
  align?: "left" | "center" | "right" | "justify";
  color?: "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
  custom_color?: {
    rgba?: string;
    [k: string]: any;
  };
  line_height?: string;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  font_size?: string;
  letter_spacing?: string;
  _uid: string;
  component: "rich_text_editor";
  [k: string]: any;
}

export interface RowStoryblok {
  body?: any[];
  spacing?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "space-around";
  align_content?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
  align_items?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  background?: any[];
  _uid: string;
  component: "row";
  [k: string]: any;
}

export interface RowNestedStoryblok {
  body?: any[];
  fluid_width?: boolean;
  column_gap?: number;
  grid_gap?: number;
  align?: "left" | "right";
  background?: any[];
  grid_margin_desktop?: string;
  grid_margin_tablet?: string;
  grid_margin_phone?: string;
  grid_gutter_desktop?: string;
  grid_gutter_tablet?: string;
  grid_gutter_phone?: string;
  _uid: string;
  component: "row_nested";
  [k: string]: any;
}

export interface SectionStoryblok {
  body?: any[];
  variant?: "primary" | "secondary" | "dark" | "light" | "dark_text" | "light_text" | "transparent";
  property?: "is_full_height"[];
  max_width?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  padding?: string;
  background_style?: "fixed_image" | "fixed_cover";
  background?: any[];
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface SectionParallaxStoryblok {
  body?: any[];
  elements?: any[];
  height?: number;
  disable_lazy_load?: boolean;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "section_parallax";
  [k: string]: any;
}

export interface SectionVideoBgStoryblok {
  body?: any[];
  url?: string;
  height?: number;
  video_ratio?: "16x9" | "1280x720" | "4x3" | "16x6";
  property?: ("muted" | "loop" | "autoplay" | "controls" | "suppress_mouse_events" | "playsinline")[];
  fallback_image?: string;
  _uid: string;
  component: "section_video_bg";
  [k: string]: any;
}

export interface SeoOpenGraphStoryblok {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  site_name?: string;
  app_id?: string;
  locale?: string;
  images?: any[];
  _uid: string;
  component: "seo_open_graph";
  [k: string]: any;
}

export interface SeoTwitterStoryblok {
  site?: string;
  handle?: string;
  card_type?: "summary" | "summary_large_image" | "app" | "player";
  _uid: string;
  component: "seo_twitter";
  [k: string]: any;
}

export interface SliderStoryblok {
  body?: any[];
  property?: (
    | "pagination_dark"
    | "arrows_dark"
    | "hide_pagination"
    | "hide_arrows"
    | "pagination_bottom_right"
    | "pagination_circle"
  )[];
  slides_per_view?: number;
  background_color?: {
    rgba?: string;
    [k: string]: any;
  };
  section_variant?: "primary" | "secondary" | "dark" | "light" | "dark_text" | "light_text" | "transparent";
  _uid: string;
  component: "slider";
  [k: string]: any;
}

export interface StaticContainerStoryblok {
  body?: any[];
  _uid: string;
  component: "static_container";
  [k: string]: any;
}

export interface StaticSectionStoryblok {
  container?: string;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "static_section";
  [k: string]: any;
}

export interface StyleVariantsBgStoryblok {
  color?: string;
  color_opacity?: string;
  _uid: string;
  component: "style_variants_bg";
  [k: string]: any;
}

export interface TableStoryblok {
  body?: {
    tbody?: any[];
    thead?: any[];
    [k: string]: any;
  };
  variant?: "comparison" | "bordered" | "bordered-bold" | "boxed" | "price";
  disable_table_head?: boolean;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "table";
  [k: string]: any;
}

export interface TabsStoryblok {
  body?: any[];
  wrapped?: boolean;
  vertical_tabs?: boolean;
  variant?: "fullWidth" | "scrollable" | "standard";
  centered?: boolean;
  _uid: string;
  component: "tabs";
  [k: string]: any;
}

export interface TabsItemStoryblok {
  title?: string;
  icon?: {
    name?: string;
    [k: string]: any;
  };
  body?: any[];
  _uid: string;
  component: "tabs_item";
  [k: string]: any;
}

export interface ToolbarLogoStoryblok {
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "toolbar_logo";
  [k: string]: any;
}

export interface ToolbarNaviButtonStoryblok {
  icon?: {
    name?: string;
    [k: string]: any;
  };
  _uid: string;
  component: "toolbar_navi_button";
  [k: string]: any;
}

export interface ToolbarRowStoryblok {
  body?: any[];
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "toolbar_row";
  [k: string]: any;
}

export interface ToolbarRowSectionStoryblok {
  body?: any[];
  align_end?: boolean;
  class_names?: {
    values?: string[];
    [k: string]: any;
  };
  _uid: string;
  component: "toolbar_row_section";
  [k: string]: any;
}

export interface ToolbarSearchStoryblok {
  trigger?: any[];
  placeholder?: string;
  _uid: string;
  component: "toolbar_search";
  [k: string]: any;
}
