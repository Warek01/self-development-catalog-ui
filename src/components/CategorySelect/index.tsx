import { FC } from 'react'

import type { StrapiFindResponse } from 'types/strapi'
import Category from './Category'

interface Props {
  categories: StrapiFindResponse<ArticleCategoryModel>
}

const CategorySelect: FC<Props> = ({ categories }) => {
  return (
    <main className="flex flex-col my-36">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-24 lg:gap-y-36">
        {categories.data.map(({ attributes, id }, index) => (
          <li
            key={id}
            className="flex items-center justify-center"
          >
            <Category
              attributes={attributes}
              isFirst={index === 0}
              isEven={index % 2 === 1}
              id={id}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default CategorySelect
