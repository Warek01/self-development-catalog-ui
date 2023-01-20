import type { StrapiPageProps } from 'types/strapi';

export interface CategoryProps extends StrapiPageProps {
  category: ArticleCategoryModel;
}

export interface CategoryParams extends Record<string, string>{
  slug: string;
}