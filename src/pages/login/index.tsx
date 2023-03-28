import { FC, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import type { PageDataModel } from '@/types/models'
import { AppLayout } from '@/containers'
import getPageData from '@/lib/getPageData'
import AppRoute from '@/constants/AppRoute'
import useAuth from '@/lib/hooks/useAuth'
import { Seo } from '@/components'
import { LoginForm } from '@/components/forms'

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

  return (
    <>
      <Seo {...data.seo} />
      <AppLayout socialMedias={data.socialMedias}>
        <LoginForm />
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
