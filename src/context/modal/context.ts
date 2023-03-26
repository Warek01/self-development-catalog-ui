import { createContext, Context } from 'react'
import { ModalContextProps } from '@/context/modal/interface'

const modalContext: Context<ModalContextProps> =
  createContext<ModalContextProps>({
    isShown: false,
    show: () => null,
    close: () => null,
  })

export default modalContext
