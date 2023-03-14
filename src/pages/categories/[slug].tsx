import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { StrapiEntity } from '@/types/strapi'
import { blogCategoryDocument } from '@/graphql'
import { AppLayout, CategoriesList, Seo } from '@/components'
import getPageData from '@/lib/getPageData'
import AppRoutes from '@/constants/appRoutes'
import { apolloSsrClient } from '@/graphql/client'

interface Props {
  data: PageDataModel<null>
  category: StrapiEntity<BlogCategoryModel>
}

interface Params extends Record<string, string> {
  slug: string
}

const Category: FC<Props> = ({ category, data }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
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

  const blogCategoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.FindBlogCategory,
    variables: {
      slug,
    },
  })

  const category = blogCategoriesQuery.data.blogCategories?.data?.at(0)

  return category
    ? {
        props: {
          category,
          data: await getPageData<null>(AppRoutes.categories),
        },
        revalidate: Number(process.env.REVALIDATE_TIMEOUT),
      }
    : { notFound: true, revalidate: Number(process.env.REVALIDATE_TIMEOUT) }
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
