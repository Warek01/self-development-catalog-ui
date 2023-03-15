import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify'

import { useLocalStorage, useResponsiveCallback } from '@/lib/hooks'
import { withInfiniteScroll } from '@/hocs'
import { usefulResourceDocument } from '@/graphql'
import useAbortController from '@/lib/hooks/useAbortController'
import displayBreakpoints from '@/constants/displayBreakpoints'
import type { ResourcesContextProps, UsefulResourcesProps } from './interface'
import ResourcesList from './ResourcesList'
import usefulResourcesContext from './usefulResourcesContext'
import FavoriteResourcesList from './FavoriteResourcesList'

const UsefulResources: FC<UsefulResourcesProps> = ({
  totalUsefulResources,
}) => {
  const signal = useAbortController()
  const [favResourcesIds, setFavResourcesIds] = useLocalStorage<number[]>(
    'favorite-resources',
    [],
  )

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchLimit, setFetchLimit] = useState<number>(1)

  const resourcesContextValue = useMemo<ResourcesContextProps>(
    () => ({
      favResourcesIds,
      setFavResourcesIds,
    }),
    [favResourcesIds, setFavResourcesIds],
  )

  const usefulResourcesQuery = useQuery<
    GraphqlResponse<'usefulResources', UsefulResourceModel>,
    { start: number; limit: number }
  >(usefulResourceDocument.GetUsefulResources, {
    variables: {
      start: 0,
      limit: fetchLimit,
    },
    context: {
      fetchOptions: {
        signal,
      },
    },
    onCompleted() {
      setIsLoading(false)
    },
    onError(error) {
      console.error(error)
      toast('Something went wrong', {
        type: 'error',
      })
    },
  })

  const handleLoadMoreResources = useCallback(() => {
    const length = usefulResourcesQuery.data?.usefulResources.data.length

    if (
      typeof length !== 'number' ||
      usefulResourcesQuery.loading ||
      isLoading
    ) {
      return
    }

    setIsLoading(true)
    usefulResourcesQuery.fetchMore({
      updateQuery: (previousQueryResult, options) => {
        if (!options.fetchMoreResult) {
          return previousQueryResult
        }

        return {
          usefulResources: {
            data: [
              ...previousQueryResult.usefulResources.data,
              ...options.fetchMoreResult.usefulResources.data,
            ],
          },
        }
      },
      variables: {
        start: length,
        limit: fetchLimit,
      },
    })
  }, [usefulResourcesQuery, isLoading, fetchLimit])

  const ResourcesListWithInfiniteScroll = withInfiniteScroll(ResourcesList, {
    threshold: 0.75,
    action: handleLoadMoreResources,
    hasMore:
      (usefulResourcesQuery.data?.usefulResources.data.length ?? 0) <
      totalUsefulResources,
  })

  const favoriteUsefulResourcesQuery = useQuery<
    GraphqlResponse<'usefulResources', UsefulResourceModel>,
    { ids: number[] }
  >(usefulResourceDocument.FindUsefulResources, {
    variables: {
      ids: favResourcesIds,
    },
    context: {
      fetchOptions: {
        signal,
      },
    },
  })

  const handleRemoveFromFavorites = useCallback(
    (id: number) => {
      const filteredIds = favResourcesIds.filter((favId) => favId !== id)
      setFavResourcesIds(filteredIds)
      favoriteUsefulResourcesQuery.refetch({
        ids: filteredIds,
      })
    },
    [setFavResourcesIds, favoriteUsefulResourcesQuery, favResourcesIds],
  )

  useResponsiveCallback({
    md: () => setFetchLimit(2),
    xl: () => setFetchLimit(3),
  })

  useEffect(() => {
    setFetchLimit(
      document.body.clientWidth > displayBreakpoints.xl
        ? 3
        : document.body.clientWidth > displayBreakpoints.md
        ? 2
        : 1,
    )
  }, [])

  return (
    <usefulResourcesContext.Provider value={resourcesContextValue}>
      <div className="my-12">
        <header className="pl-12 md:pl-0 pb-6 md:pb-0 text-2xl font-semibold">
          Useful resources
        </header>
        <main>
          <FavoriteResourcesList
            resourcesLength={favResourcesIds.length}
            onFavoriteClick={handleRemoveFromFavorites}
            resources={
              favoriteUsefulResourcesQuery.data?.usefulResources.data ?? []
            }
          />
          <ResourcesListWithInfiniteScroll
            resources={usefulResourcesQuery.data?.usefulResources.data ?? []}
            isLoading={isLoading}
          />
        </main>
      </div>
    </usefulResourcesContext.Provider>
  )
}

export default UsefulResources
