import type { SocialMediaModel, StrapiFindResponse } from '@/types/models'

export interface SideMenuProps {
  socialMediaLinks: StrapiFindResponse<SocialMediaModel>
}
