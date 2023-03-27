import { FC, memo, useEffect } from 'react'
import snarkdown from 'snarkdown'
import highlight from 'highlight.js'

import preprocessImgSrc from '@/lib/preprocessImgSrc'
import Aside from '@/components/Blog/Aside'
import style from './style.module.sass'
import { useTheme } from '@/lib/hooks'

interface Props {
  blog: BlogModel
}

const Blog: FC<Props> = ({ blog }) => {
  const theme = useTheme()
  const { content } = blog

  const htmlDescription = preprocessImgSrc(snarkdown(content))

  useEffect(() => {
    highlight.highlightAll()
  }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href={
          theme.isDark
            ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark.min.css'
            : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css'
        }
      />
      <article className="pb-36 flex flex-col gap-16 lg:gap-24 xl:gap-36 lg:flex-row justify-between">
        <main
          className={`${
            theme.isDark ? style.textSectionDark : style.textSection
          } default-headings pt-16 whitespace-pre-line text-lg lg:text-xl leading-9 w-full lg:w-4xl`}
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
        <Aside {...blog} />
      </article>
    </>
  )
}

export default memo(Blog)
