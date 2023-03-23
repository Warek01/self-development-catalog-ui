import { FC } from 'react'
import { GetStaticProps } from 'next'

import { Seo } from '@/components'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import { AppLayout, UsefulResources } from '@/containers'
import { usefulResourceDocument } from '@/graphql'
import { apolloSsrClient } from '@/graphql/client'

interface Props {
  totalUsefulResources: number
  data: PageDataModel<null>
}

const Resources: FC<Props> = ({ data, totalUsefulResources }) => {
  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <UsefulResources totalUsefulResources={totalUsefulResources} />
      </AppLayout>
    </>
  )
}

export default Resources

export const getStaticProps: GetStaticProps<Props> = async () => {
  const totalUsefulResourcesQuery = await apolloSsrClient.query<{
    usefulResources: { meta: { pagination: { total: number } } }
  }>({
    query: usefulResourceDocument.GetTotalUsefulResources,
  })

  return {
    props: {
      totalUsefulResources:
        totalUsefulResourcesQuery.data.usefulResources.meta.pagination.total,
      data: await getPageData<null>(AppRoute.Resources),
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
