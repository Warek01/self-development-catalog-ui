import { FC, memo, useCallback } from 'react'

import { useAuth } from '@/lib/hooks'
import icons from '@/icons'
import { useRouter } from 'next/router'
import AppRoute from '@/constants/AppRoute'

const UserInfo: FC = () => {
  const auth = useAuth()
  const user = auth.userData?.user

  const router = useRouter()

  const handleLogout = useCallback(async () => {
    const logoutResult = await auth.logout()

    if (logoutResult) {
      await router.push(AppRoute.Login)
    }
  }, [auth.logout])

  if (!user) {
    return (
      <div className="w-full flex justify-center my-auto">
        <icons.Spinner
          width={56}
          height={56}
          className="animate-spin"
        />
      </div>
    )
  }

  return (
    <main className="mx-auto my-auto sm:w-sm w-full p-8 shadow-xl rounded-xl flex flex-col items-start gap-12 dark:bg-dark-white/5">
      <section>
        <div className="flex items-center mb-1">
          <span className="text-base lg:text-sm">Username</span>
          <span className="pl-3 text-link-blue text-base sm:text-sm lg:text-xs cursor-pointer">
            change
          </span>
        </div>
        <p className="text-lg lg:text-base">{user.username}</p>

        <div className="flex items-center mt-10 lg:mt-6 mb-1">
          <span className="text-base sm:text-sm lg:text-xs">Email</span>
        </div>
        <p className="text-lg lg:text-base">{user.email}</p>
        <p className="mt-8 lg:mt-4 text-link-blue text-base sm:text-sm lg:text-xs cursor-pointer">
          Change password
        </p>
      </section>
      <section className="flex justify-center w-full">
        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded-lg shadow-lg hover:shadow-xl"
        >
          Log Out
        </button>
      </section>
    </main>
  )
}

export default memo(UserInfo)
