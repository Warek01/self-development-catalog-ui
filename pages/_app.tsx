import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import classNames from 'classnames';
import Head from 'next/head';

import 'styles/globals.scss';
import hasDataProps from 'utils/guards/hasDataProps';

const epilogue = localFont({
  src: '../assets/fonts/Epilogue-VariableFont_wght.ttf',
  preload: true,
  display: 'swap',
  fallback: ['monospace', 'Ubuntu', 'sans-serif'],
  variable: '--font-epilogue',
});

const App = ({ Component, pageProps }: AppProps) => {
  const title = hasDataProps(pageProps)
    ? pageProps.pageData.title
    : process.env.NEXT_PUBLIC_APP_TITLE;

  return (
    <main className={classNames(epilogue.variable, epilogue.className)}>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
