import type { SocialMediaPlatform } from './index'
import type { StrapiFindResponse, StrapiMultimediaModel } from './strapi'

declare global {
  interface BlogModel {
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

  interface SocialMediaModel {
    platform: SocialMediaPlatform
    link: string
  }

  interface BlogCategoryModel {
    title: string
    slug: string
    color: string
    icon: StrapiMultimediaModel
    blogs?: StrapiFindResponse<BlogModel>
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
        media: StrapiMultimediaModel
      }
      robots: string
      preventIndexing: boolean
      link: string
    }
  }

  interface UserModel {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
  }

  interface PageDataModel<T> {
    seo: PageSeoModel | null
    socialMedias: StrapiFindResponse<SocialMediaModel>
    props: T
  }
}

export {}
