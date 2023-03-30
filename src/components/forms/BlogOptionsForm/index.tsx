import { FC, useEffect, useState } from 'react'

import { Checkbox } from '@/components/forms'
import type { BlogOptionsFormProps } from './interface'
import { id } from 'postcss-selector-parser'

const BlogOptionsForm: FC<BlogOptionsFormProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  useEffect(() => {
    console.log(selectedCategories)
  }, [selectedCategories])

  return (
    <div className="">
      <h3 className="text-xl font-bold">Categories</h3>
      <ul className="pt-3">
        {categories.map(({ id, attributes }) => (
          <li key={id}>
            <Checkbox
              label={attributes.title}
              name={attributes.title}
              onChange={(checked) => {
                setSelectedCategories((selected) =>
                  checked
                    ? [...selected, id]
                    : selected.filter((selectedId) => selectedId !== id),
                )
              }}
              className="text-lg"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogOptionsForm
