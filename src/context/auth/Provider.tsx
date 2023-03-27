import { FC, useMemo, PropsWithChildren, useCallback } from 'react'
import { toast } from 'react-toastify'
import { ApolloError } from '@apollo/client'
import { userDocument } from '@/graphql'

import { useLocalStorage } from '@/lib/hooks'
import { apolloClient } from '@/graphql/client'
import ApolloErrorMessage from '@/constants/ApolloErrorMessage'
import type {
  AuthContextProps,
  LoginResponse,
  RegisterResponse,
  UserData,
} from './interface'
import authContext from './context'

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage<UserData | null>('user', null)

  const handleLogin = useCallback(
    async (ident: string, pass: string): Promise<boolean> => {
      try {
        const loginReq = await apolloClient.mutate<
          LoginResponse,
          { ident: string; pass: string }
        >({
          mutation: userDocument.Login,
          variables: {
            ident,
            pass,
          },
        })

        const userData = loginReq.data?.login

        if (!userData) {
          throw new Error('User data is null')
        }

        setUserData(userData)

        return true
      } catch (err) {
        if (
          err instanceof ApolloError &&
          err.message === ApolloErrorMessage.Login
        ) {
          toast(ApolloErrorMessage.Login)
        } else {
          toast('Something went wrong.', { type: 'error' })
        }

        console.error(err)
        return false
      }
    },
    [setUserData],
  )

  const handleLogout = useCallback(async (): Promise<boolean> => {
    try {
      setUserData(null)
      return true
    } catch (err) {
      toast('Something went wrong.', { type: 'error' })
      console.error(err)
      return false
    }
  }, [setUserData])

  const handleRegister = useCallback(
    async (email: string, pass: string, username: string): Promise<boolean> => {
      try {
        const registerReq = await apolloClient.mutate<
          RegisterResponse,
          { username: string; pass: string; email: string }
        >({
          mutation: userDocument.Register,
          variables: {
            email,
            username,
            pass,
          },
        })

        const userData = registerReq.data?.register

        if (!userData) {
          throw new Error('User data is null')
        }

        setUserData(userData)
        return true
      } catch (err) {
        if (
          err instanceof ApolloError &&
          err.message === ApolloErrorMessage.IdentifierTaken
        ) {
          toast(ApolloErrorMessage.IdentifierTaken)
        } else {
          toast('Something went wrong.', { type: 'error' })
        }

        console.error(err)
        return false
      }
    },
    [setUserData],
  )

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      userData,
      register: handleRegister,
      logout: handleLogout,
      login: handleLogin,
    }),
    [userData, setUserData],
  )

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  )
}

export default AuthContextProvider
