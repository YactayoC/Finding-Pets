import { FC } from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <div>{children}</div>
      </main>
    </>
  );
};

export default AuthLayout;
