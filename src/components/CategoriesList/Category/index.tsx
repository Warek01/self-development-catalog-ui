import { FC, memo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

import determineContrastTextColor from 'utils/determineContrastColor'
import AppRoutes from 'constants/appRoutes'

interface Props {
  category: ArticleCategoryModel
}

const Category: FC<Props> = ({ category }) => {
  const articles = category.articles?.data || []

  const headerTextColor = determineContrastTextColor(category.color)
    ? 'text-black'
    : 'text-white'

  return (
    <div>
      <header
        style={{ backgroundColor: category.color }}
        className={classNames('flex flex-col p-3', headerTextColor)}
      >
        <span className="flex items-center justify-start gap-4 text-xl">
          <Image
            src={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              category.icon.data.attributes.url
            }
            alt={category.title}
            width={category.icon.data.attributes.width}
            height={category.icon.data.attributes.height}
            priority={true}
            quality={100}
            style={{ width: 64, height: 64 }}
          />
          {category.title}
        </span>
        <span className="text-sm mt-3">
          {category.articles?.data.length || 0} articles
        </span>
      </header>
      <main>
        <ul
          className={`flex flex-col gap-12 sm:gap-6 ${
            articles.length ? 'py-6' : 'py-0'
          }`}
        >
          {articles.map((article) => (
            <li
              key={article.id}
              className="duration-100 ease-in-out hover:bg-black/10"
            >
              <Link
                href={`${AppRoutes.articles}/${article.id}`}
                className="px-6 md:px-12 py-6 py-3 flex-1 flex items-center justify-between"
              >
                <span className="col-span-1 whitespace-nowrap">
                  {article.attributes.title}
                </span>
                <div className="flex gap-3 col-span-4">
                  {article.attributes.article_categories?.data.map(
                    (category) => (
                      <span className="py-1 px-3 rounded-md bg-card-bg-dark text-white text-[9px] flex items-center">
                        {category.attributes.title}
                      </span>
                    ),
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default memo(Category, () => true)
