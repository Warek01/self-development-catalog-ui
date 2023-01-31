import type { StrapiFindResponse } from 'types/strapi'

export interface AppLayoutProps {
  socialMedias: StrapiFindResponse<SocialMediaModel>
}
