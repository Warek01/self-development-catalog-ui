import { gql } from '@apollo/client'

import type { StrapiFindResponse } from '@/types/strapi'

export const PAGE_SEO_FIELDS = gql`
  fragment pageSeoFields on PageSeo {
    slug
    data {
      id
      title
      link
      description
      keywords
      ogLink
      link
      twitterLink
      preventIndexing
      robots
      image {
        altText
        media {
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
`

/** @param slug String */
export const FIND_PAGE_SEO = gql`
  ${PAGE_SEO_FIELDS}
  query FindPageSeo($slug: String!) {
    pageSeos(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          ...pageSeoFields
        }
      }
    }
  }
`

export interface FindPageSeoResponse {
  pageSeos: StrapiFindResponse<PageSeoModel>
}

