import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AppLayout, Blog, Seo } from '@/components'
import { blogDocument } from '@/graphql'
import AppRoutes from '@/constants/appRoutes'
import getPageData from '@/lib/getPageData'
import { apolloSsrClient } from '@/graphql/client'

interface Props {
  data: PageDataModel<null>
  blog: BlogModel
}

interface Params extends Record<string, string> {
  slug: string
}

const Blogs: FC<Props> = ({ blog, data }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <Blog blog={blog} />
      </AppLayout>
    </>
  )
}

export default Blogs

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const blogQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogs', BlogModel>
  >({
    query: blogDocument.FindBlog,
    variables: {
      slug: params!.slug,
    },
  })

  return blogQuery.data.blogs.data?.at(0)
    ? {
        props: {
          data: await getPageData<null>(AppRoutes.blogs),
          blog: blogQuery.data.blogs.data[0].attributes,
        },
        revalidate: Number(process.env.REVALIDATE_TIMEOUT),
      }
    : {
        notFound: true,
        revalidate: Number(process.env.REVALIDATE_TIMEOUT),
      }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogsQuery = await apolloSsrClient.query<
    GraphqlResponse<'blogs', BlogModel>
  >({
    query: blogDocument.GetAllBlogs,
  })

  return {
    paths: blogsQuery.data.blogs.data.map((blog) => ({
      params: { slug: blog.attributes.slug },
    })),
    fallback: 'blocking',
  }
}
