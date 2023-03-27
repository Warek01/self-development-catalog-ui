import { createRef, FC, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/lib/hooks'
import AppRoute from '@/constants/AppRoute'
import { TextInput } from '@/components/forms'
import Link from 'next/link'
import isValidEmail from '@/lib/isValidEmail'
import { log } from 'next/dist/server/typescript/utils'

const MIN_PASSWORD_LENGTH = 6

const LoginForm: FC = () => {
  const auth = useAuth()
  const router = useRouter()

  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false)

  const loginRefs = useMemo(
    () => ({
      email: createRef<HTMLInputElement>(),
      password: createRef<HTMLInputElement>(),
    }),
    [],
  )

  const handleLogin = useCallback(async () => {
    let loginSuccess = true

    const email = loginRefs.email.current?.value ?? ''
    const password = loginRefs.password.current?.value ?? ''

    if (!isValidEmail(email)) {
      setIsInvalidEmail(true)
      loginSuccess = false
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setIsInvalidPassword(true)
      loginSuccess = false
    }

    if (!loginSuccess) {
      return
    }

    loginSuccess = await auth.login(email, password)

    if (loginSuccess) {
      await router.push(AppRoute.Home)
    }
  }, [auth])

  return (
    <main className="mx-auto max-w-3xl p-12 flex flex-col gap-6 items-center bg-card-bg dark:bg-card-bg-dark rounded-xl">
      <label htmlFor="Email">
        <TextInput
          name="Email"
          placeholder="Email"
          className="w-full sm:w-xs md:w-sm lg:w-md"
          autoComplete
          ref={loginRefs.email}
          onChange={() => setIsInvalidEmail(false)}
        />
        <p
          className={`${
            isInvalidEmail ? '' : 'hidden'
          } text-red-600 text-xs pl-4 pt-1`}
        >
          Invalid email.
        </p>
      </label>
      <label htmlFor="Password">
        <TextInput
          password
          name="Password"
          placeholder="Password"
          className="w-full sm:w-xs md:w-sm lg:w-md"
          autoComplete
          ref={loginRefs.password}
          onChange={() => setIsInvalidPassword(false)}
        />
        <p
          className={`${
            isInvalidPassword ? '' : 'hidden'
          } text-red-600 text-xs pl-4 pt-1`}
        >
          Password is shorter than {MIN_PASSWORD_LENGTH} characters.
        </p>
      </label>
      <button
        onClick={handleLogin}
        className="py-2 px-4 rounded-md"
      >
        Log in
      </button>
      <Link href={AppRoute.Register}>Register</Link>
    </main>
  )
}

export default LoginForm
