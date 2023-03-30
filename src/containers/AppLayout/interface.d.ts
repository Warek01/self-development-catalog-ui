import type { SocialMediaModel, StrapiFindResponse } from '@/types/models'

export interface AppLayoutProps {
  socialMedias: StrapiFindResponse<SocialMediaModel>
}
