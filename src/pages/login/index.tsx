import { FC, useCallback, useEffect } from 'react'
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

const LoginPage: FC<Props> = ({ data }) => {
  const router = useRouter()
  const auth = useAuth(false)

  useEffect(() => {
    if (auth.userData !== null) {
      router.push(AppRoute.Home)
    }
  }, [auth])

  const handleLogin = useCallback(async () => {
    const loginResult = await auth.login('test@test.com', 'password')

    if (loginResult) {
      await router.push(AppRoute.Home)
    }
  }, [auth])

  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <button onClick={handleLogin}>Log in</button>
      </AppLayout>
    </>
  )
}

export default LoginPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      data: await getPageData<null>(AppRoute.Resources),
    },
    revalidate: Number(process.env.REVALIDATE_TIMEOUT),
  }
}
