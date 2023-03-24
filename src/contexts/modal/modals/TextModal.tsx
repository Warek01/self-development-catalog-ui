import { FC, memo } from 'react'
import icons from '@/icons'
import { Modal } from '@/components'

interface Props {
  text: string
  close: () => void
}

const TextModal: FC<Props> = ({ text, close }) => {
  return (
    <Modal>
      <div className="fixed z-50 bg-card-bg/70 dark:bg-card-bg-dark/80 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center">
        <div className="relative text-lg md:text-base p-10 bg-card-bg dark:bg-card-bg-dark border border-card-border max-w-[80%] md:max-w-[66.6666%] lg:max-w-[50%] xl:max-w-[33.3333%]">
          <button
            onClick={() => close()}
            className="absolute p-3 md:p-2 lg:p-1 top-3 right-3 rounded-full text-black dark:text-dark-white"
          >
            <icons.Close
              width={24}
              height={24}
              className="fill-black"
            />
          </button>
          {text}
        </div>
      </div>
    </Modal>
  )
}

export default memo(TextModal)
