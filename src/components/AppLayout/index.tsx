import { FC, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'
import localFont from '@next/font/local'

import type { AppLayoutProps } from './interface'

import { Footer, Header, SideMenu } from 'components'

// Fonts
const epilogue = localFont({
  src: '../../assets/fonts/Epilogue-VariableFont_wght.ttf',
  preload: true,
  display: 'swap',
  fallback: ['monospace', 'Ubuntu', 'sans-serif'],
  variable: '--font-epilogue',
})

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
  children,
  socialMedias,
}) => {
  return (
    <>
      <SideMenu socialMediaLinks={socialMedias} />
      <main
        className={classNames(
          epilogue.variable,
          epilogue.className,
          'relative max-w-[1920px] mx-auto text-black font-epilogue px-6 sm:px-12 md:px-24 xl:px-36',
        )}
      >
        <Header />
        {children}
        <Footer socialMedias={socialMedias} />
      </main>
    </>
  )
}

export default memo(AppLayout)
