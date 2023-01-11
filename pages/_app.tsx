// Imports
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import classNames from 'classnames';
import Head from 'next/head';

// Side effects
import 'styles/globals.scss';

// Local imports
import responsiveContext from 'context/responsiveConext';
import hasStrapiPageProps from 'utils/guards/hasStrapiPageProps';
import { Header } from 'components';
import SideMenu from '../components/SideMenu';

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
      <Head>
        <title>{title}</title>
      </Head>
      <main
        className={classNames(
          epilogue.variable,
          epilogue.className,
          'relative min-w-screen max-w-screen overflow-x-hidden',
        )}
      >
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
        <Header onMenuOpen={() => setIsSideMenuOpen(true)} />
        <Component {...pageProps} />
      </main>
    </responsiveContext.Provider>
  );
};

export default App;
