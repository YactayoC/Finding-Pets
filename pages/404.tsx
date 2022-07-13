import Image from 'next/image';
import Link from 'next/link';

import styles from 'styles/home/Home.module.css';

const Page404 = () => {
  return (
    <div className={styles.error404}>
      <Image src="/home/404.png" alt="" height={300} width={300} />
      <h1>Página no encontrada</h1>
      <Link href="/home">
        <button>
          <i className="fa-solid fa-chevron-left"></i> <span>Volver</span>
        </button>
      </Link>
    </div>
  );
};

export default Page404;
