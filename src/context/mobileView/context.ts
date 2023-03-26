import { Context, createContext } from 'react'

import type { MobileViewContextProps } from '@/context/mobileView/interface'

const mobileViewContext: Context<MobileViewContextProps> =
  createContext<MobileViewContextProps>({
    isMobile: false,
  })

export default mobileViewContext
