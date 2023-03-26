import { FC, memo, useContext } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import headerLinks from '@/constants/headerLinks'
import { LinkIcon } from '@/components'
import socialMediaIconsMap from '@/constants/socialMediaIconsMap'
import icons from '@/icons'
import { mobileViewContext, sideMenuContext } from '@/context'
import type { SideMenuProps } from './interface'

const SideMenu: FC<SideMenuProps> = ({ socialMediaLinks }) => {
  const { isMobile } = useContext(mobileViewContext)
  const { isOpen, close } = useContext(sideMenuContext)

  return isMobile ? (
    <aside
      className={classNames(
        'fixed h-full max-w-[100vw] duration-200 w-72 right-0 top-0 z-50 transform-gpu transform',
        'bg-white dark:bg-dark-black border-l border-black/20 flex flex-col items-center py-6',
        {
          'translate-x-full pointer-events-none': !isOpen,
        },
      )}
    >
      <div className="flex w-full pr-12 pb-16 justify-end">
        <button
          onClick={() => close()}
          className="p-2 rounded-full"
        >
          <icons.Close
            width={32}
            height={32}
            className="fill-black dark:fill-dark-white"
          />
        </button>
      </div>
      <ul className="flex flex-col items-center gap-8 text-2xl">
        {headerLinks.map((link, index) => (
          <Link
            href={link.href}
            key={index}
          >
            {link.text}
          </Link>
        ))}
      </ul>
      <ul className="absolute bottom-12 gap-12 grid grid-cols-2 w-9/12">
        {socialMediaLinks.data?.map((link, index) => {
          const Icon =
            socialMediaIconsMap[link.attributes.platform as SocialMediaPlatform]

          return (
            <li
              key={index}
              className="col-span-1 flex items-center justify-center"
            >
              <LinkIcon
                Icon={Icon}
                size={32}
                href={link.attributes.link}
              />
            </li>
          )
        })}
      </ul>
    </aside>
  ) : null
}

export default memo(SideMenu)
