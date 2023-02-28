import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, Article, Seo } from '@/components'
import {
  apolloSsrClient,
  FIND_ARTICLE,
  FIND_PAGE_SEO,
  FindArticleQueryResponse,
  FindPageSeoResponse,
  GET_ALL_ARTICLES,
  GET_ALL_SOCIAL_MEDIAS,
  GetAllArticlesQueryResponse,
  GetAllSocialMediasQueryResponse,
} from '@/utils/gql'

interface Props {
  pageSeo?: PageSeoModel
  article?: ArticleModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

interface Params extends Record<string, string> {
  id: string
}

const Articles: FC<Props> = ({ article, socialMedias, pageSeo }) => {
  if (!article) {
    return <h1>No article</h1>
  }

  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
        <Article article={article} />
      </AppLayout>
    </>
  )
}

export default Articles

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const articleQuery = await apolloSsrClient.query<FindArticleQueryResponse>({
    query: FIND_ARTICLE,
    variables: {
      id: params!.id,
      includeCategories: true,
    },
  })

  const socialMediasQuery =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const seo = await apolloSsrClient.query<FindPageSeoResponse>({
    query: FIND_PAGE_SEO,
    variables: {
      slug: '/',
    },
  })

  if (!articleQuery.data.articles.data[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: articleQuery.data.articles.data[0].attributes,
      socialMedias: socialMediasQuery.data.socialMedias,
      pageSeo: seo.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const articlesQuery =
    await apolloSsrClient.query<GetAllArticlesQueryResponse>({
      query: GET_ALL_ARTICLES,
    })

  return {
    paths: articlesQuery.data.articles.data.map((article) => ({
      params: { id: article.id.toString() },
    })),
    fallback: 'blocking',
  }
}
