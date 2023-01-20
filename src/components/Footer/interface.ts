import type { StrapiFindResponse } from 'types/strapi';

export interface FooterProps {
  socialMediaLinks: StrapiFindResponse<SocialMediaLinkModel>;
}
