import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, Seo, UsefulResources } from '@/components'
import {
  apolloSsrClient,
  pageSeoDocument,
  usefulResourceDocument,
  socialMediaDocument,
} from '@/graphql'

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
  const socialMediasQuery = await apolloSsrClient.query<
    GraphqlResponse<'socialMedias', SocialMediaModel>
  >({
    query: socialMediaDocument.GetAllSocialMedias,
  })

  const resourcesQuery = await apolloSsrClient.query<
    GraphqlResponse<'usefulResources', UsefulResourceModel>
  >({
    query: usefulResourceDocument.GetAllUsefulResources,
  })

  const pageSeoQuery = await apolloSsrClient.query<
    GraphqlResponse<'pageSeos', PageSeoModel>
  >({
    query: pageSeoDocument.FindPageSeo,
    variables: {
      slug: '/',
    },
  })

  return {
    props: {
      socialMedias: socialMediasQuery.data.socialMedias,
      resources: resourcesQuery.data.usefulResources,
      pageSeo: pageSeoQuery.data.pageSeos.data?.at(0)?.attributes,
    },
    revalidate: 60,
  }
}
