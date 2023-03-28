import { FC, memo, useContext } from 'react'
import Link from 'next/link'

import icons from '@/icons'
import { CustomTooltip } from '@/containers'
import { modalContext } from '@/context'

interface Props {
  attributes: UsefulResourceModel
  isFavorite: boolean
  onFavoriteClick: () => void
}

const UsefulResource: FC<Props> = ({ attributes, onFavoriteClick, isFavorite }) => {
  const modal = useContext(modalContext)

  return (
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
            onClick={() => modal.show(attributes.description, 'text')}
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
  )
}

export default memo(UsefulResource, (oldProps, newProps) => {
  return (
    oldProps.isFavorite === newProps.isFavorite &&
    oldProps.onFavoriteClick === newProps.onFavoriteClick
  )
})
