import React, { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from 'types/strapi'
import { AppLayout, CategoriesList, Seo } from '@/components'
import {
  apolloSsrClient,
  blogCategoryDocument,
  pageSeoDocument,
  socialMediaDocument,
} from '@/graphql'

interface Props {
  pageSeo?: PageSeoModel
  categories: StrapiFindResponse<BlogCategoryModel>
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

const Categories: FC<Props> = ({ categories, socialMedias, pageSeo }) => {
  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
        <CategoriesList categories={categories} />
      </AppLayout>
    </>
  )
}

export default Categories

export const getStaticProps: GetStaticProps<Props> = async () => {
  const socialMediasQuery = await apolloSsrClient.query<
    GraphqlResponse<'socialMedias', SocialMediaModel>
  >({
    query: socialMediaDocument.GetAllSocialMedias,
  })

  const categoriesQuery = await apolloSsrClient.query<
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
      categories: categoriesQuery.data.blogCategories,
      socialMedias: socialMediasQuery.data.socialMedias,
      pageSeo: pageSeoQuery.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
