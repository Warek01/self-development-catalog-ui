import { Dispatch, SetStateAction } from 'react'

interface ResourcesContextProps {
  favResourcesIds: number[]
  setFavResourcesIds: Dispatch<SetStateAction<number[]>>
}

export interface UsefulResourcesProps {
  totalUsefulResources: number
}
