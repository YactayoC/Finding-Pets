import Image from 'next/image';
import Link from 'next/link';

import { useUser } from 'hooks';

import styles from 'styles/home/NavBar.module.css';

const NavBar = () => {
  const { user, logout } = useUser();

  if (!user) return null;
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__logo}>
          <Link href="/home">
            <a>
              <Image src="/home/logo2.png" width={55} height={50} alt="logo" />
            </a>
          </Link>
        </div>

        <form className={styles.nav__search}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Busca en FindingPets" />
        </form>

        <div className={styles.nav__profile}>
          <Link href={`/home/profile/${user._id}`}>
            <a>
              <Image className={styles['nav__profile-image']} src={user.profile} width={45} height={45} alt="profile" />
            </a>
          </Link>
          <div className={styles['nav__profile-getProfile']}>
            <i className="fa-solid fa-chevron-down"></i>
            <div className={styles['nav__profile-logout']} onClick={logout}>
              <p>Salir</p>
              <i className="fa-solid fa-power-off"></i>
            </div>
          </div>
          {/* Options */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
