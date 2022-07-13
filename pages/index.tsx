import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import styles from 'styles/PreviousPage.module.css';

const PreviousPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Finding Pets</title>
      </Head>

      <header>
        <nav className={styles.nav}>
          <div className={styles.nav__logo}>
            <Image src="/previous/logo.png" alt="logo" width={60} height={50} />
            <Link href="/">
              <a>FindingPets</a>
            </Link>
          </div>
          <Link href="/auth/login">
            <a className={styles.nav__button}>Ingresar ahora</a>
          </Link>
        </nav>

        <div className={styles.hero}>
          <h1>FindingPets</h1>
          <p>FindingPets - Una página donde encontrarás mascotas perdidas</p>
        </div>
      </header>

      <div className={styles.icons}>
        <div className={styles.icons__element}>
          <Image src="/previous/ayuda.png" alt="" width={130} height={130} />
          <h3>Ayuda</h3>
          <p>Ayuda a los demas compartiendo publicaciones</p>
        </div>
        <div className={styles.icons__element}>
          <Image src="/previous/adopta.png" alt="" width={130} height={130} />
          <h3>Adopta</h3>
          <p>Puedes adoptar a algun perrito sin dueño</p>
        </div>
        <div className={styles.icons__element}>
          <Image src="/previous/aporta.png" alt="" width={130} height={130} />
          <h3>Aporta</h3>
          <p>Puedes ayudar a estirilizar a alguna mascota callejera</p>
        </div>
        <div className={styles.icons__element}>
          <Image src="/previous/donar.png" alt="" width={130} height={150} />
          <h3>Contribuye</h3>
          <p>Puedes ayudar a otras personas con refugio</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.content__element}>
          <div className={styles['content__element-img']}>
            <Image src="/previous/adoptus.png" alt="logo" width={416} height={416} />
          </div>
          <div className={styles['content__element-text']}>
            <h2>¿Que es Finding Pets?</h2>
            <p>
              FindingPets es un proyecto realizado con el fin de ayudar a las personas a poder encontrar a sus mascotas
              perdidas.
            </p>
            <Link href="/auth/login">
              <button>Ingresar ahora</button>
            </Link>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <Image src="/previous/logo.png" alt="logo" width={80} height={70} />
        <p>FindingPets</p>
      </footer>
    </>
  );
}

export default PreviousPage
