import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { StrapiEntity, StrapiFindResponse } from '@/types/strapi'
import {
  apolloSsrClient,
  FIND_PAGE_SEO,
  FindPageSeoResponse,
  GET_ALL_SOCIAL_MEDIAS,
  GET_CATEGORY,
  GET_CATEGORY_SLUGS,
  GetAllSocialMediasQueryResponse,
  GetCategoryQueryReturn,
  GetCategorySlugsQueryResult,
} from '@/utils/gql'
import { AppLayout, CategoriesList, Seo } from '@/components'

interface Props {
  pageSeo?: PageSeoModel
  category: StrapiEntity<ArticleCategoryModel>
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

interface Params extends Record<string, string> {
  slug: string
}

const Category: FC<Props> = ({ category, socialMedias, pageSeo }) => {
  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
        <CategoriesList categories={category} />
      </AppLayout>
    </>
  )
}

export default Category

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params!.slug

  const socialMediasRequest =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const seo = await apolloSsrClient.query<FindPageSeoResponse>({
    query: FIND_PAGE_SEO,
    variables: {
      slug: '/',
    },
  })

  const categoryRequest = await apolloSsrClient.query<GetCategoryQueryReturn>({
    query: GET_CATEGORY,
    variables: {
      categorySlug: slug,
    },
  })

  const category = categoryRequest.data.articleCategories.data[0]

  return category
    ? {
        props: {
          category: category,
          socialMedias: socialMediasRequest.data.socialMedias,
          pageSeo: seo.data.pageSeos.data?.at(0)?.attributes,
        },
        revalidate: 60,
      }
    : { notFound: true }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs = await apolloSsrClient.query<GetCategorySlugsQueryResult>({
    query: GET_CATEGORY_SLUGS,
  })

  return {
    paths: slugs.data!.articleCategories.data.map(({ attributes }) => ({
      params: { slug: attributes.slug },
    })),
    fallback: 'blocking',
  }
}
