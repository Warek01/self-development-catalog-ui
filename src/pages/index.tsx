import { FC } from 'react';
import { GetStaticProps } from 'next';

import type { HomePageProps } from './interface';

import ApiFacade from 'api';
import {
  AboutPreview,
  AppLayout,
  CategorySelect,
  FeatureSelect,
  SideMenu,
  Welcome,
} from 'components';

const Home: FC<HomePageProps> = (props) => {
  return (
    <AppLayout {...props.layoutProps}>
      <SideMenu socialMediaLinks={props.socialMediaLinks} />
      <Welcome message={props.welcomeMessage} welcomeImage={props.welcomeImage}/>
      <AboutPreview />
      <CategorySelect categories={props.categories} />
      <FeatureSelect />
    </AppLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const api = new ApiFacade();

  const homeProps = await api.singleTypes.getHomePageProps();
  const pageData = await api.getPageProps('home');
  const socialMediaLinks = await api.getSocialMediaLinks();
  const categories = await api.articles.getAllCategories({
    populate: ['icon'],
  });
  const layoutProps = await api.getAppLayoutProps();

  return {
    props: {
      pageData,
      categories,
      socialMediaLinks,
      layoutProps,
      ...homeProps,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  };
};
