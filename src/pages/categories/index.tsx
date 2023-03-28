import React, { FC } from 'react'
import { GetStaticProps } from 'next'

import type { BlogCategoryModel, PageDataModel, StrapiFindResponse } from '@/types/models'
import { CategoriesList, Seo } from '@/components'
import { blogCategoryDocument } from '@/graphql'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import { apolloSsrClient } from '@/graphql/client'
import { AppLayout } from '@/containers'

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
      data: await getPageData<null>(AppRoute.Categories),
      categories: categoriesQuery.data.blogCategories,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
