import { ComponentType, FC, useEffect, useMemo, useRef } from 'react'

import type {
  WithInfiniteScrollReturnType,
  WithInfiniteScrollProps,
  WithInfiniteScrollOptions,
  RefObjectType,
} from './interface'

const withInfiniteScroll = <
  T extends WithInfiniteScrollProps = WithInfiniteScrollProps,
>(
  WrappedComponent: ComponentType<T>,
  options: WithInfiniteScrollOptions = {},
): WithInfiniteScrollReturnType<T> => {
  const lastElementRef: RefObjectType = useRef(null)

  const displayName = useMemo(
    () => WrappedComponent.displayName || WrappedComponent.name || 'Component',
    [WrappedComponent],
  )

  const ComponentWithInfiniteScroll: FC<
    Omit<T, keyof WithInfiniteScrollProps>
  > = useMemo(
    () => (props) => {
      const { threshold = 0.5, action = () => null, hasMore = true } = options

      useEffect(() => {
        if (!lastElementRef.current) {
          return
        }

        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]

            if (entry.isIntersecting && hasMore) {
              action()
            }
          },
          { threshold },
        )

        observer.observe(lastElementRef.current)

        return () => {
          observer.disconnect()
        }
      }, [lastElementRef.current])

      return (
        <WrappedComponent
          {...(props as T)}
          lastElementRef={lastElementRef}
        />
      )
    },
    [WrappedComponent, options],
  )

  ComponentWithInfiniteScroll.displayName = `withInfiniteScroll(${displayName})`

  return ComponentWithInfiniteScroll
}

export default withInfiniteScroll
