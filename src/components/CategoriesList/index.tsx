import { FC, memo } from 'react'
import classNames from 'classnames'

import type { StrapiEntity, StrapiFindResponse } from '@/types/strapi'
import { useRenderState } from '@/utils/hooks'
import { isStrapiEntity } from '@/utils/guards'
import Category from './Category'
import Link from 'next/link'
import appRoutes from '@/constants/appRoutes'

interface Props {
  categories:
    | StrapiFindResponse<ArticleCategoryModel>
    | StrapiEntity<ArticleCategoryModel>
}

const CategoriesList: FC<Props> = ({ categories }) => {
  const isRendered = useRenderState(150)

  return (
    <div
      className={classNames('duration-1000 ease-in-out', {
        'opacity-0': !isRendered,
      })}
    >
      {isStrapiEntity(categories) ? (
        <>
          <Link
            href={appRoutes.categories}
            className="text-2xl md:text-xl"
          >
            All Categories
          </Link>
          <Category category={categories.attributes} />
        </>
      ) : (
        <>
          <h1 className="text-4xl mt-6">Categories</h1>
          <ul className="my-6">
            {categories.data.map((category) => (
              <li key={category.id}>
                <Category category={category.attributes} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default memo(CategoriesList, () => true)
