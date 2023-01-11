import { StrapiPageProps } from 'types/strapi';

const hasStrapiPageProps = (obj: unknown): obj is StrapiPageProps => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return 'pageData' in obj && typeof obj['pageData'] === 'object';
};

export default hasStrapiPageProps;
