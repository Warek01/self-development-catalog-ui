import { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, UsefulResources } from '@/components'
import {
  apolloSsrClient,
  GET_ALL_SOCIAL_MEDIAS,
  GetAllSocialMediasQueryResponse,
  GET_ALL_USEFUL_RESOURCES,
  GetAllUsefulResourcesQueryResponse,
} from '@/utils/gql'

interface Props {
  socialMedias: StrapiFindResponse<SocialMediaModel>
  resources: StrapiFindResponse<UsefulResourceModel>
}

const Resources: FC<Props> = ({ socialMedias, resources }) => {
  return (
    <>
      <Head>
        <title>Useful resources</title>
      </Head>
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

  return {
    props: {
      socialMedias: socialMediasQuery.data.socialMedias,
      resources: resourcesQuery.data.usefulResources,
    },
    revalidate: 60,
  }
}
