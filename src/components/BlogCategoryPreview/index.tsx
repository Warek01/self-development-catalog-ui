import Link from 'next/link'
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import AppRoutes from '@/constants/AppRoutes'
import responsiveContext from '@/contexts/responsiveConext'

interface Props {
  attributes: BlogCategoryModel
  id: number
  isFirst: boolean
  isEven: boolean
}

const Category: FC<Props> = ({ attributes, isFirst, isEven, id }) => {
  const { isMobileView } = useContext(responsiveContext)
  const [isShown, setIsShown] = useState<boolean>(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const observer =
    typeof window === 'undefined'
      ? null
      : useMemo(
          () =>
            new IntersectionObserver(
              (entries) => {
                if (isShown) {
                  return
                }

                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setTimeout(
                      () => {
                        setIsShown(true)
                      },
                      isEven && !isMobileView ? 300 : 0,
                    )
                  }
                })
              },
              { threshold: 1 / 2 },
            ),
          [isShown],
        )

  useEffect(() => {
    if (!observerTarget.current || !observer) {
      return
    }

    observer.observe(observerTarget.current)

    return () => observer.disconnect()
  }, [observer, observerTarget])

  return (
    <div
      ref={observerTarget}
      className={classNames(
        'relative flex flex-col w-full justify-center items-center duration-1000 ease-in-out',
        {
          'opacity-0': !isShown,
        },
      )}
    >
      <div className="flex flex-col relative w-full md:w-3/4 aspect-square">
        {isFirst && (
          <p className="absolute top-0 left-0 transform -translate-y-full py-5 font-semibold text-3xl md:text-4xl lg:text-5xl">
            Blogs
          </p>
        )}
        <Link
          href={`${AppRoutes.Categories}/${attributes.slug}`}
          className="relative flex-1 z-20 overflow-hidden z-20 peer group"
          style={{ backgroundColor: attributes.color }}
        >
          <p className="pl-2 absolute bottom-0 flex justify-start font-bold text-3xl transform group-hover:translate-y-0 translate-y-full text-white ease-in-out">
            {attributes.title}
          </p>
          <Image
            src={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              attributes.icon.data.attributes.url
            }
            alt={attributes.title}
            priority={false}
            quality={100}
            width={128}
            height={128}
            className="absolute right-6 top-6 w-3/12 md:w-2/12 aspect-square"
          />
        </Link>
        <p className="pl-2 flex justify-start z-10 font-bold text-3xl transform peer-hover:-translate-y-full ease-in-out">
          {attributes.title}
        </p>
      </div>
    </div>
  )
}

export default Category
