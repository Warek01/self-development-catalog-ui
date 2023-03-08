import { FC } from 'react'
import { GetStaticProps } from 'next'

import { AboutProject, AppLayout, Seo } from '@/components'
import getPageData from '@/utils/getPageData'
import AppRoutes from '@/constants/appRoutes'

interface AboutProps {
  projectTitle: string
  projectDescription: string
  projectTechnologies: unknown
  repoLink: string
  authorTitle: string
  authorDescription: string
  authorTechnologies: unknown
}

interface Props {
  data: PageDataModel<AboutProps>
}

const AboutPage: FC<Props> = ({ data }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <AboutProject
          projectTitle={data.props.projectTitle}
          projectDescription={data.props.projectDescription}
          projectTechnologies={data.props.projectTechnologies}
          repoLink={data.props.repoLink}
        />
      </AppLayout>
    </>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      data: await getPageData<AboutProps>(AppRoutes.about),
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
