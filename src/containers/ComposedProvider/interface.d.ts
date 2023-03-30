import type { FC } from 'react'

export type ProviderObject = {
  Component: FC<any>
  props: any
}

export type ComposedProviderType = FC<any> | ProviderObject
