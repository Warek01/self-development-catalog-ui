import type { StrapiFindResponse } from 'types/strapi'

export default interface SideMenuProps {
  socialMediaLinks: StrapiFindResponse<SocialMediaModel>
}
