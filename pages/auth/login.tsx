import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import AuthLayout from 'components/layouts/AuthLayout';
import { isEmail } from 'utils/validations';
import { infoUser } from 'store/stateUser';
import { useUser } from 'hooks';
import { useAtom } from 'jotai';

import styles from 'styles/Auth.module.css';

type LoginData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { register,handleSubmit,formState: { errors } } = useForm<LoginData>();
  const [, setUser] = useAtom(infoUser)
  const { login } = useUser();
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter();

  const onLogin = async({email, password}: LoginData) => {
    setIsLoading(true);
    const {hasError, data, message, token} = await login(email, password);
    if (hasError) {
      setIsLoading(false);
      return Swal.fire({
        title: 'Error',
        icon: 'error',
        text: message,
      });
    }
    
    setUser(data!)
    localStorage.setItem('token', token!)
    router.replace('/home')
    setIsLoading(false);
  };

  return (
    <AuthLayout title="Finding Pets | Login">
      <div className={styles.content}>
        <Link href="/">
          <a className={styles.content__back}>
            <i className="fa-solid fa-angle-left"></i>
            <p>Regresar</p>
          </a>
        </Link>

        <div className={styles.content__title}>
          <h2>FindingPets</h2>
          <p>FindingPets - Una página donde podras ayudar a encontrar mascotas perdidas</p>
          <Image src="/auth/authdog.png" alt="logo" width={300} height={350} />
        </div>
        <div className={styles.content__form}>
          <h1>Iniciar Sesión</h1>
          <form className={styles.form} onSubmit={handleSubmit(onLogin)} noValidate>
            <div className={styles.form__group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                {...register('email', { required: 'Este campo es requerido', validate: isEmail })}
              />
              {errors.email && <p className={styles.form__error}>{errors.email.message}</p>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Minimo 6 caraceteres' },
                })}
              />
              {errors.password && <p className={styles.form__error}>{errors.password.message}</p>}
            </div>
            <button className={styles.form__submit} disabled={isLoading} type="submit">Iniciar Sesión</button>
          </form>
          <div className={styles.options}>
            <Link href="/auth/register">
              <a className={styles.nav__button}>
                ¿No tienes una cuenta? <span>Unete</span>
              </a>
            </Link>
            <div>
              <button>
                <Image src="/auth/facebook.png" alt="logo" width={35} height={35} />
              </button>
              <button>
                <Image src="/auth/github.png" alt="logo" width={35} height={35} />
              </button>
              <button>
                <Image src="/auth/google.png" alt="logo" width={35} height={35} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
