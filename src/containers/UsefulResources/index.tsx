import { FC, useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify'

import { useLocalStorage } from '@/lib/hooks'
import { withInfiniteScroll } from '@/hocs'
import { usefulResourceDocument } from '@/graphql'
import useAbortController from '@/lib/hooks/useAbortController'
import type { ResourcesContextProps, UsefulResourcesProps } from './interface'
import ResourcesList from './ResourcesList'
import usefulResourcesContext from './usefulResourcesContext'

const FETCH_LIMIT = 3

const UsefulResources: FC<UsefulResourcesProps> = ({
  totalUsefulResources,
}) => {
  const signal = useAbortController()
  const [favResourcesIds, setFavResourcesIds] = useLocalStorage<number[]>(
    'favorite-resources',
    [],
  )

  const resourcesContextValue = useMemo<ResourcesContextProps>(
    () => ({
      favResourcesIds,
      setFavResourcesIds,
    }),
    [favResourcesIds, setFavResourcesIds],
  )

  const resourcesQuery = useQuery<
    GraphqlResponse<'usefulResources', UsefulResourceModel>,
    { start: number; limit: number }
  >(usefulResourceDocument.GetUsefulResources, {
    variables: {
      start: 0,
      limit: FETCH_LIMIT,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    initialFetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    context: {
      fetchOptions: {
        signal,
      },
    },
  })

  if (resourcesQuery.error) {
    console.error(resourcesQuery.error)
    toast('Something went wrong', {
      type: 'error',
    })
  }

  const hasMore =
    resourcesQuery.data?.usefulResources.data.length !== totalUsefulResources

  const handleLoadMoreResources = useCallback(() => {
    const length = resourcesQuery.data?.usefulResources.data.length

    if (typeof length !== 'number') {
      return
    }

    resourcesQuery.fetchMore({
      variables: {
        start: length,
        limit: FETCH_LIMIT,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult
        }
        return {
          usefulResources: {
            data: [
              ...prevResult.usefulResources.data,
              ...fetchMoreResult.usefulResources.data,
            ],
          },
        }
      },
    })
  }, [resourcesQuery])

  const ResourcesListWithInfiniteScroll = withInfiniteScroll(ResourcesList, {
    threshold: 0.5,
    action: handleLoadMoreResources,
    hasMore,
  })

  return (
    <usefulResourcesContext.Provider value={resourcesContextValue}>
      <div className="my-12">
        <header className="pl-12 md:pl-0 pb-6 md:pb-0 text-2xl font-semibold">
          Useful resources
        </header>
        <main className="">
          <ResourcesListWithInfiniteScroll
            resources={resourcesQuery.data?.usefulResources.data ?? []}
            isLoading={hasMore}
          />
        </main>
      </div>
    </usefulResourcesContext.Provider>
  )
}

export default UsefulResources
