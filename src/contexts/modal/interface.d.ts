export type ModalType = 'text'

export interface ModalContextProps {
  show: (content: string, type: ModalType) => void
  close: () => void
  isShown: boolean
}
