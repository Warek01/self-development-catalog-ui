import type { SocialMediaPlatform } from './index';
import type {
  StrapiFindOneResponse,
  StrapiFindResponse,
  StrapiMultimediaModel,
} from './strapi';

declare global {
  interface ArticleModel {
    title: string;
    details: string;
    links: string[];
    date: string;
  }

  interface SocialMediaLinkModel {
    platform: SocialMediaPlatform;
    href: string;
  }

  interface ArticleCategoryModel {
    title: string;
    slug: string;
    bgColor: string;
    icon: StrapiFindOneResponse<StrapiMultimediaModel>;
    articles?: StrapiFindResponse<ArticleModel>;
  }

  interface OtherDataModel {
    longTitle: string;
    shortTitle: string;
    logo: StrapiFindOneResponse<StrapiMultimediaModel>;
    welcomeImage: StrapiFindOneResponse<StrapiMultimediaModel>;
  }
}

export {};
