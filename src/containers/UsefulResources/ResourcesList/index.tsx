import { FC, memo, useContext } from 'react'

import type { StrapiEntity } from '@/types/strapi'
import type { WithInfiniteScrollProps } from '@/hocs/withInfiniteScroll/interface'
import { Spinner } from '@/components'
import usefulResourcesContext from '../usefulResourcesContext'
import Resource from '../Resource'

interface Props extends WithInfiniteScrollProps {
  resources: StrapiEntity<UsefulResourceModel>[]
  isLoading: boolean
}

const ResourcesList: FC<Props> = ({ resources, lastElementRef, isLoading }) => {
  const { favResourcesIds, setFavResourcesIds } = useContext(
    usefulResourcesContext,
  )

  const resourcesElements: JSX.Element[] = resources
    .slice(0, -1)
    .map(({ id, attributes }) => (
      <li key={id}>
        <Resource
          attributes={attributes}
          isFavorite={favResourcesIds.includes(id)}
          onFavClick={() =>
            setFavResourcesIds((list) =>
              list.includes(id)
                ? list.filter((favId) => favId !== id)
                : [...list, id],
            )
          }
        />
      </li>
    ))

  const lastResource = resources.at(-1)

  if (lastResource) {
    resourcesElements.push(
      <li
        key={lastResource.id}
        ref={(instance) => (lastElementRef.current = instance)}
      >
        <Resource
          attributes={lastResource.attributes}
          isFavorite={favResourcesIds.includes(lastResource.id)}
          onFavClick={() =>
            setFavResourcesIds((list) =>
              list.includes(lastResource.id)
                ? list.filter((favId) => favId !== lastResource.id)
                : [...list, lastResource.id],
            )
          }
        />
      </li>,
    )
  }

  return (
    <ul className="grid grid-cols-1 px-12 gap-12 md:px-0 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      {resourcesElements}

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center aspect-square">
          <Spinner size={64} />
        </div>
      ) : null}
    </ul>
  )
}

export default memo(ResourcesList)
