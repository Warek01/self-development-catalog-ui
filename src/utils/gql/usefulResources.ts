import { gql } from '@apollo/client'

import type { StrapiFindResponse } from 'types/strapi'

export const USEFUL_RESOURCES_FIELDS = gql`
  fragment usefulResourcesFields on UsefulResource {
    title
    link
    description
  }
`

export const GET_ALL_USEFUL_RESOURCES = gql`
  ${USEFUL_RESOURCES_FIELDS}
  query GetAllUsefulResources {
    usefulResources(pagination: { limit: 24 }) {
      data {
        id
        attributes {
          ...usefulResourcesFields
        }
      }
    }
  }
`

export interface GetAllUsefulResourcesQueryResponse {
  usefulResources: StrapiFindResponse<UsefulResourceModel>
}
