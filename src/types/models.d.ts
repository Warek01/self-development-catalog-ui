import type { SocialMediaPlatform } from './index'
import type {
  StrapiEntity,
  StrapiFindOneResponse,
  StrapiFindResponse,
  StrapiMultimediaModel,
} from './strapi'

declare global {
  interface ArticleModel {
    title: string
    description: string
    links: {
      text: string
      link: string
    }[]
    date: string
    article_categories?: StrapiFindResponse<ArticleCategoryModel>
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

  interface UsefulResourceModel {
    title: string
    link: string
    description: string
  }

  interface PageSeoModel {
    slug: string
    data: {
      title: string
      description: string
      image: {
        altText: string
        media: { data: StrapiEntity<StrapiMultimediaModel> }
      }
      robots: string
      preventIndexing: boolean
      link: string
    }
  }
}

export {}
