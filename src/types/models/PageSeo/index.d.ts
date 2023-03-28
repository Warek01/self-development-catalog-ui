import { StrapiMultimediaModel } from '@/types/models'

export default interface PageSeoModel {
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
