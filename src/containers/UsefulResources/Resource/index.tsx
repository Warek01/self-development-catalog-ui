import { FC, memo } from 'react'
import Link from 'next/link'
import Tooltip from 'rc-tooltip'

import { Modal } from 'components'
import tooltipProps from 'constants/tooltipProps'
import { useModal } from 'lib/hooks'
import icons from '@/icons'

interface Props {
  attributes: UsefulResourceModel
  isFavorite: boolean
  onFavoriteClick: () => void
}

const Resource: FC<Props> = ({ attributes, onFavoriteClick, isFavorite }) => {
  const [showModal, setShowModal] = useModal()

  return (
    <>
      {showModal && (
        <Modal>
          <div className="fixed z-50 bg-card-bg/70 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center">
            <div className="relative p-10 bg-card-bg border border-card-border max-w-[80%] md:max-w-[66.6666%] lg:max-w-[50%] xl:max-w-[33.3333%]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 rounded-full hover:bg-transparent"
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
      )}

      <div className="relative bg-card-bg border border-card-border justify-center whitespace-pre-line h-full flex items-center aspect-square">
        <span className="inset-0 absolute top-5 left-5 w-6 h-6 flex gap-6">
          <Tooltip
            {...tooltipProps}
            overlay="Toggle favorite"
          >
            <button
              onClick={onFavoriteClick}
              className="hover:bg-transparent"
            >
              <icons.Pin
                width={28}
                height={28}
                className={isFavorite ? 'fill-black' : 'fill-card-border'}
              />
            </button>
          </Tooltip>
          <Tooltip
            {...tooltipProps}
            overlay="Show information"
          >
            <button
              onClick={() => setShowModal(true)}
              className="hover:bg-transparent"
            >
              <icons.Quotes
                width={28}
                height={28}
              />
            </button>
          </Tooltip>
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
