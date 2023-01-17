import { SocialMediaPlatform } from './index';
import { StrapiEntity, StrapiMultimediaModel } from './strapi';

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
    icon: {
      data: StrapiMultimediaModel;
    };
    articles?: {
      data: StrapiEntity<ArticleModel>[];
    };
  }
}

export {};
