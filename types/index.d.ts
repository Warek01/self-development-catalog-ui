import { FC, SVGProps } from 'react';

// Globally available types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_STRAPI_URL: string;
      NEXT_PUBLIC_STRAPI_API_URL: string;
      NEXT_PUBLIC_APP_TITLE: string;
    }
  }

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

  type IconComponent = FC<SVGProps<SVGSVGElement>>;

  interface LinkProps {
    href: string;
    text: string;
  }

  type SocialMediaPlatform =
    | 'web'
    | 'facebook'
    | 'discord'
    | 'github'
    | 'gitlab'
    | 'linkedIn'
    | 'instagram';
}

export {};
