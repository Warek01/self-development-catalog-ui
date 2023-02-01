import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AppLayout, Article } from 'components'
import { apolloSsrClient } from 'utils/gql/client'
import {
  FIND_ARTICLE,
  FindArticleQueryResponse,
  GET_ALL_ARTICLES,
  GetAllArticlesQueryResponse,
} from 'utils/gql/articles'
import {
  GET_ALL_SOCIAL_MEDIAS,
  GetAllSocialMediasQueryResponse,
} from 'utils/gql/socialMedias'
import { StrapiFindResponse } from 'types/strapi'

interface Props {
  article?: ArticleModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

interface Params extends Record<string, string> {
  id: string
}

const Articles: FC<Props> = ({ article, socialMedias }) => {
  if (!article) {
    return <h1>No article</h1>
  }

  return (
    <AppLayout socialMedias={socialMedias}>
      <Article article={article} />
    </AppLayout>
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

  if (!articleQuery.data.articles.data[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: articleQuery.data.articles.data[0].attributes,
      socialMedias: socialMediasQuery.data.socialMedias,
    },
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
