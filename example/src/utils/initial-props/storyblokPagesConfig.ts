export function getStoryblokPagesConfig() {
  const params: any = {
    per_page: 100,
    excluding_fields: 'body,right_body,meta_robots,property,meta_title,meta_description,seo_body,preview_title,preview_subtitle,preview_image,preview_teaser',
    sort_by: 'published_at:desc',
    filter_query: {
      component: {
        in: 'page'
      },
      meta_robots: {
        not_in: true
      }
    }
  }
  if (process.env.rootDirectory) {
    params.starts_with = `${process.env.rootDirectory}/`
  }
  return params
}
