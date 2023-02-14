import { gql } from '@apollo/client'

import type { StrapiFindResponse } from 'types/strapi'

export const ARTICLE_FIELDS = gql`
  fragment articleFields on Article {
    title
    description
    date
    links {
      id
      link
      text
    }
  }
`

export const GET_ALL_ARTICLES = gql`
  ${ARTICLE_FIELDS}
  query GetAllArticles {
    articles {
      data {
        id
        attributes {
          ...articleFields
        }
      }
    }
  }
`

export interface GetAllArticlesQueryResponse {
  articles: StrapiFindResponse<ArticleModel>
}

/** @param $id ID */
export const FIND_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  query FindArticle($id: ID!, $includeCategories: Boolean! = false) {
    articles(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          ...articleFields
           article_categories @include(if: $includeCategories) {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`

export interface FindArticleQueryResponse {
  articles: StrapiFindResponse<ArticleModel>
}
