import type { FC } from 'react'

export type ProviderObject = {
  Component: FC<any>
  props: any
}

export type ComposedProvider = FC<any> | ProviderObject
