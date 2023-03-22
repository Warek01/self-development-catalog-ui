import { ReactNode } from 'react'

export interface CustomTooltipProps {
  children: ReactNode
  text: string
  hiddenOnMobile?: boolean
}
