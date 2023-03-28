import type { StrapiFindResponse, StrapiMultimediaModel } from '@/types/models/Strapi'
import type BlogModel from '@/types/models/Blog'

export default interface BlogCategoryModel {
  title: string
  slug: string
  color: string
  icon: StrapiMultimediaModel
  blogs?: StrapiFindResponse<BlogModel>
}
