import { FC } from 'react'
import { GetStaticProps } from 'next'

import type { PageDataModel } from '@/types/models'
import { Seo, UserInfo } from '@/components'
import { AppLayout } from '@/containers'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import useAuth from '@/lib/hooks/useAuth'

interface Props {
  data: PageDataModel<null>
}

const MePage: FC<Props> = ({ data }) => {
  useAuth(true)

  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <UserInfo />
      </AppLayout>
    </>
  )
}

export default MePage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      data: await getPageData<null>(AppRoute.Me),
    },
  }
}
