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

  type IconComponent = FC<SVGProps<SVGSVGElement>>;

  interface LinkProps {
    href: string;
    text: string;
  }
}

export {};
