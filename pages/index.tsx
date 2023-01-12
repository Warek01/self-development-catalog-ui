import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import { StrapiFindResponse, StrapiPageProps } from 'types/strapi';
import { AboutPreview, Welcome } from 'components';

interface HomeProps extends StrapiPageProps {
  articles: StrapiFindResponse<ArticleModel>;
}

const Home: FC<HomeProps> = ({ articles }) => {
  return <div className="px-12">
    <Welcome />
    <AboutPreview />
  </div>;
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const api = new ApiFacade();

  return {
    props: {
      articles: await api.getArticles(),
      pageData: await api.getPageProps('Home'),
    },
    revalidate: 3600,
  };
};
