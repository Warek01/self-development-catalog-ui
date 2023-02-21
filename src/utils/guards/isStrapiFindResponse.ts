import type { StrapiEntity } from '@/types/strapi'

const isStrapiFindResponse = <T>(obj: unknown): obj is StrapiEntity<T> => {
  return (
    typeof obj === 'object' && 'data' in obj! && Array.isArray(obj!['data'])
  )
}

export default isStrapiFindResponse
