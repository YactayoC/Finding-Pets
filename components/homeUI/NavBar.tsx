import Image from 'next/image';
import Link from 'next/link';

import { useUser } from 'hooks';

import styles from 'styles/home/NavBar.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type SearchValue = {
  value: string;
}

const NavBar = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<SearchValue>();
  const { user, logout } = useUser();
  const router = useRouter();

  const onSearch = ({ value }: SearchValue) => {
    router.push(`/home/search/${value}`)
  }

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

        <form className={styles.nav__search} onSubmit={handleSubmit(onSearch)}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Busca en FindingPets" {...register("value")} />
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
