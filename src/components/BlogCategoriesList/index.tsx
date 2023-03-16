import { FC, memo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import type { StrapiEntity, StrapiFindResponse } from '@/types/strapi'
import { useRenderState } from '@/lib/hooks'
import { isStrapiEntity } from '@/lib/guards'
import { BlogCategory } from '@/components'
import AppRoutes from '@/constants/AppRoutes'

interface Props {
  categories:
    | StrapiFindResponse<BlogCategoryModel>
    | StrapiEntity<BlogCategoryModel>
}

const CategoriesList: FC<Props> = ({ categories }) => {
  const isRendered = useRenderState(100)

  return (
    <div
      className={classNames('duration-1000 ease-in-out', {
        'opacity-0': !isRendered,
      })}
    >
      {isStrapiEntity(categories) ? (
        <>
          <Link
            href={AppRoutes.Categories}
            className="text-2xl md:text-xl"
          >
            All Categories
          </Link>
          <BlogCategory category={categories.attributes} />
        </>
      ) : (
        <>
          <h1 className="text-4xl mt-6">Categories</h1>
          <ul className="my-6">
            {categories.data.map((category) => (
              <li key={category.id}>
                <BlogCategory category={category.attributes} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default memo(CategoriesList, () => true)
