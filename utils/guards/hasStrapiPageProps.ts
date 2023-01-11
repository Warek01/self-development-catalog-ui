import { StrapiPageProps } from 'types/strapi';

const hasStrapiPageProps = (obj: unknown): obj is StrapiPageProps => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return 'pageProps' in obj && typeof obj['pageProps'] === 'object';
};

export default hasStrapiPageProps;
