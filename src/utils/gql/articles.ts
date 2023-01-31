import { gql } from '@apollo/client'
import { StrapiFindResponse } from '../../types/strapi'

export const ARTICLE_FIELDS = gql`
  fragment articleFields on Article {
    title
    description
    links {
      id
      link
      text
    }
  }
`

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

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
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
  query GetCategory($categorySlug: String!) {
    articleCategories(filters: { slug: { eq: $categorySlug } }) {
      data {
        attributes {
          ...categoryFields
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
