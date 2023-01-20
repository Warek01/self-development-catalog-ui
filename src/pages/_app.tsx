// Imports
import { Component, useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import classNames from 'classnames';
import Head from 'next/head';

// Side effects
import 'styles/globals.scss';

// Local imports
import responsiveContext from 'context/responsiveConext';
import hasStrapiPageProps from 'utils/guards/hasStrapiPageProps';
import sideMenuContext, { SideMenuContextProps } from 'context/sideMenuContext';

// Fonts
const epilogue = localFont({
  src: '../assets/fonts/Epilogue-VariableFont_wght.ttf',
  preload: true,
  display: 'swap',
  fallback: ['monospace', 'Ubuntu', 'sans-serif'],
  variable: '--font-epilogue',
});

const App = ({ Component, pageProps }: AppProps) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  const sideMenuContextValue = useMemo<SideMenuContextProps>(
    () => ({
      isOpen: isSideMenuOpen,
      open: () => setIsSideMenuOpen(true),
      close: () => setIsSideMenuOpen(false),
    }),
    [isSideMenuOpen],
  );

  const title = hasStrapiPageProps(pageProps)
    ? pageProps.pageData.title
    : process.env.NEXT_PUBLIC_APP_TITLE;

  useEffect(() => {
    const mediaQuery = matchMedia('(width < 768px)');

    setIsMobileView(mediaQuery.matches);
    mediaQuery.addEventListener('change', ({ matches }) =>
      setIsMobileView(matches),
    );
  }, []);

  return (
    <responsiveContext.Provider value={{ isMobileView }}>
      <sideMenuContext.Provider value={sideMenuContextValue}>
        <Head>
          <title>{title}</title>
        </Head>
        <main
          className={classNames(
            epilogue.variable,
            epilogue.className,
            'relative min-w-screen max-w-screen overflow-x-hidden text-black font-epilogue px-6 md:px-12',
          )}
        >
          <Component {...pageProps} />
        </main>
      </sideMenuContext.Provider>
    </responsiveContext.Provider>
  );
};

export default App;
