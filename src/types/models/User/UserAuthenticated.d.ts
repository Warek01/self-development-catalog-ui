import type UserLoginModel from './UserLogin'
import { StrapiEntity, StrapiFindResponse } from '@/types/strapi'

export default interface UserAuthenticatedModel extends UserLoginModel {
  createdAt: string
  updatedAt: string
  role: unknown
  usefulResources: StrapiFindResponse<UsefulResourceModel>
  blogs: StrapiFindResponse<UsefulResourceModel>
}
