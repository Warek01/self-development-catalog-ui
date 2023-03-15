import { createContext } from 'react'

export interface ResponsiveContextProps {
  isMobileView: boolean
}

const responsiveContext = createContext<ResponsiveContextProps>({
  isMobileView: false,
})

export default responsiveContext
