import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from 'types/strapi'
import { apolloSsrClient } from 'utils/gql/client'
import {
  GET_ALL_CATEGORIES,
  GetAllCategoriesQueryResponse,
} from 'utils/gql/categories'
import { AppLayout, CategoriesList } from 'components'
import {
  GET_ALL_SOCIAL_MEDIAS,
  GetAllSocialMediasQueryResponse,
} from 'utils/gql/socialMedias'

interface Props {
  categories: StrapiFindResponse<ArticleCategoryModel>
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

const Categories: FC<Props> = ({ categories, socialMedias }) => {
  return (
    <AppLayout socialMedias={socialMedias}>
      <CategoriesList categories={categories} />
    </AppLayout>
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

  return {
    props: {
      categories: categoriesQuery.data.articleCategories,
      socialMedias: socialMediasQuery.data.socialMedias,
    },
    revalidate: 60,
  }
}
