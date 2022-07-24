import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUser } from "hooks";

import styles from "styles/home/Home.module.css";

const HomeOptions = () => {
  const { user } = useUser();
  const { asPath } = useRouter();
  const gmail = user?.email.substring(0, user.email.length - 10);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.options}>
      <div className={styles.options__profile}>
        <div className={styles["options__profile-data"]}>
          <Image src={user.profile} width={45} height={45} alt="profile" />
        </div>
        <div>
          <p>{user.fullname}</p>
          <span>{`@${gmail}`}</span>
        </div>
      </div>
      <div className={styles.options__list}>
        <Link href="/home">
          <a
            className={`${
              asPath.includes("home") && styles["options__list-select"]
            }`}
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa-solid fa-compass"></i>Explorar
          </a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa-solid fa-list"></i>Mi Lista
          </a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa-solid fa-chart-line"></i>Estadísticas
          </a>
        </Link>
        <Link href={`/home/profile/${user._id}`}>
          <a>
            <i className="fa-solid fa-gear"></i>Configuración
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomeOptions;
