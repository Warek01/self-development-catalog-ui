import { FC, useCallback } from 'react'
import { GetStaticProps } from 'next'

import type { BlogCategoryModel, PageDataModel, StrapiEntity } from '@/types/models'
import type { BlogModel } from '@/types/models'
import { Seo, UserInfo } from '@/components'
import { AppLayout } from '@/containers'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import useAuth from '@/lib/hooks/useAuth'
import dynamic from 'next/dynamic'
import { BlogOptionsForm, TextEditor } from '@/components/forms'
import { apolloSsrClient } from '@/graphql/client'
import { blogCategoryDocument } from '@/graphql'

interface Props {
  data: PageDataModel<null>
  blogCategories: StrapiEntity<BlogCategoryModel>[]
}

const WriteBlogPage: FC<Props> = ({ data, blogCategories }) => {
  useAuth(true)

  const handleBlogPost = useCallback(async (blog: Partial<BlogModel>) => {}, [])

  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <TextEditor />
        <BlogOptionsForm categories={blogCategories} />
      </AppLayout>
    </>
  )
}

export default WriteBlogPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogCategoriesQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogCategories', BlogCategoryModel>
  >({
    query: blogCategoryDocument.GetAllBlogCategories,
  })

  return {
    props: {
      data: await getPageData<null>(AppRoute.WriteBlog),
      blogCategories: blogCategoriesQuery.data.blogCategories.data ?? [],
    },
  }
}
