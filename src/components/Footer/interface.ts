import { StrapiFindResponse } from '../../types/strapi';

export default interface FooterProps {
  socialMediaLinks: StrapiFindResponse<SocialMediaLinkModel>;
}
