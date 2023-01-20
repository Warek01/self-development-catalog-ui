import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import ApiFacade from 'api';
import type { CategoryParams, CategoryProps } from './interface';

const Category: FC<CategoryProps> = ({ category }) => {
  return <div>{category.title}</div>;
};

export default Category;

export const getStaticProps: GetStaticProps<
  CategoryProps,
  CategoryParams
> = async ({ params }) => {
  const api = new ApiFacade();

  console.log(params);

  const categoryEntity = await api.getOne<ArticleCategoryModel>(
    `/article-categories/${params!.id}`,
  );

  return {
    props: {
      pageData: await api.getPageProps('articles'),
      category: categoryEntity.data.attributes,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new ApiFacade();

  const categories = await api.articles.getAllCategories();

  return {
    paths: categories.data.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: 'blocking',
  };
};
