import { FC, memo, useEffect } from 'react'
import snarkdown from 'snarkdown'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

import preprocessImgSrc from '@/utils/preprocessImgSrc'
import Aside from '@/components/Blog/Aside'
import style from './style.module.scss'

interface Props {
  blog: BlogModel
}

const Blog: FC<Props> = ({ blog }) => {
  const { content } = blog

  const htmlDescription = preprocessImgSrc(snarkdown(content))

  useEffect(() => {
    highlight.highlightAll()
  }, [])

  return (
    <article className="pb-36 flex flex-col gap-16 lg:gap-24 xl:gap-36 lg:flex-row justify-between">
      <main
        className={`${style.textSection} default-headings pt-16 whitespace-pre-line text-lg lg:text-xl leading-9 w-full lg:w-4xl`}
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
      <Aside {...blog} />
    </article>
  )
}

export default memo(Blog)
