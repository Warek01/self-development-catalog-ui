import { FC, MutableRefObject } from 'react'

export interface WithInfiniteScrollOptions {
  threshold?: number
  action?: () => void | null | Promise<void | null>
  hasMore?: boolean
}

export interface WithInfiniteScrollProps {
  lastElementRef: RefObjectType
}

export type RefObjectType = MutableRefObject<HTMLElement | null | undefined>

export type WithInfiniteScrollReturnType<
  T extends WithInfiniteScrollProps = WithInfiniteScrollProps,
> = FC<Omit<T, keyof WithInfiniteScrollProps>>
