import type { PageSeoModel, SocialMediaModel } from '@/types/models'
import type { StrapiFindResponse } from '@/types/models/Strapi'

export default interface PageDataModel<T> {
  seo: PageSeoModel | null
  socialMedias: StrapiFindResponse<SocialMediaModel>
  props: T
}
