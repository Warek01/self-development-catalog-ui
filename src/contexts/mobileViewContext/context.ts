import { Context, createContext } from 'react'

import type { MobileViewContextProps } from '@/contexts/mobileViewContext/interface'

const mobileViewContext: Context<MobileViewContextProps> =
  createContext<MobileViewContextProps>({
    isMobile: false,
  })

export default mobileViewContext
