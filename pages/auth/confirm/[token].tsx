import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useUser } from 'hooks';

import styles from 'styles/Auth.module.css';

const ConfirmPage = ({ token }: {token: string}) => {
  const { confirmAccount } = useUser();
  const [message, setMessage] = useState({
    isConfirmed: false,
    messageConfirmed: '',
  });

  const confirm = useCallback(async () => {
    const { hasError, message } = await confirmAccount(token);
    if (hasError) {
      return setMessage({
        isConfirmed: false,
        messageConfirmed: message,
      });
    }

    setMessage({
      isConfirmed: true,
      messageConfirmed: message,
    });
  }, [token]);

  useEffect(() => {
    confirm();
  }, [confirm]);

  return (
    <div className={styles.confirm__container}>
      <h1 className={styles.confirm__heading}>{message.messageConfirmed}</h1>
      {!message.isConfirmed ? (
        <Image src="/auth/confirmedError.gif" width={300} height={300} alt="error" />
      ) : (
        <Image src="/auth/confirmedSucceful.gif" width={300} height={300} alt="succeful" />
      )}
      <Link href="/auth/login">
        <button className={styles.confirm__button}>Ir al login</button>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { token } = params as { token: string };
  return {
    props: {
      token,
    },
  };
};

export default ConfirmPage;
