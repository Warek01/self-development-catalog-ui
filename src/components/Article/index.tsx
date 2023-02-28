import Link from 'next/link'
import { FC, memo, useEffect } from 'react'
import snarkdown from 'snarkdown'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

import preprocessImgSrc from '@/utils/preprocessImgSrc'

interface Props {
  article: ArticleModel
}

const Article: FC<Props> = ({ article }) => {
  const { article_categories, date, description, links, title } = article

  const htmlDescription = preprocessImgSrc(snarkdown(description))

  useEffect(() => {
    highlight.highlightAll()
  }, [])

  return (
    <div>
      <header className="text-xl flex items-center justify-between mt-12">
        <span className="font-semibold">{title}</span>
        <span>
          {new Date(date).toLocaleDateString('en-EN', { dateStyle: 'medium' })}
        </span>
      </header>
      <main
        className="default-headings whitespace-pre-line my-12"
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
      <section>
        <p className="font-bold">Links</p>
        <ul className="flex flex-col px-6 pt-3 pb-6">
          {links.map((link) => (
            <li key={link.text}>
              <Link href={link.link}>{link.text}</Link>
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

export default memo(Article)
