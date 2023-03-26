import { FC } from 'react'
import { GetStaticProps } from 'next'
import { blogCategoryDocument } from '@/graphql'

import { StrapiFindResponse, StrapiMultimediaModel } from '@/types/strapi'
import { apolloSsrClient } from '@/graphql/client'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import {
  AboutPreview,
  FeatureSelect,
  CategorySelect,
  Seo,
  Welcome,
} from '@/components'
import { AppLayout } from '@/containers'

interface HomePageProps {
  welcomeText: string
  welcomeImage: StrapiMultimediaModel
}

interface Props {
  data: PageDataModel<HomePageProps>
  categories: StrapiFindResponse<BlogCategoryModel>
}

const Home: FC<Props> = ({ data, categories }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <Welcome
          welcomeImage={data.props.welcomeImage}
          welcomeTitle={data.props.welcomeText}
        />
        <AboutPreview />
        <CategorySelect categories={categories} />
        <FeatureSelect />
      </AppLayout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogCategoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.GetAllBlogCategories,
  })

  return {
    props: {
      data: await getPageData<HomePageProps>(AppRoute.Home),
      categories: blogCategoriesQuery.data.blogCategories,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
