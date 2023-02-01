import { FC } from 'react'
import classNames from 'classnames'

import type { StrapiFindResponse } from 'types/strapi'
import Category from './Category'
import { useRenderState } from 'utils/hooks'

interface Props {
  categories: StrapiFindResponse<ArticleCategoryModel>
}

const CategoriesList: FC<Props> = ({ categories }) => {
  const isRendered = useRenderState(150)

  return (
    <div
      className={classNames('duration-1000 ease-in-out', {
        'opacity-0': !isRendered,
      })}
    >
      <h1 className="text-4xl mt-6">Categories</h1>
      <ul className="my-6">
        {categories.data.map((category) => (
          <li key={category.id}>
            <Category category={category.attributes} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesList
