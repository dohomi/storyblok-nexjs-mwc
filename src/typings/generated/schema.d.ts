export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  JsonScalar: any,
  BlockScalar: any,
};

export type Alternate = {
   __typename?: 'Alternate',
  fullSlug: Scalars['String'],
  id: Scalars['Int'],
  isFolder?: Maybe<Scalars['Boolean']>,
  name: Scalars['String'],
  parentId?: Maybe<Scalars['Int']>,
  published: Scalars['Boolean'],
  slug: Scalars['String'],
};


export type CategoryComponent = {
   __typename?: 'CategoryComponent',
  _editable?: Maybe<Scalars['String']>,
  _uid?: Maybe<Scalars['String']>,
  component?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  tag_reference?: Maybe<Scalars['JsonScalar']>,
};

export type CategoryItem = {
   __typename?: 'CategoryItem',
  alternates?: Maybe<Array<Maybe<Alternate>>>,
  content?: Maybe<CategoryComponent>,
  created_at?: Maybe<Scalars['String']>,
  first_published_at?: Maybe<Scalars['String']>,
  full_slug?: Maybe<Scalars['String']>,
  group_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  is_startpage?: Maybe<Scalars['Boolean']>,
  lang?: Maybe<Scalars['String']>,
  meta_data?: Maybe<Scalars['JsonScalar']>,
  name?: Maybe<Scalars['String']>,
  parent_id?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['Int']>,
  published_at?: Maybe<Scalars['String']>,
  release_id?: Maybe<Scalars['Int']>,
  slug?: Maybe<Scalars['String']>,
  sort_by_date?: Maybe<Scalars['String']>,
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>,
  uuid?: Maybe<Scalars['String']>,
};

export type CategoryItems = {
   __typename?: 'CategoryItems',
  items?: Maybe<Array<Maybe<CategoryItem>>>,
  total?: Maybe<Scalars['Int']>,
};

export type ContentItem = {
   __typename?: 'ContentItem',
  alternates?: Maybe<Array<Maybe<Alternate>>>,
  content?: Maybe<Scalars['JsonScalar']>,
  content_string?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['String']>,
  first_published_at?: Maybe<Scalars['String']>,
  full_slug?: Maybe<Scalars['String']>,
  group_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  is_startpage?: Maybe<Scalars['Boolean']>,
  lang?: Maybe<Scalars['String']>,
  meta_data?: Maybe<Scalars['JsonScalar']>,
  name?: Maybe<Scalars['String']>,
  parent_id?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['Int']>,
  published_at?: Maybe<Scalars['String']>,
  release_id?: Maybe<Scalars['Int']>,
  slug?: Maybe<Scalars['String']>,
  sort_by_date?: Maybe<Scalars['String']>,
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>,
  uuid?: Maybe<Scalars['String']>,
};

export type ContentItems = {
   __typename?: 'ContentItems',
  items?: Maybe<Array<Maybe<ContentItem>>>,
  total?: Maybe<Scalars['Int']>,
};

export type GlobalComponent = {
   __typename?: 'GlobalComponent',
  Theme?: Maybe<Scalars['String']>,
  _editable?: Maybe<Scalars['String']>,
  _uid?: Maybe<Scalars['String']>,
  bottom?: Maybe<Scalars['String']>,
  component?: Maybe<Scalars['String']>,
  footer?: Maybe<Scalars['BlockScalar']>,
  footer_config?: Maybe<Array<Maybe<Scalars['String']>>>,
  mobile_nav_breakpoint?: Maybe<Scalars['String']>,
  multi_toolbar?: Maybe<Scalars['BlockScalar']>,
  seo?: Maybe<Scalars['String']>,
  seo_body?: Maybe<Scalars['BlockScalar']>,
  seo_description?: Maybe<Scalars['String']>,
  seo_robots?: Maybe<Scalars['Boolean']>,
  seo_title?: Maybe<Scalars['String']>,
  setup?: Maybe<Scalars['String']>,
  setup_favicon?: Maybe<Scalars['String']>,
  setup_language?: Maybe<Scalars['String']>,
  setup_supported_languages?: Maybe<Scalars['String']>,
  theme_base?: Maybe<Scalars['String']>,
  theme_container_width?: Maybe<Scalars['String']>,
  theme_font_alt1?: Maybe<Scalars['String']>,
  theme_font_alt2?: Maybe<Scalars['String']>,
  theme_font_alt3?: Maybe<Scalars['String']>,
  theme_font_alt4?: Maybe<Scalars['String']>,
  theme_font_default?: Maybe<Scalars['String']>,
  theme_link?: Maybe<Scalars['String']>,
  theme_link_hover?: Maybe<Scalars['String']>,
  theme_primary?: Maybe<Scalars['String']>,
  theme_primary_contrast?: Maybe<Scalars['String']>,
  theme_secondary?: Maybe<Scalars['String']>,
  theme_secondary_contrast?: Maybe<Scalars['String']>,
  toolbar?: Maybe<Scalars['BlockScalar']>,
  toolbar_config?: Maybe<Array<Maybe<Scalars['String']>>>,
  toolbar_main_height?: Maybe<Scalars['String']>,
  toolbar_variant?: Maybe<Scalars['String']>,
  top?: Maybe<Scalars['String']>,
  website_logo?: Maybe<Scalars['String']>,
  website_logo_invert?: Maybe<Scalars['String']>,
  website_logo_invert_xs?: Maybe<Scalars['String']>,
  website_logo_xs?: Maybe<Scalars['String']>,
  website_slogan?: Maybe<Scalars['String']>,
  website_title?: Maybe<Scalars['String']>,
};

export type GlobalItem = {
   __typename?: 'GlobalItem',
  alternates?: Maybe<Array<Maybe<Alternate>>>,
  content?: Maybe<GlobalComponent>,
  created_at?: Maybe<Scalars['String']>,
  first_published_at?: Maybe<Scalars['String']>,
  full_slug?: Maybe<Scalars['String']>,
  group_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  is_startpage?: Maybe<Scalars['Boolean']>,
  lang?: Maybe<Scalars['String']>,
  meta_data?: Maybe<Scalars['JsonScalar']>,
  name?: Maybe<Scalars['String']>,
  parent_id?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['Int']>,
  published_at?: Maybe<Scalars['String']>,
  release_id?: Maybe<Scalars['Int']>,
  slug?: Maybe<Scalars['String']>,
  sort_by_date?: Maybe<Scalars['String']>,
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>,
  uuid?: Maybe<Scalars['String']>,
};

export type GlobalItems = {
   __typename?: 'GlobalItems',
  items?: Maybe<Array<Maybe<GlobalItem>>>,
  total?: Maybe<Scalars['Int']>,
};


export type PageComponent = {
   __typename?: 'PageComponent',
  _editable?: Maybe<Scalars['String']>,
  _uid?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['BlockScalar']>,
  component?: Maybe<Scalars['String']>,
  list_preview?: Maybe<Scalars['String']>,
  meta?: Maybe<Scalars['String']>,
  meta_description?: Maybe<Scalars['String']>,
  meta_robots?: Maybe<Scalars['Boolean']>,
  meta_title?: Maybe<Scalars['String']>,
  preview_image?: Maybe<Scalars['String']>,
  preview_publish_date?: Maybe<Scalars['String']>,
  preview_subtitle?: Maybe<Scalars['String']>,
  preview_teaser?: Maybe<Scalars['String']>,
  preview_title?: Maybe<Scalars['String']>,
  property?: Maybe<Array<Maybe<Scalars['String']>>>,
  real_url?: Maybe<Scalars['String']>,
  right_body?: Maybe<Scalars['BlockScalar']>,
  seo_body?: Maybe<Scalars['BlockScalar']>,
};

export type PageItem = {
   __typename?: 'PageItem',
  alternates?: Maybe<Array<Maybe<Alternate>>>,
  content?: Maybe<PageComponent>,
  created_at?: Maybe<Scalars['String']>,
  first_published_at?: Maybe<Scalars['String']>,
  full_slug?: Maybe<Scalars['String']>,
  group_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  is_startpage?: Maybe<Scalars['Boolean']>,
  lang?: Maybe<Scalars['String']>,
  meta_data?: Maybe<Scalars['JsonScalar']>,
  name?: Maybe<Scalars['String']>,
  parent_id?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['Int']>,
  published_at?: Maybe<Scalars['String']>,
  release_id?: Maybe<Scalars['Int']>,
  slug?: Maybe<Scalars['String']>,
  sort_by_date?: Maybe<Scalars['String']>,
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>,
  uuid?: Maybe<Scalars['String']>,
};

