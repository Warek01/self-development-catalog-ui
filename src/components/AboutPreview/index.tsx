import { FC, memo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import { useRenderState } from '@/lib/hooks'
import icons from '@/icons'

const iconSize = 56

const AboutPreview: FC = () => {
  const isRendered = useRenderState(100)

  return (
    <div className="mx-auto my-8 border-y border-y border-y-black/20">
      <Link
        href="/about"
        className={classNames(
          'duration-1000 ease-in-out flex justify-center items-center group relative py-8 overflow-hidden',
          {
            'opacity-0': !isRendered,
          },
        )}
      >
        <div
          className="flex justify-evenly items-center flex-1 relative
            duration-500 ease-in-out bottom-0 group-hover:bottom-[200px]"
        >
          <icons.Typescript
            width={iconSize}
            height={iconSize}
            className="fill-black"
          />
          <icons.NextJs
            width={iconSize}
            height={iconSize}
            className="fill-black hidden sm:block"
          />
          <icons.React
            width={iconSize}
            height={iconSize}
            className="fill-black"
          />
          <icons.NodeJs
            width={iconSize}
            height={iconSize}
            className="fill-black"
          />
          <icons.Docker
            width={iconSize}
            height={iconSize}
            className="fill-black hidden sm:block"
          />
          <icons.Git
            width={iconSize}
            height={iconSize}
            className="fill-black hidden md:block"
          />
        </div>
        <p
          className="uppercase text-3xl font-medium absolute tracking-widest -translate-y-full text-black
            -bottom-[200px] group-hover:bottom-0 duration-500 ease-in-out"
        >
          About
        </p>
      </Link>
    </div>
  )
}

export default memo(AboutPreview)
