import { gql } from '@apollo/client'

import type { StrapiFindResponse } from '@/types/strapi'
import { ARTICLE_FIELDS } from '@/utils/gql/articles'

export const CATEGORY_FIELDS = gql`
  ${ARTICLE_FIELDS}
  fragment categoryFields on ArticleCategory {
    title
    slug
    color
    icon {
      data {
        attributes {
          url
          width
          height
        }
      }
    }
    articles {
      data {
        attributes {
          ...articleFields
        }
      }
    }
  }
`

/** @param $includeArticles boolean (**false**) */
export const GET_ALL_CATEGORIES = gql`
  ${ARTICLE_FIELDS}
  query GetAllCategories($includeArticles: Boolean! = false) {
    articleCategories {
      data {
        id
        attributes {
          title
          color
          slug
          icon {
            data {
              attributes {
                width
                height
                url
              }
            }
          }
          articles @include(if: $includeArticles) {
            data {
              id
              attributes {
                ...articleFields
                article_categories {
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
      }
    }
  }
`

export interface GetAllCategoriesQueryResponse {
  articleCategories: StrapiFindResponse<ArticleCategoryModel>
}

export const GET_CATEGORY_SLUGS = gql`
  query GetCategorySlugs {
    articleCategories {
      data {
        attributes {
          slug
        }
      }
    }
  }
`

export interface GetCategorySlugsQueryResult {
  articleCategories: {
    data: { attributes: { slug: string } }[]
  }
}

/** @param $categorySlug String */
export const GET_CATEGORY = gql`
  ${CATEGORY_FIELDS}
  ${ARTICLE_FIELDS}
  query GetCategory($categorySlug: String!) {
    articleCategories(filters: { slug: { eq: $categorySlug } }) {
      data {
        id
        attributes {
          ...categoryFields
          articles {
            data {
              id
              attributes {
                ...articleFields
                article_categories {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export interface GetCategoryQueryReturn {
  articleCategories: StrapiFindResponse<ArticleCategoryModel>
}

/** @param $categorySlug String */
export const FIND_CATEGORY_ARTICLES = gql`
  ${ARTICLE_FIELDS}
  query FindCategoryArticles($categorySlug: String!) {
    articles(filters: { article_categories: { slug: { eq: $categorySlug } } }) {
      data {
        id
        attributes {
          ...articleFields
        }
      }
    }
  }
`
