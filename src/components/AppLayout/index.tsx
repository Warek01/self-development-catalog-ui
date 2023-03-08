import { FC, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Epilogue } from '@next/font/google'

import type { AppLayoutProps } from './interface'
import { Footer, Header, SideMenu } from 'components'


const epilogue = Epilogue({
  variable: '--font-epilogue',
  preload: true,
  fallback: ['monospace', 'Ubuntu', 'sans-serif'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
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
