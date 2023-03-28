import { Context, createContext } from 'react'

import { AuthContextProps } from '@/context/auth/interface'
import login from '@/pages/login'
import register from '@/pages/register'

const authContext: Context<AuthContextProps> = createContext<AuthContextProps>({
  userData: null,
  userLoaded: false,
  login: async () => false,
  logout: async () => false,
  register: async () => false,
})

export default authContext
