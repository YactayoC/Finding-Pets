import React, { FC, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';

import { TPublication, TUser } from 'types';
import LoaderPublications from 'components/loader/LoaderPublications';
import Publication from 'components/homeUI/Publication';
import LoaderPublicationsPhone from 'components/loader/LoaderPublicationPhone';
import { stateModalPublication } from 'store/stateModalPublication';
import ModalEditPublication from './ModalEditPublication';
import { usePublications } from 'hooks';
import ModalEditUser from './ModalEditUser';
import { stateModalProfile } from 'store/stateModalProfile';

import styles from 'styles/home/Home.module.css';

type Props = {
  publications: TPublication[] | any;
  isLoading: boolean;
  user: TUser;
  userSSR?: TUser;
};

type AddPublic = {
  description: string;
  image: any;
  user: string;
};

const HomePublications: FC<Props> = ({ publications, isLoading, user, userSSR }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddPublic>();
  const { addPublication } = usePublications();
  const showModalEditPublication = useAtomValue(stateModalPublication);
  const showModalEditProfile = useAtomValue(stateModalProfile);
  const [isLoadingAddPublication, setIsLoadingAddPublication] = useState(false);
  const [valueImage, setValueImage] = useState<any>(null);
  let windowWidth = window.innerWidth;

  const onPublic = async ({ description, image, user }: AddPublic) => {
    setIsLoadingAddPublication(true);
    const { hasError, message } = await addPublication(description, image, user);
    if (hasError) {
      return Swal.fire({
        icon: 'error',
        title: message,
      });
    }
    Swal.fire({
      icon: 'success',
      title: message,
    });
    setIsLoadingAddPublication(false);
    reset();
    setValueImage(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {showModalEditPublication.isVisible && <ModalEditPublication />}
      {showModalEditProfile && <ModalEditUser />}
      <div className={styles.publications}>
        {((userSSR?._id === user._id) || !userSSR) && (
          <div className={styles.publications__create}>
            <Image src={user.profile} width={35} height={35} alt="profile" />
            <form className={styles.publication__form} onSubmit={handleSubmit(onPublic)}>
              <div className={styles.textarea}>
                <textarea
                  onKeyDown={(e) => {
                    e.key  === "Enter" && e.preventDefault();
                   }}
                  maxLength={250}
                  placeholder="¿Estás buscando a alguien? 😿🐶"
                  {...register('description', {
                    required: 'Este campo es requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                    maxLength: { value: 250, message: "Maximo 250 caracteres"}
                  })}
                ></textarea>
              </div>

              <div className={styles.icons}>
                <div className={styles['icons-div']}>
                  <i
                    className="fa-solid fa-image"
                    onClick={() => {
                      const file = document.getElementById('file');
                      file?.click();
                    }}
                  >
                    {valueImage ? <span className={styles.icon__count}>1</span> : null}
                  </i>
                  <i
                    className="fa-solid fa-delete-left"
                    onClick={() => {
                      reset();
                      setValueImage(null);
                    }}
                  ></i>
                </div>

                <input
                  type="hidden"
                  value={user._id}
                  {...register('user', {
                    required: 'Este campo es requerido',
                  })}
                />
                <button className={styles.form__submit} disabled={isLoadingAddPublication} type="submit">
                  Publicar
                </button>
              </div>

              <input
                type="file"
                id="file"
                accept="image/*"
                {...register('image', {
                  required: 'Este campo es requerido',
                  onChange: (e) => {
                    setValueImage(e.target.value);
                  },
                })}
              />
            </form>
            {(errors.description || errors.image) && (
              <p className={styles.form__error}>Verifique la imagen o descripción</p>
            )}
          </div>
        )}

        <div className={styles.publications__view}>
          {isLoading && windowWidth > 600 && [1, 2, 3].map(() => <LoaderPublications key={crypto.randomUUID()} />)}
          {isLoading && windowWidth < 450 && [1, 2, 3].map(() => <LoaderPublicationsPhone key={crypto.randomUUID()} />)}
          {!isLoading &&
            publications.publications.map((publication: any) => (
              <Publication key={publication._id} publication={publication} />
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePublications;
