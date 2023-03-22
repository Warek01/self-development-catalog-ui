import { FC, memo } from 'react'
import Link from 'next/link'

const Aside: FC<BlogModel> = ({ title, links, blog_categories, date }) => {
  return (
    <aside className="flex flex-col text-lg items-start justify-self-stretch pl-12 flex-1 lg:border-l lg:border-solid lg:border-black/10">
      <section className="lg:sticky top-0 lg:pt-12 w-full bg-white dark:bg-dark-black">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {title}
        </h1>
        <h4 className="text-lg text-gray-600 dark:text-gray-400">
          {new Date(date).toLocaleDateString('en-EN', {
            dateStyle: 'medium',
          })}
        </h4>
      </section>

      <section className="pt-16">
        <h4 className="font-bold text-xl">Links</h4>
        <ul className="flex flex-col px-6 pt-3 pb-6 list-disc gap-3 leading-8">
          {links.map((link) => (
            <li key={link.text}>
              <Link href={link.link}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16">
        <h4 className="font-bold text-lg pb-3">Categories</h4>
        <ul className="flex gap-6 pb-6">
          {blog_categories?.data.map((category, index) => (
            <li
              key={index}
              className="bg-card-bg-dark dark:bg-dark-white px-3 py-2 rounded-md text-white dark:text-dark-black text-sm"
            >
              {category.attributes.title}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default memo(Aside)
