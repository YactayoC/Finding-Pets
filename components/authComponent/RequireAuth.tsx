import React, { FC } from 'react';
import Image from 'next/image';
import { useAuth } from 'hooks';

import styles from "components/authComponent/Loader.module.css"

type Props = {
  children: React.ReactNode;
};

const RequireAuth: FC<Props> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Image src="/loader.gif" width={300} height={300} alt="loader" />
        <h1>
          Cargando...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
