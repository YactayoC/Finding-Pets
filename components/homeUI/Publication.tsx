import React, { FC, useState } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import { TPublication } from 'types';
import { datePublication } from 'utils/dateInfo';
import { usePublications, useUser } from 'hooks';
import { stateModalPublication } from 'store/stateModalPublication';

import styles from 'styles/home/Home.module.css';
import { useForm } from 'react-hook-form';
import { useComments } from 'hooks/useComment';

type Props = {
  publication: TPublication | any;
};

type AddComment = {
  idPublication: string;
  comment: string;
};

const Publication: FC<Props> = ({ publication }) => {
  const { addComment } = useComments();
  const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);
  const setShowModalEditPublication = useUpdateAtom(stateModalPublication);
  const { deletePublication } = usePublications();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AddComment>({
    defaultValues: {
      idPublication: publication?._id,
    }
  });

  if (!user) {
    return null;
  }

  const onComment = async({ idPublication, comment }: AddComment) => {
    const {message} = await addComment(idPublication, comment)
    console.log(watch())
    reset();
  }

  const onDelete = async (id: any) => {
    Swal.fire({
      title: '¿Seguro que quieres eliminar tu publicación?',
      showCancelButton: true,
      focusCancel: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#9e98b3',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#fd0f1b',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { hasError, message } = await deletePublication(id);
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
      } else {
      }
    });
  };



  return (
    <>
      <div className={styles.publication}>
        <div className={styles.publication__profile}>
          <Link href={`/home/profile/${publication.user._id}`}>
            <a>
              <Image src={publication.user.profile} width={40} height={40} alt="profile" />
            </a>
          </Link>
          <div className={styles['publication__profile-data']} onClick={() => setIsVisibleOptions(false)}>
            <p>
              {publication.user.fullname}
              <span
                className={
                  publication.state === 'active'
                    ? styles['publication__state-active']
                    : styles['publication__state-found']
                }
              >
                {publication.state}
              </span>
            </p>

            <span className={styles.publication__date}>{datePublication(publication.createdAt)}</span>
          </div>
          {publication.user._id === user._id && (
            <>
              <div className={styles.publication__show}>
                <i className="fa-solid fa-ellipsis" onClick={() => setIsVisibleOptions(!isVisibleOptions)}></i>
              </div>
              {isVisibleOptions && (
                <ul className={styles.publication__options}>
                  <li
                    onClick={() => {
                      setIsVisibleOptions(false);
                      setShowModalEditPublication({
                        isVisible: true,
                        id: publication._id,
                        description: publication.description,
                        state: publication.state,
                        images: publication.images[0],
                      });
                    }}
                  >
                    <span>Editar</span> <i className="fa-solid fa-pen-to-square"></i>
                  </li>
                  <li onClick={() => onDelete(publication._id)}>
                    <span>Eliminar</span> <i className="fa-solid fa-xmark"></i>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
        <div className={styles.publication__description} onClick={() => setIsVisibleOptions(false)}>
          <p>{publication.description}</p>
          <div className={styles['publication__description-img']}>
            <Image src={publication.images[0]} width={780} height={400} objectFit="contain" alt="profile" />
          </div>
          <div className={styles['publication__comments']}>
            <div className={styles['publication__comments-buttons']}>
              <button>
                <i className="fa-regular fa-heart"></i>
                <span>Me gusta</span>
              </button>
              <button>
                <i className="fa-regular fa-message"></i>
                <span>Comentar</span>
              </button>
              <button>
                <i className="fa-solid fa-share"></i>
                <span>Compartir</span>
              </button>
            </div>
            {/* //todo: Arreglar */}
            <form className={styles['publication__comments-views']} onSubmit={ handleSubmit(onComment)}>
              <Image src={user.profile} width={35} height={35} alt="profile" />
              <textarea placeholder="Escribe un comentario..." maxLength={250} 
              {...register('comment', {
              required: 'Este campo es requerido',
              minLength: { value: 5, message: 'Mínimo 5 caracteres' },
              maxLength: { value: 250, message: 'Máximo 250 caracteres'}
            })} ></textarea>
              <input type="submit" />
            </form>
            <div className={styles['publication__comments-users']}>
              {publication.comments.map((comment: any) => (
                <div className={styles['publication__comment-user']} key={comment}>
                  <Image src={user.profile} width={35} height={35} alt="profile" />
                  <div className={styles['comment']}>
                    <p>{user.fullname}</p>
                    <p>{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
