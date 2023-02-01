import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from 'types/strapi'

import {
  AboutPreview,
  AppLayout,
  CategorySelect,
  FeatureSelect,
  SideMenu,
  Welcome,
} from 'components'
import { apolloSsrClient } from 'utils/gql/client'
import {
  GET_ALL_SOCIAL_MEDIAS,
  GetAllSocialMediasQueryResponse,
} from 'utils/gql/socialMedias'
import {
  GET_ALL_CATEGORIES,
  GetAllCategoriesQueryResponse,
} from 'utils/gql/articles'

interface Props {
  socialMedias: StrapiFindResponse<SocialMediaModel>
  categories: StrapiFindResponse<ArticleCategoryModel>
}

const Home: FC<Props> = ({ socialMedias, categories }) => {
  return (
    <AppLayout socialMedias={socialMedias}>
      <SideMenu socialMediaLinks={socialMedias} />
      <Welcome />
      <AboutPreview />
      <CategorySelect categories={categories} />
      <FeatureSelect />
    </AppLayout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const socialMedias =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const categories = await apolloSsrClient.query<GetAllCategoriesQueryResponse>(
    {
      query: GET_ALL_CATEGORIES,
    },
  )

  return {
    props: {
      socialMedias: socialMedias.data.socialMedias,
      categories: categories.data.articleCategories,
    },
  }
}
