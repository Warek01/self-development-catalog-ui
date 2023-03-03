import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, Blog, Seo } from '@/components'
import {
  apolloSsrClient,
  pageSeoDocument,
  blogDocument,
  socialMediaDocument,
} from '@/graphql'

interface Props {
  pageSeo?: PageSeoModel
  blog: BlogModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

interface Params extends Record<string, string> {
  slug: string
}

const Blogs: FC<Props> = ({ blog, socialMedias, pageSeo }) => {
  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
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

  return blogQuery.data.blogs.data?.at(0)
    ? {
        props: {
          blog: blogQuery.data.blogs.data[0].attributes,
          socialMedias: socialMediasQuery.data.socialMedias,
          pageSeo: pageSeoQuery.data.pageSeos.data?.at(0)?.attributes,
        },
        revalidate: 60,
      }
    : {
        notFound: true,
        revalidate: 60,
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
