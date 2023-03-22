import { FC, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Epilogue } from '@next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import toastDefaultProps from '@/constants/toastDefaultProps'
import { Footer, Header, SideMenu } from '@/components'
import type { AppLayoutProps } from './interface'

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
      <ToastContainer {...toastDefaultProps} />
      <SideMenu socialMediaLinks={socialMedias} />
      <main
        className={classNames(
          epilogue.variable,
          epilogue.className,
          'relative max-w-[1920px] mx-auto min-h-screen flex flex-col text-black font-epilogue px-6 sm:px-12 md:px-24 xl:px-36 dark:bg-dark-black',
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
