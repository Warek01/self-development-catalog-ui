import { createContext } from 'react'

import type { SideMenuContextProps } from './interface'

const sideMenuContext = createContext<SideMenuContextProps>({
  close: () => null,
  open: () => null,
  isOpen: false,
})

export default sideMenuContext
