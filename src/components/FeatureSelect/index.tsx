import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import featuresList from 'constants/featuresList'

const FeatureSelect: FC = () => {
  return (
    <div className="flex justify-evenly my-48">
      {featuresList.map(({ accessible, Icon, title, slug }, index) =>
        accessible ? (
          <Link
            href={slug}
            key={index}
            className="flex flex-col items-center justify-center gap-6 group"
          >
            <Icon
              width={56}
              height={56}
              className="duration-200 ease-in-out group-hover:fill-black/80"
            />
            <p className="font-semibold text-sm md:text-lg text-center px-3 md:px-0">
              {title}
            </p>
          </Link>
        ) : (
          <div
            key={index}
            className={classNames(
              'flex flex-col items-center justify-center gap-6 cursor-not-allowed',
            )}
          >
            <Icon
              width={56}
              height={56}
            />
            <p className="font-semibold text-sm md:text-lg text-center px-3 md:px-0">
              {title}
            </p>
          </div>
        ),
      )}
    </div>
  )
}

export default FeatureSelect
