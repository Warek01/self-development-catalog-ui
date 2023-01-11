import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import { StrapiFindResponse, StrapiPageProps } from 'types/strapi';

interface HomeProps extends StrapiPageProps {
  articles: StrapiFindResponse<ArticleModel>;
}

const Home: FC<HomeProps> = ({ articles }) => {
  return <div className="h-[2000px]">123</div>;
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
