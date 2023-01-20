import type { StrapiPageProps } from 'types/strapi';

export interface AboutPageStrapiProps {
  title: string;
  description: string;
}

export type AboutPageProps = AboutPageStrapiProps & StrapiPageProps;
