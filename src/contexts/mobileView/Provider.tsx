import { FC, PropsWithChildren, useMemo, useState } from 'react'

import { useBreakpointCallback } from '@/lib/hooks'
import type { MobileViewContextProps } from './interface'
import mobileViewContext from './context'

const MobileViewContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useBreakpointCallback({
    Lg: {
      callback: ({ matches }) => setIsMobileView(matches),
      initCall: true,
    },
  })

  const contextValue = useMemo<MobileViewContextProps>(
    () => ({
      isMobile: isMobileView,
    }),
    [isMobileView],
  )

  return (
    <mobileViewContext.Provider value={contextValue}>
      {children}
    </mobileViewContext.Provider>
  )
}

export default MobileViewContextProvider
