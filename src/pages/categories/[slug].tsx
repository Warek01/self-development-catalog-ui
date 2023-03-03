import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { StrapiEntity, StrapiFindResponse } from '@/types/strapi'
import {
  apolloSsrClient,
  pageSeoDocument,
  blogCategoryDocument,
  socialMediaDocument,
} from '@/graphql'
import { AppLayout, CategoriesList, Seo } from '@/components'

interface Props {
  pageSeo?: PageSeoModel
  category: StrapiEntity<BlogCategoryModel>
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

  const socialMediasQuery = await apolloSsrClient.query<
    GraphqlResponse<'socialMedias', SocialMediaModel>
  >({
    query: socialMediaDocument.GetAllSocialMedias,
  })

  const pageSeoQuery = await apolloSsrClient.query<
    GraphqlResponse<'pageSeos', PageSeoModel>
  >({
    query: pageSeoDocument.FindPageSeo,
    variables: {
      slug: '/',
    },
  })

  const blogCategoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.FindBlogCategory,
    variables: {
      slug: slug,
    },
  })

  const category = blogCategoriesQuery.data.blogCategories?.data?.at(0)

  return category
    ? {
        props: {
          category,
          socialMedias: socialMediasQuery.data.socialMedias,
          pageSeo: pageSeoQuery.data.pageSeos.data?.at(0)?.attributes,
        },
        revalidate: 60,
      }
    : { notFound: true, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.GetAllBlogCategoriesSlugs,
  })

  return {
    paths: slugs.data!.blogCategories.data.map(({ attributes }) => ({
      params: { slug: attributes.slug },
    })),
    fallback: 'blocking',
  }
}
