import type { BlogCategoryModel, StrapiEntity } from '@/types/models'

export interface BlogOptionsFormProps {
  categories: StrapiEntity<BlogCategoryModel>[]
}
