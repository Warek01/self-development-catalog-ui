import type { StrapiFindResponse } from 'types/strapi'

export interface SideMenuProps {
  socialMediaLinks: StrapiFindResponse<SocialMediaModel>
}
