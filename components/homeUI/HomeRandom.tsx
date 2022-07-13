import Image from 'next/image';
import React from 'react';

import styles from 'styles/home/Home.module.css';

const HomeRandom = () => {
  return (
    <div className={styles.random}>
      <div className={styles.random__category}>
        <p className={styles.random__heading}>Categorías</p>
        <div className={styles.random__form}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className={styles.random__input} type="text" placeholder="Descubre categorias" />
        </div>
        <div className={styles.random__buttons}>
          <button>Primary</button>
          <button>General</button>
          <button>Request (2)</button>
        </div>
        <div className={styles.random__profile}>
          <Image src="/home/profile.jpg" width={38} height={38} alt="Image" />
          <div className={styles['random__profile-name']}>
            <p>Henry Lance</p>
            <span>@Henry</span>
          </div>
        </div>
      </div>
      <p className={styles.random__request}>Request</p>
      <div className={styles.random__accept}>
        <div className={styles["random__accept-profile"]}>
          <Image src="/home/profile.jpg" width={38} height={38} alt="Image" />
          <div className={styles["random__accept-data"]}>
            <p>Henry Lance</p>
            <span>@Henry</span>
          </div>
        </div>
        <div className={styles["random__accept-buttons"]}>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default HomeRandom;
