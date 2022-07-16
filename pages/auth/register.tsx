import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import AuthLayout from 'components/layouts/AuthLayout';
import { isEmail, isFullname, isPhone } from 'utils/validations';
import { useUser } from 'hooks';

import styles from 'styles/Auth.module.css';
import { useState } from 'react';

type RegisterData = {
  fullname: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterData>();
  const { register: registerUser } = useUser();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const router = useRouter();

  const onRegister = async ({ fullname, phone, email, password }: RegisterData) => {
    const { hasError, message } = await registerUser( fullname, phone, email, password );
    if (hasError) {
      return Swal.fire({
        title: 'Error',
        text: message,
      });
    }

    Swal.fire({
      title: message,
      imageUrl:
        'https://res.cloudinary.com/sebas-2001-yac/image/upload/v1655221609/finding_pets/dog-register_nmhshu.png',
      imageHeight: 250,
      imageWidth: 200,
    }).then(result => result.isConfirmed && router.replace('/auth/login'));
    reset()
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
          <h1>Registrate</h1>
          <form className={styles.form} onSubmit={handleSubmit(onRegister)} noValidate>
            <div className={styles.form__group}>
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                id="fullname"
                placeholder="Ingresa tu nombre completo"
                autoComplete='off'
                {...register('fullname', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                  validate: isFullname,
                })}
              />
              {errors.fullname && <p className={styles.form__error}>{errors.fullname.message}</p>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                id="phone"
                placeholder="Ingresa tu número de teléfono"
                autoComplete='off'
                {...register('phone', {
                  required: 'Este campo es requerido',
                  minLength: { value: 9, message: 'Mínimo 9 numeros' },
                  maxLength: { value: 9, message: 'Máximo 9 numeros' },
                  validate: isPhone,
                })}
              />
              {errors.phone && <p className={styles.form__error}>{errors.phone.message}</p>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                autoComplete='off'
                {...register('email', { required: 'Este campo es requerido', validate: isEmail })}
              />
              {errors.email && <p className={styles.form__error}>{errors.email.message}</p>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="password">Password</label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Minimo 6 caraceteres' },
                })}
              />
              <i className="fa-solid fa-eye" 
              onMouseDown={() => setIsVisiblePassword(true)}
              onMouseUp={() => setIsVisiblePassword(false)}
              >
              </i>
              {errors.password && <p className={styles.form__error}>{errors.password.message}</p>}
            </div>
            <button className={styles.form__submit} type="submit">Registrate</button>
          </form>
          <div className={styles.options}>
            <Link href="/auth/login">
              <a className={styles.nav__button}>
                ¿Ya tienes una cuenta? <span>Inicia Sesión</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
