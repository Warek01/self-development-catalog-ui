import { FC, useCallback } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { Seo } from '@/components'
import { AppLayout } from '@/containers'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import useAuth from '@/lib/hooks/useAuth'

interface Props {
  data: PageDataModel<null>
}

const MePage: FC<Props> = ({ data }) => {
  const auth = useAuth(true)
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    const logoutResult = await auth.logout()

    if (logoutResult) {
      await router.push(AppRoute.Login)
    }
  }, [auth.logout])

  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        {auth.userData?.user.username || 'Nothing to show'}
        <button onClick={handleLogout}>Log Out</button>
      </AppLayout>
    </>
  )
}

export default MePage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      data: await getPageData<null>(AppRoute.Resources),
    },
  }
}
