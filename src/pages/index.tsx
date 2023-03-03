import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import {
  AboutPreview,
  AppLayout,
  CategorySelect,
  FeatureSelect,
  Seo,
  Welcome,
} from '@/components'
import {
  apolloSsrClient,
  blogCategoryDocument,
  pageSeoDocument,
  socialMediaDocument,
} from '@/graphql'

interface Props {
  pageSeo?: PageSeoModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
  categories: StrapiFindResponse<BlogCategoryModel>
}

const Home: FC<Props> = ({ socialMedias, categories, pageSeo }) => {
  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
        <Welcome />
        <AboutPreview />
        <CategorySelect categories={categories} />
        <FeatureSelect />
      </AppLayout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const socialMediasQuery = await apolloSsrClient.query<
    GraphqlResponse<'socialMedias', SocialMediaModel>
  >({
    query: socialMediaDocument.GetAllSocialMedias,
  })

  const blogCategoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.GetAllBlogCategories,
  })

  const pageSeoQuery = await apolloSsrClient.query<
    GraphqlResponse<'pageSeos', PageSeoModel>
  >({
    query: pageSeoDocument.FindPageSeo,
    variables: {
      slug: '/',
    },
  })

  return {
    props: {
      socialMedias: socialMediasQuery.data.socialMedias,
      categories: blogCategoriesQuery.data.blogCategories,
      pageSeo: pageSeoQuery.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
