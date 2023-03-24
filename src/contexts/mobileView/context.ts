import { Context, createContext } from 'react'

import type { MobileViewContextProps } from '@/contexts/mobileView/interface'

const mobileViewContext: Context<MobileViewContextProps> =
  createContext<MobileViewContextProps>({
    isMobile: false,
  })

export default mobileViewContext
