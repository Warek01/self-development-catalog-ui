import { FC, PropsWithChildren, useMemo, useState } from 'react'

import type { ModalContextProps } from './interface'
import modalContext from './context'
import TextModal from './modals/TextModal'

const ModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalElement, setModalElement] = useState<JSX.Element | null>(null)

  const contextValue = useMemo<ModalContextProps>(
    () => ({
      isShown: modalElement !== null,
      show(content, type = 'text') {
        switch (type) {
          case 'text':
            setModalElement(
              <TextModal
                text={content.toString()}
                close={this.close}
              />,
            )
            break
          default:
            setModalElement(null)
        }
      },
      close() {
        setModalElement(null)
      },
    }),
    [modalElement],
  )

  return (
    <>
      {modalElement}
      <modalContext.Provider value={contextValue}>{children}</modalContext.Provider>
    </>
  )
}

export default ModalContextProvider
