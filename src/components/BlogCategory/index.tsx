import { FC, memo, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import determineContrastTextColor from '@/lib/determineContrastColor'
import AppRoute from '@/constants/AppRoute'

interface Props {
  category: BlogCategoryModel
}

const Category: FC<Props> = ({ category }) => {
  const blogs = useMemo(
    () => category.blogs?.data ?? [],
    [category.blogs?.data],
  )

  const headerTextColor = determineContrastTextColor(category.color)
    ? 'text-black dark:text-dark-black'
    : 'text-white dark:text-dark-white'

  const blogElements: JSX.Element[] = useMemo(
    () =>
      blogs.map((blog) => (
        <li
          key={`${category.title}-${blog.id}`}
          className="duration-100 ease-in-out rounded-xl bg-black/10 hover:bg-black/20 dark:bg-dark-white/5 dark:hover:bg-dark-white/10"
        >
          <Link
            href={`${AppRoute.Blogs}/${blog.attributes.slug}`}
            className="flex flex-col justify-center items-center gap-12 px-6 md:px-12 py-12"
          >
            <span className="col-span-1 whitespace-nowrap">
              {blog.attributes.title}
            </span>
            <div className="flex justify-between gap-3 flex-wrap">
              {blog.attributes.blog_categories?.data.map((category) => (
                <span
                  key={category.id}
                  className="py-1 px-3 rounded-md bg-card-bg-dark dark:bg-dark-white text-white dark:text-dark-black text-sm md:text-[10px] flex justify-center items-center"
                >
                  {category.attributes.title}
                </span>
              ))}
            </div>
          </Link>
        </li>
      )),
    [blogs],
  )

  return (
    <div>
      <header
        style={{ backgroundColor: category.color }}
        className="flex flex-col p-3 rounded-xl"
      >
        <span
          className={`flex items-center justify-start gap-4 text-xl ${headerTextColor}`}
        >
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
        <span className={`text-md mt-3 ${headerTextColor}`}>
          {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
        </span>
      </header>
      <main>
        <ul
          className={`w-full grid gap-12 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${
            blogs.length ? 'py-6' : 'py-0'
          }`}
        >
          {blogElements}
        </ul>
      </main>
    </div>
  )
}

export default memo(Category, () => true)
