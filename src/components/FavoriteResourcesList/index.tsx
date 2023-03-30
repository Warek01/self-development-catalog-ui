import { FC, memo } from 'react'

import type { StrapiEntity, UsefulResourceModel } from '@/types/models'
import icons from '@/icons'
import { Spinner, UsefulResource } from '@/components'

interface Props {
  resources: StrapiEntity<UsefulResourceModel>[]
  resourcesLength: number
  onFavoriteClick: (id: number) => void | Promise<void>
}

const FavoriteResourcesList: FC<Props> = ({
  resourcesLength,
  onFavoriteClick,
  resources,
}) => {
  const loadingElements: JSX.Element[] = []
  for (let i = 0; i < resourcesLength - resources.length; i++) {
    loadingElements.push(
      <li
        key={i}
        className="flex flex-1 items-center justify-center aspect-square"
      >
        <Spinner size={64} />
      </li>,
    )
  }

  return resourcesLength !== 0 ? (
    <main className="pb-32 md:pb-16">
      <div className="px-12 md:px-0 py-4">
        <icons.Star
          width={32}
          height={32}
          className="fill-black hidden md:block"
        />
        <icons.Star
          width={48}
          height={48}
          className="fill-black md:hidden"
        />
      </div>
      <ul className="grid grid-cols-1 px-12 gap-12 md:px-0 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {resources.map(({ id, attributes }) => (
          <li key={id}>
            <UsefulResource
              attributes={attributes}
              isFavorite={true}
              onFavoriteClick={() => onFavoriteClick(id)}
            />
          </li>
        ))}
        {loadingElements}
      </ul>
    </main>
  ) : null
}

export default memo(FavoriteResourcesList)
