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
  FIND_PAGE_SEO,
  FindPageSeoResponse,
  GET_ALL_CATEGORIES,
  GET_ALL_SOCIAL_MEDIAS,
  GetAllCategoriesQueryResponse,
  GetAllSocialMediasQueryResponse,
} from '@/utils/gql'

interface Props {
  pageSeo?: PageSeoModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
  categories: StrapiFindResponse<ArticleCategoryModel>
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
  const socialMedias =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const categories = await apolloSsrClient.query<GetAllCategoriesQueryResponse>(
    {
      query: GET_ALL_CATEGORIES,
    },
  )

  const seo = await apolloSsrClient.query<FindPageSeoResponse>({
    query: FIND_PAGE_SEO,
    variables: {
      slug: '/',
    },
  })

  return {
    props: {
      socialMedias: socialMedias.data.socialMedias,
      categories: categories.data.articleCategories,
      pageSeo: seo.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
