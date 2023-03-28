import { StrapiFindResponse } from '@/types/models'

const isStrapiFindResponse = <T>(obj: unknown): obj is StrapiFindResponse<T> => {
  return typeof obj === 'object' && 'data' in obj! && Array.isArray(obj!['data'])
}

export default isStrapiFindResponse
