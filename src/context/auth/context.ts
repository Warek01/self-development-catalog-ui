import { Context, createContext } from 'react'

import { AuthContextProps } from '@/context/auth/interface'

const authContext: Context<AuthContextProps> = createContext<AuthContextProps>({
  userData: null,
  login: async () => false,
  logout: async () => false,
  register: async () => false,
})

export default authContext
