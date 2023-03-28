import { FC, memo } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { useRenderState } from '@/lib/hooks'
import type { StrapiMultimediaModel } from '@/types/strapi'
import style from './style.module.sass'

interface Props {
  welcomeTitle: string
  welcomeImage: StrapiMultimediaModel
}

const Welcome: FC<Props> = ({ welcomeTitle, welcomeImage }) => {
  const isRendered = useRenderState(100)

  return (
    <div className="relative flex py-20 justify-between items-center w-full md:my-12">
      <div className="flex flex-col flex-1">
        <p
          className={classNames(
            style.transition,
            'w-fit text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold relative whitespace-pre-line',
            'transform transform-gpu left-0 md:hover:left-6 bottom-0 md:hover:bottom-4 z-10',
            {
              'opacity-0 -translate-x-full': !isRendered,
            },
          )}
        >
          {welcomeTitle}
        </p>
      </div>
      <div className="flex items-center absolute right-12">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + welcomeImage.data.attributes.url}
          alt="Shapes"
          width={200}
          height={200}
          quality={100}
          priority={true}
          className={classNames(
            style.transition,
            'transform transform-gpu relative',
            'right-0 md:hover:right-6 bottom-0 md:hover:bottom-4',

            {
              'opacity-0 translate-x-[500px]': !isRendered,
            },
          )}
        />
      </div>
    </div>
  )
}

export default memo(Welcome)
