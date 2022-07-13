import type { AppProps } from 'next/app';
import { Provider as ProviderJotai } from 'jotai';
import { SWRConfig } from 'swr';

import RequireAuth from 'components/authComponent/RequireAuth';

import '../styles/globals.css';

type RequireAuthComponent = {
  requireAuth?: boolean;
} & AppProps['Component'];

type Props = {
  Component: RequireAuthComponent;
} & AppProps;

function MyApp({ Component, pageProps }: Props) {
  return (
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()), refreshInterval: 2000, }}>
      <ProviderJotai>
        {Component.requireAuth! ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </ProviderJotai>
    </SWRConfig>
  );
}

export default MyApp;
