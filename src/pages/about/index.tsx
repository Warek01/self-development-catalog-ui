import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { AboutProjectProps } from '@/components/AboutProject/interface'
import { AboutProject, Seo } from '@/components'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import { AppLayout } from '@/containers'

interface Props {
  data: PageDataModel<AboutProjectProps>
}

const AboutPage: FC<Props> = ({ data }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <AboutProject {...data.props} />
      </AppLayout>
    </>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      data: await getPageData<AboutProjectProps>(AppRoute.About),
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
