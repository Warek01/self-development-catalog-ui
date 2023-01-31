import type { SocialMediaPlatform } from './index'
import type {
  StrapiFindOneResponse,
  StrapiFindResponse,
  StrapiMultimediaModel,
} from './strapi'

declare global {
  interface ArticleModel {
    title: string
    details: string
    links: string[]
    date: string
  }

  interface SocialMediaModel {
    platform: SocialMediaPlatform
    link: string
  }

  interface ArticleCategoryModel {
    title: string
    slug: string
    color: string
    icon: StrapiFindOneResponse<StrapiMultimediaModel>
    articles?: StrapiFindResponse<ArticleModel>
  }
}

export {}
