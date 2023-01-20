import type { StrapiFindOneResponse, StrapiFindResponse, StrapiMultimediaModel, StrapiPageProps } from 'types/strapi';
import type { AppLayoutProps } from 'components/AppLayout/interface';

export interface HomePageStaticProps {
  longTitle: string;
  shortTitle: string;
  welcomeMessage: string;
  welcomeImage: StrapiFindOneResponse<StrapiMultimediaModel>;
}

export interface HomePageRelationalProps {
  categories: StrapiFindResponse<ArticleCategoryModel>;
  socialMediaLinks: StrapiFindResponse<SocialMediaLinkModel>;
  layoutProps: AppLayoutProps;
}

export type HomePageProps = HomePageStaticProps &
  HomePageRelationalProps &
  StrapiPageProps;
