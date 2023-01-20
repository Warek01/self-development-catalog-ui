// Imports
import { useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Side effects
import 'styles/globals.scss';

// Local imports
import responsiveContext from 'context/responsiveConext';
import hasStrapiPageProps from 'utils/guards/hasStrapiPageProps';
import sideMenuContext, { SideMenuContextProps } from 'context/sideMenuContext';

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
        <Component {...pageProps} />
      </sideMenuContext.Provider>
    </responsiveContext.Provider>
  );
};

export default App;
