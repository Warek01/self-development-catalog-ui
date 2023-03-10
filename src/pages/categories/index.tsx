import React, { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from 'types/strapi'
import { AppLayout, CategoriesList, Seo } from '@/components'
import {
  apolloSsrClient,
  blogCategoryDocument,
} from '@/graphql'
import getPageData from '@/utils/getPageData'
import AppRoutes from '@/constants/appRoutes'

interface Props {
  data: PageDataModel<null>
  categories: StrapiFindResponse<BlogCategoryModel>
}

const Categories: FC<Props> = ({ categories, data }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <CategoriesList categories={categories} />
      </AppLayout>
    </>
  )
}

export default Categories

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.GetAllBlogCategories,
  })

  return {
    props: {
      data: await getPageData<null>(AppRoutes.categories),
      categories: categoriesQuery.data.blogCategories,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
