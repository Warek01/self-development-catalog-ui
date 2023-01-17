import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import { StrapiFindResponse, StrapiPageProps } from 'types/strapi';
import {
  AboutPreview,
  CategorySelect,
  FeatureSelect,
  Welcome,
} from 'components';

interface HomeProps extends StrapiPageProps {
  categories: StrapiFindResponse<ArticleCategoryModel>;
}

const Home: FC<HomeProps> = ({ categories }) => {
  return (
    <div className="px-12">
      <Welcome />
      <AboutPreview />
      <CategorySelect categories={categories} />
      <FeatureSelect />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const api = new ApiFacade();

  return {
    props: {
      pageData: await api.getPageProps('Home'),
      categories: await api.getArticleCategories({ populate: ['icon'] }),
    },
    revalidate: 3600,
  };
};
