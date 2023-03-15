import { Context, createContext } from 'react'

import type { ResourcesContextProps } from './interface'

const usefulResourcesContext: Context<ResourcesContextProps> =
  createContext<ResourcesContextProps>({
    favResourcesIds: [],
    setFavResourcesIds: () => null,
  })

export default usefulResourcesContext
