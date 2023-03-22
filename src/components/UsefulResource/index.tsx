import { FC, memo, useMemo } from 'react'
import Link from 'next/link'

import { Modal } from '@/components'
import { useModal } from '@/lib/hooks'
import icons from '@/icons'
import { CustomTooltip } from '@/containers'

interface Props {
  attributes: UsefulResourceModel
  isFavorite: boolean
  onFavoriteClick: () => void
}

const Resource: FC<Props> = ({ attributes, onFavoriteClick, isFavorite }) => {
  const [showModal, setShowModal] = useModal()

  const modalDescriptionElement = useMemo(
    () =>
      showModal && (
        <Modal>
          <div className="fixed z-50 bg-card-bg/70 dark:bg-card-bg-dark/80 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center">
            <div className="relative text-lg md:text-base p-10 bg-card-bg dark:bg-card-bg-dark border border-card-border max-w-[80%] md:max-w-[66.6666%] lg:max-w-[50%] xl:max-w-[33.3333%]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute p-3 md:p-2 lg:p-1 top-3 right-3 rounded-full text-black dark:text-dark-white"
              >
                <icons.Close
                  width={24}
                  height={24}
                  className="fill-black"
                />
              </button>
              {attributes.description}
            </div>
          </div>
        </Modal>
      ),
    [showModal],
  )

  return (
    <>
      {modalDescriptionElement}
      <div className="relative bg-card-bg border border-card-border justify-center whitespace-pre-line h-full flex items-center aspect-square">
        <span className="inset-0 absolute top-5 left-5 w-6 h-6 flex gap-6">
          <CustomTooltip text="Toggle favorite">
            <button
              onClick={onFavoriteClick}
              className="hover:bg-transparent"
            >
              <icons.Pin
                width={28}
                height={28}
                className={
                  isFavorite
                    ? 'fill-black dark:fill-black'
                    : 'fill-card-border dark:fill-card-border'
                }
              />
            </button>
          </CustomTooltip>
          <CustomTooltip text="Show information">
            <button
              onClick={() => setShowModal(true)}
              className="hover:bg-transparent"
            >
              <icons.Quotes
                width={28}
                height={28}
                className="fill-black dark:fill-black"
              />
            </button>
          </CustomTooltip>
        </span>
        <Link
          href={attributes.link}
          target="_blank"
          className="text-lg w-full text-center font-bold px-6"
        >
          {attributes.title}
        </Link>
      </div>
    </>
  )
}

export default memo(Resource, (oldProps, newProps) => {
  return (
    oldProps.isFavorite === newProps.isFavorite &&
    oldProps.onFavoriteClick === newProps.onFavoriteClick
  )
})
