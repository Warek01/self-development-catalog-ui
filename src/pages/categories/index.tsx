import React, { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from 'types/strapi'
import { AppLayout, CategoriesList, Seo } from '@/components'
import {
  apolloSsrClient,
  FIND_PAGE_SEO,
  FindPageSeoResponse,
  GET_ALL_CATEGORIES,
  GET_ALL_SOCIAL_MEDIAS,
  GetAllCategoriesQueryResponse,
  GetAllSocialMediasQueryResponse,
} from '@/utils/gql'

interface Props {
  pageSeo?: PageSeoModel
  categories: StrapiFindResponse<ArticleCategoryModel>
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
  const categoriesQuery =
    await apolloSsrClient.query<GetAllCategoriesQueryResponse>({
      query: GET_ALL_CATEGORIES,
      variables: {
        includeArticles: true,
      },
    })

  const socialMediasQuery =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const seo = await apolloSsrClient.query<FindPageSeoResponse>({
    query: FIND_PAGE_SEO,
    variables: {
      slug: '/',
    },
  })

  return {
    props: {
      categories: categoriesQuery.data.articleCategories,
      socialMedias: socialMediasQuery.data.socialMedias,
      pageSeo: seo.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
