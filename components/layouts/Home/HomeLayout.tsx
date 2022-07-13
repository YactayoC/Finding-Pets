import { FC } from 'react';
import Head from 'next/head';
import NavBar from 'components/homeUI/NavBar';

import styles from 'styles/home/Home.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const HomeLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NavBar />

      <main>
        <div className={styles.main__layout}>{children}</div>
      </main>
    </>
  );
};

export default HomeLayout;