export type PageItems = {
   __typename?: 'PageItems',
  items?: Maybe<Array<Maybe<PageItem>>>,
  total?: Maybe<Scalars['Int']>,
};

export type QueryType = {
   __typename?: 'QueryType',
  CategoryItem?: Maybe<CategoryItem>,
  CategoryItems?: Maybe<CategoryItems>,
  ContentNode?: Maybe<ContentItem>,
  ContentNodes?: Maybe<ContentItems>,
  GlobalItem?: Maybe<GlobalItem>,
  GlobalItems?: Maybe<GlobalItems>,
  PageItem?: Maybe<PageItem>,
  PageItems?: Maybe<PageItems>,
};


export type QueryTypeCategoryItemArgs = {
  id: Scalars['ID'],
  find_by?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['Int']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>
};


export type QueryTypeCategoryItemsArgs = {
  starts_with?: Maybe<Scalars['String']>,
  by_uuids?: Maybe<Scalars['String']>,
  by_uuids_ordered?: Maybe<Scalars['String']>,
  excluding_ids?: Maybe<Scalars['String']>,
  excluding_fields?: Maybe<Scalars['String']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['String']>,
  sort_by?: Maybe<Scalars['String']>,
  search_term?: Maybe<Scalars['String']>,
  is_startpage?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  with_tag?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  per_page?: Maybe<Scalars['Int']>,
  filter_query?: Maybe<Scalars['JsonScalar']>
};


export type QueryTypeContentNodeArgs = {
  id: Scalars['ID'],
  find_by?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['Int']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>
};


export type QueryTypeContentNodesArgs = {
  starts_with?: Maybe<Scalars['String']>,
  by_uuids?: Maybe<Scalars['String']>,
  by_uuids_ordered?: Maybe<Scalars['String']>,
  excluding_ids?: Maybe<Scalars['String']>,
  excluding_fields?: Maybe<Scalars['String']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['String']>,
  sort_by?: Maybe<Scalars['String']>,
  search_term?: Maybe<Scalars['String']>,
  is_startpage?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  with_tag?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  per_page?: Maybe<Scalars['Int']>,
  filter_query?: Maybe<Scalars['JsonScalar']>
};


export type QueryTypeGlobalItemArgs = {
  id: Scalars['ID'],
  find_by?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['Int']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>
};


export type QueryTypeGlobalItemsArgs = {
  starts_with?: Maybe<Scalars['String']>,
  by_uuids?: Maybe<Scalars['String']>,
  by_uuids_ordered?: Maybe<Scalars['String']>,
  excluding_ids?: Maybe<Scalars['String']>,
  excluding_fields?: Maybe<Scalars['String']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['String']>,
  sort_by?: Maybe<Scalars['String']>,
  search_term?: Maybe<Scalars['String']>,
  is_startpage?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  with_tag?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  per_page?: Maybe<Scalars['Int']>,
  filter_query?: Maybe<Scalars['JsonScalar']>
};


export type QueryTypePageItemArgs = {
  id: Scalars['ID'],
  find_by?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['Int']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>
};


export type QueryTypePageItemsArgs = {
  starts_with?: Maybe<Scalars['String']>,
  by_uuids?: Maybe<Scalars['String']>,
  by_uuids_ordered?: Maybe<Scalars['String']>,
  excluding_ids?: Maybe<Scalars['String']>,
  excluding_fields?: Maybe<Scalars['String']>,
  resolve_links?: Maybe<Scalars['String']>,
  resolve_relations?: Maybe<Scalars['String']>,
  from_release?: Maybe<Scalars['String']>,
  sort_by?: Maybe<Scalars['String']>,
  search_term?: Maybe<Scalars['String']>,
  is_startpage?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  with_tag?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  per_page?: Maybe<Scalars['Int']>,
  filter_query?: Maybe<Scalars['JsonScalar']>
};
