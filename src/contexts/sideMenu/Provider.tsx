import { FC, PropsWithChildren, useMemo, useState } from 'react'

import type { SideMenuContextProps } from './interface'
import sideMenuContext from './context'

const SideMenuContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)

  const contextValue = useMemo<SideMenuContextProps>(
    () => ({
      isOpen: isSideMenuOpen,
      open: () => setIsSideMenuOpen(true),
      close: () => setIsSideMenuOpen(false),
    }),
    [isSideMenuOpen],
  )

  return (
    <sideMenuContext.Provider value={contextValue}>
      {children}
    </sideMenuContext.Provider>
  )
}

export default SideMenuContextProvider
