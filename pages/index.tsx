import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import { StrapiFindResponse } from 'types/strapi';

interface HomeProps extends PageData {
  articles: StrapiFindResponse<ArticleModel>;
}

const Home: FC<HomeProps> = ({ articles }) => {
  return <>123</>;
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const api = new ApiFacade();

  return {
    props: {
      articles: await api.getArticles(),
      pageData: await api.getPageData('home-page'),
    },
    revalidate: 3600,
  };
};
