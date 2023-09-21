import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import '@stripe/stripe-js';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import '../../src/assets/styles/_global.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App(props: MyAppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [isMounted, setIsMounted] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 60 * 24 * 3000 });
  };

  useEffect(() => {
    const isDark = getCookie('mantine-color-scheme') || 'dark';
    if (isDark === 'dark') document.documentElement.classList.add('dark');
    if (isDark !== 'dark') document.documentElement.classList.remove('dark');
    setIsMounted(true);
  }, [colorScheme]);

  if (!isMounted) return <div></div>;

  return (
    <>
      <Head>
        <title>Signally</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
          <MantineProvider theme={{ colorScheme, breakpoints }} withGlobalStyles withNormalizeCSS withCSSVariables>
            <NotificationsProvider>
              {/*  */}
              {getLayout(<Component {...pageProps} />)}
              {/*  */}
            </NotificationsProvider>
          </MantineProvider>
        </ModalsProvider>
      </ColorSchemeProvider>
    </>
  );
}

const breakpoints = { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, '2xl': 1600 };

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark'
});
