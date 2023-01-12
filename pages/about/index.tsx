import { FC } from 'react';

import { StrapiPageProps } from 'types/strapi';

interface Props extends StrapiPageProps {}

const AboutPage: FC<Props> = ({}) => {
  return <div>About</div>;
};

export default AboutPage;
