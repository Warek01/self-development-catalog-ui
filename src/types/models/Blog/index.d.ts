import type { BlogCategoryModel } from '@/types/models'
import type { StrapiFindResponse } from '@/types/models/Strapi'

export default interface BlogModel {
  title: string
  slug: string
  content: string
  links: {
    text: string
    link: string
  }[]
  date: string
  blog_categories?: StrapiFindResponse<BlogCategoryModel>
}
