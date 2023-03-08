import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { StrapiFindResponse } from '@/types/strapi'
import { AppLayout, Seo, UsefulResources } from '@/components'
import { apolloSsrClient, usefulResourceDocument } from '@/graphql'
import getPageData from '@/utils/getPageData'
import AppRoutes from '@/constants/appRoutes'

interface Props {
  data: PageDataModel<null>
  resources: StrapiFindResponse<UsefulResourceModel>
}

const Resources: FC<Props> = ({ data, resources }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <UsefulResources resources={resources} />
      </AppLayout>
    </>
  )
}

export default Resources

export const getStaticProps: GetStaticProps<Props> = async () => {
  const resourcesQuery = await apolloSsrClient.query<
    GraphqlResponse<'usefulResources', UsefulResourceModel>
  >({
    query: usefulResourceDocument.GetAllUsefulResources,
  })

  return {
    props: {
      data: await getPageData<null>(AppRoutes.resources),
      resources: resourcesQuery.data.usefulResources,
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
