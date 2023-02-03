import { FC } from 'react'

import type { StrapiFindResponse } from 'types/strapi'

import Resource from './Resource'
import { useLocalStorage } from 'utils/hooks'

interface Props {
  resources: StrapiFindResponse<UsefulResourceModel>
}

const UsefulResources: FC<Props> = ({ resources }) => {
  const [favoriteResourcesIds, setFavoriteResourcesIds] = useLocalStorage<
    number[]
  >('favorite-resources', [])

  return (
    <div className="my-12">
      <header className="text-2xl font-semibold">Useful resources</header>
      <main className="">
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {resources.data
            .filter((resource) => favoriteResourcesIds.includes(resource.id))
            .map((resource) => (
              <li key={resource.id}>
                <Resource
                  attributes={resource.attributes}
                  isFavorite={true}
                  onFavClick={() =>
                    setFavoriteResourcesIds((list) =>
                      list.filter((id) => id !== resource.id),
                    )
                  }
                />
              </li>
            ))}
          {resources.data
            .filter((resource) => !favoriteResourcesIds.includes(resource.id))
            .map((resource) => (
              <li key={resource.id}>
                <Resource
                  attributes={resource.attributes}
                  isFavorite={false}
                  onFavClick={() =>
                    setFavoriteResourcesIds((list) => [...list, resource.id])
                  }
                />
              </li>
            ))}
        </ul>
      </main>
    </div>
  )
}

export default UsefulResources
