import { createContext } from 'react'

export interface SideMenuContextProps {
  open: () => void
  close: () => void
  isOpen: boolean
}

const sideMenuContext = createContext<SideMenuContextProps>({
  close: () => null,
  open: () => null,
  isOpen: false,
})

export default sideMenuContext
