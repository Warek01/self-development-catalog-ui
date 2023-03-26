import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import authContext from '@/context/auth/context'
import { AuthContextProps } from '@/context/auth/interface'
import AppRoute from '@/constants/AppRoute'

const useAuth = (guarded: boolean = false): AuthContextProps => {
  const router = useRouter()
  const auth = useContext(authContext)

  useEffect(() => {
    if (!router.isReady || !guarded) {
      return
    }

    if (auth.userData === null) {
      const redirect = async () => {
        try {
          await router.push(AppRoute.Login)
        } catch (err) {
          toast('Something went wrong', { type: 'error' })
          console.error(err)
        }
      }

      redirect()
    }
  }, [router.isReady, auth])

  return auth
}

export default useAuth
