import { FC, memo, useCallback, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import headerLinks from '@/constants/headerLinks'
import AppRoute from '@/constants/AppRoute'
import icons from '@/icons'
import { mobileViewContext, sideMenuContext, themeContext } from '@/contexts'

const Header: FC = () => {
  const { isMobile } = useContext(mobileViewContext)
  const { isOpen, open } = useContext(sideMenuContext)
  const { isDark, toggle } = useContext(themeContext)

  const handleOpenMenu = useCallback(() => {
    if (!isMobile) {
      return
    }

    open()
  }, [isOpen, isMobile])

  return (
    <header className="flex justify-between py-6 max-h-20">
      <Link
        href={AppRoute.Home}
        className="flex gap-6 items-center font-semibold text-lg md:text-xl"
      >
        <Image
          src="/Logo.webp"
          alt="Logo"
          priority={true}
          width={32}
          height={32}
          quality={100}
          draggable={false}
          placeholder="empty"
        />
        <span className="hidden md:inline-block">Self development catalog</span>
        <span className="inline-block md:hidden">Self-Dev</span>
      </Link>
      <div className="flex items-center">
        <button
          onClick={() => toggle()}
          className="p-2 rounded-lg mr-12"
        >
          {isDark ? (
            <icons.Moon
              width={25}
              height={25}
            />
          ) : (
            <icons.Sun
              width={25}
              height={25}
            />
          )}
        </button>
        {isMobile ? (
          <button
            onClick={handleOpenMenu}
            className="p-2 rounded-lg"
          >
            <icons.Menu
              width={25}
              height={25}
            />
          </button>
        ) : (
          <ul className="flex flex-row gap-12 text-17">
            {headerLinks.map((link) => (
              <Link
                href={link.href}
                key={link.text}
              >
                {link.text}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

export default memo(Header)
