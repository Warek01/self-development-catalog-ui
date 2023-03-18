import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  Icon: IconComponent
  size?: number
  href: string
  className?: string
}

const LinkIcon: FC<Props> = ({ Icon, size, href, className }) => {
  return (
    <Link
      href={href}
      className={classNames('p-1 group', className)}
    >
      <Icon
        width={size}
        height={size}
        className="group-hover:fill-black/70 dark:group-hover:fill-dark-white/70 fill-black dark:fill-dark-white"
      />
    </Link>
  )
}

export default LinkIcon
