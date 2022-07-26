import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import Swal from 'sweetalert2';

import { stateModalPublication } from 'store/stateModalPublication';

import styles from 'styles/home/Profile.module.css';

type PublicationUpdate = {
  id: string;
  imagePublication: string;
  description: string;
  state: string;
};

const ModalEditPublication = ({updatePublication}: {updatePublication: Function} ) => {
  const [showModalEditPublication, setShowModalEditPublication] = useAtom(stateModalPublication);
  const { register, handleSubmit, formState: { errors } } = useForm<PublicationUpdate>({
    defaultValues: {
      id: showModalEditPublication.id!,
      description: showModalEditPublication.description,
      state: showModalEditPublication.state,
      imagePublication: showModalEditPublication.images
    },
  });

  const onUpdatePublication = async ({ id, imagePublication, description, state }: PublicationUpdate) => {
    const { message, hasError } = await updatePublication(id,  description, state, imagePublication);
    if (hasError) {
      return Swal.fire({
        title: 'Error',
        icon: 'error',
        text: message,
      });
    }
    setShowModalEditPublication({isVisible: false});
    Swal.fire({
      title: 'Cambio Exitoso',
      icon: 'success',
      text: message,
    });
  };

  return (
    <div className={styles.profile__edit}>
      <form className={styles.form} onSubmit={handleSubmit(onUpdatePublication)}>
        <h2>Editar Publicación</h2>
        <i
          className="fa-solid fa-xmark"
          onClick={() =>
            setShowModalEditPublication({
              isVisible: false,
              id: null,
            })
          }
        ></i>

        <div className={styles.form__group}>
          <i
            className="fa-solid fa-camera"
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundImage: `url(${showModalEditPublication.images})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            onClick={() => {
              const fileInput = document.getElementById('fileInput');
              fileInput?.click();
            }}
          ></i>
          <input type="file" id="fileInput" accept="image/*" {...register('imagePublication')} />
        </div>

        <div className={styles.form__group}>
          <select className="nav__select" {...register('state')}>
            <option value="state" disabled>
              Estado
            </option>
            <option value="active">Activo</option>
            <option value="found">Encontrado</option>
          </select>
          {errors.state && <p className={styles.form__error}>{errors.state.message}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="description">Descripcion</label>
          <textarea
            placeholder="¿Que tienes en mente?"
            {...register('description', {
              required: 'Este campo es requerido',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
              maxLength: { value: 250, message: 'Máximo 250 caracteres'}
            })}
          ></textarea>
          {errors.description && <p className={styles.form__error}>{errors.description.message}</p>}
        </div>

        <input type="hidden" {...register('id')} />

        <button className={styles.form__submit} type="submit">
          Actualizar Publicación
        </button>
      </form>
    </div>
  );
};

export default ModalEditPublication;
