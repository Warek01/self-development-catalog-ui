import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, Seo, UsefulResources } from '@/components'
import {
  apolloSsrClient,
  FIND_PAGE_SEO,
  FindPageSeoResponse,
  GET_ALL_SOCIAL_MEDIAS,
  GET_ALL_USEFUL_RESOURCES,
  GetAllSocialMediasQueryResponse,
  GetAllUsefulResourcesQueryResponse,
} from '@/utils/gql'

interface Props {
  pageSeo?: PageSeoModel
  socialMedias: StrapiFindResponse<SocialMediaModel>
  resources: StrapiFindResponse<UsefulResourceModel>
}

const Resources: FC<Props> = ({ socialMedias, resources, pageSeo }) => {
  return (
    <>
      <Seo {...pageSeo} />
      <AppLayout socialMedias={socialMedias}>
        <UsefulResources resources={resources} />
      </AppLayout>
    </>
  )
}

export default Resources

export const getStaticProps: GetStaticProps<Props> = async () => {
  const socialMediasQuery =
    await apolloSsrClient.query<GetAllSocialMediasQueryResponse>({
      query: GET_ALL_SOCIAL_MEDIAS,
    })

  const resourcesQuery =
    await apolloSsrClient.query<GetAllUsefulResourcesQueryResponse>({
      query: GET_ALL_USEFUL_RESOURCES,
    })

  const seo = await apolloSsrClient.query<FindPageSeoResponse>({
    query: FIND_PAGE_SEO,
    variables: {
      slug: '/',
    },
  })

  return {
    props: {
      socialMedias: socialMediasQuery.data.socialMedias,
      resources: resourcesQuery.data.usefulResources,
      pageSeo: seo.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
