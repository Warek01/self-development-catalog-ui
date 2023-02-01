import Link from 'next/link'
import { FC } from 'react'

interface Props {
  article: ArticleModel
}

const Article: FC<Props> = ({ article }) => {
  const { article_categories, date, description, links, title } = article

  return (
    <div className="">
      <header className="text-xl flex items-center justify-between mt-12">
        <span className="font-semibold">{title}</span>
        <span>
          {new Date(date).toLocaleDateString('en-EN', { dateStyle: 'medium' })}
        </span>
      </header>
      <main
        className="whitespace-pre-line my-12"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <section className="">
        <p className="font-bold">Links</p>
        <ul className="flex flex-col px-6 pt-3 pb-6">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                href={link.link}
                className=""
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <ul className="flex gap-6 pb-6">
          {article_categories?.data.map((category, index) => (
            <li
              key={index}
              className="bg-card-bg-dark px-3 py-2 rounded-md text-white text-sm"
            >
              {category.attributes.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Article
