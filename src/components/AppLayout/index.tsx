import { FC, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'
import localFont from '@next/font/local'

import type { AppLayoutProps } from './interface'

import { Footer, Header } from 'components'

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
    <main
      className={classNames(
        epilogue.variable,
        epilogue.className,
        'relative min-w-screen max-w-screen overflow-x-hidden text-black font-epilogue px-6 md:px-12',
      )}
    >
      <Header />
      {children}
      <Footer socialMedias={socialMedias} />
    </main>
  )
}

export default memo(AppLayout)
