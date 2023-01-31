import { gql } from '@apollo/client'
import { StrapiFindResponse } from '../../types/strapi'

export const SOCIAL_MEDIA_FIELDS = gql`
  fragment socialMediaFields on SocialMedia {
    title
    link
    platform
  }
`

export const GET_ALL_SOCIAL_MEDIAS = gql`
  ${SOCIAL_MEDIA_FIELDS}
  query GetSocialMedias {
    socialMedias {
      data {
        attributes {
          ...socialMediaFields
        }
      }
    }
  }
`

export interface GetAllSocialMediasQueryResponse {
  socialMedias: StrapiFindResponse<SocialMediaModel>
}
