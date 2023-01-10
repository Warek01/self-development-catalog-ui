declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_STRAPI_URL: string;
      NEXT_PUBLIC_STRAPI_API_URL: string;
      NEXT_PUBLIC_APP_TITLE: string;
    }
  }

  // Optional entity in strapi about current page
  interface PageDataFields {
    title: string;
  }

  interface PageData {
    pageData: PageDataFields;
  }

  interface ArticleModel {
    title: string;
    details: string;
    links: string[];
    date: string;
  }
}

export {};
