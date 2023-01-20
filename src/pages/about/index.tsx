import { FC } from 'react';
import { GetStaticProps } from 'next';

import ApiFacade from 'api';
import { AboutPageProps } from './interface';

const AboutPage: FC<AboutPageProps> = ({}) => {
  return <div>About</div>;
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const api = new ApiFacade();

  return {
    props: {
      pageData: await api.getPageProps('about'),
      title: 'About',
      description: 'Description',
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  };
};
