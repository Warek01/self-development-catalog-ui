import type { StrapiEntity } from '@/types/strapi'

const isStrapiEntity = <T>(obj: unknown): obj is StrapiEntity<T> => {
  return (
    typeof obj === 'object' &&
    'id' in obj! &&
    (typeof obj!['id'] === 'number' || typeof obj!['id'] === 'string') &&
    'attributes' in obj! &&
    typeof obj!['attributes'] === 'object'
  )
}

export default isStrapiEntity
