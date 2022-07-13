import { useUser } from 'hooks';
import { useUpdateAtom } from 'jotai/utils';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { stateModalProfile } from 'store/stateModalProfile';

import { infoUser } from 'store/stateUser';
import { useRouter } from 'next/router';

import styles from 'styles/home/Profile.module.css';
import { isFullname, isPhone } from 'utils/validations';

type ProfileUpdate = {
  id: string;
  imageProfile: any;
  fullname: string;
  phone: string;
  password: string;
  passwordNew: string;
};

const ModalEditUser = () => {
  const { updateProfile, user } = useUser();
  const setUser = useUpdateAtom(infoUser);
  const setShowModalEditUser = useUpdateAtom(stateModalProfile);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileUpdate>({
    defaultValues: {
      id: user?._id,
      fullname: user?.fullname,
      phone: user?.phone,
    },
  });

  const onUpdateProfile = async ({ id, imageProfile, fullname, phone, password, passwordNew }: ProfileUpdate) => {
    const { data, message, hasError } = await updateProfile(id, imageProfile, fullname, phone, password, passwordNew);
    if (hasError) {
      return Swal.fire({
        title: 'Error',
        icon: 'error',
        text: message,
      });
    }

    setShowModalEditUser(false);
    setUser(data!);
    Swal.fire({
      title: 'Cambio Exitoso',
      icon: 'success',
      text: message,
    });
  };

  return (
    <div className={styles.profile__edit}>
      <form className={styles.form} onSubmit={handleSubmit(onUpdateProfile)}>
        <h2>Editar Perfil</h2>
        <i className="fa-solid fa-xmark" onClick={() => setShowModalEditUser(false)}></i>
        <div className={styles.form__group}>
          <i
            className="fa-solid fa-camera"
            style={{background: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${user?.profile})`, backgroundSize: "contain"}}
            onClick={() => {
              const fileInput = document.getElementById('fileInput');
              fileInput?.click();
            }}
          ></i>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            {...register('imageProfile')}
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">Fullname</label>
          <input
            type="text"
            id="fullname"
            placeholder="Ingresa tu nombre completo"
            {...register('fullname', {
              required: 'Este campo es requerido',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              validate: isFullname,
            })}
          />
          {errors.fullname && <p className={styles.form__error}>{errors.fullname.message}</p>}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="email">Phone</label>
          <input
            type="number"
            id="phone"
            placeholder="Ingresa tu número de teléfono"
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
          <label htmlFor="password">Confirmar Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Este campo es requerido',
              minLength: { value: 6, message: 'Minimo 6 caraceteres' },
            })}
          />
          {errors.password && <p className={styles.form__error}>{errors.password.message}</p>}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="passwordNew">Nuevo Password</label>
          <input
            type="password"
            id="passwordNew"
            {...register('passwordNew', {
              required: 'Este campo es requeridos',
              minLength: { value: 6, message: 'Minimo 6 caraceteres' },
            })}
          />
          {errors.passwordNew && <p className={styles.form__error}>{errors.passwordNew.message}</p>}
        </div>
        <input type="hidden" id="id" {...register('id')} />
        <button className={styles.form__submit} type="submit">
          Actualizar Datos
        </button>
      </form>
    </div>
  );
};

export default ModalEditUser;
