import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import type { StrapiFindResponse, StrapiPageProps } from 'types/strapi';
import {
  AboutPreview,
  CategorySelect,
  FeatureSelect,
  Footer,
  Header,
  SideMenu,
  Welcome,
} from 'components';

interface HomeProps extends StrapiPageProps {
  categories: StrapiFindResponse<ArticleCategoryModel>;
  socialMediaLinks: StrapiFindResponse<SocialMediaLinkModel>;
}

const Home: FC<HomeProps> = ({ categories, socialMediaLinks }) => {
  return (
    <>
      <SideMenu socialMediaLinks={socialMediaLinks} />
      <Header />
      <Welcome />
      <AboutPreview />
      <CategorySelect categories={categories} />
      <FeatureSelect />
      <Footer socialMediaLinks={socialMediaLinks} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const api = new ApiFacade();

  return {
    props: {
      pageData: await api.getPageProps('Home'),
      categories: await api.getArticleCategories({ populate: ['icon'] }),
      socialMediaLinks: await api.getSocialMediaLinks(),
    },
  };
};
