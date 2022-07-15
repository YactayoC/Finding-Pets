import React, { FC, useState } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import Image from 'next/image';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

import { TPublication } from 'types';
import { dateComment, datePublication } from 'utils/dateInfo';
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
  idUser: string;
  comment: string;
};

const Publication: FC<Props> = ({ publication }) => {
  const { addComment } = useComments();
  const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);
  const setShowModalEditPublication = useUpdateAtom(stateModalPublication);
  const { deletePublication } = usePublications();
  const [showComments, setShowComments] = useState(false);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddComment>({
    defaultValues: {
      idPublication: publication?._id,
      idUser: user?._id,
    },
  });

  const onComment = async ({ idPublication, idUser, comment }: AddComment) => {
    await addComment(idPublication, idUser, comment);
    reset();
  };

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

  if (!user) {
    return null;
  }

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
            <div
              className={styles['publication__comments-buttons']}
              style={{ borderBottom: showComments ? '1px solid var(--secondary-color-text)' : 'none' }}
            >
              <button>
                <i className="fa-regular fa-heart"></i>
                <span>Me gusta</span>
              </button>
              <button onClick={() => setShowComments(!showComments)}>
                <i className="fa-regular fa-message"></i>
                <span>Comentar</span>
              </button>
              <button>
                <i className="fa-solid fa-share"></i>
                <span>Compartir</span>
              </button>
            </div>

            {showComments && (
              <>
                <form className={styles['publication__comments-views']} onSubmit={handleSubmit(onComment)}>
                  <Image src={user.profile} width={35} height={35} alt="profile" />
                  <TextareaAutosize 
                    onKeyDown={(e) => {
                     e.key  === "Enter" && e.preventDefault();
                    }}
                    maxLength={250}
                    minRows={1.6}
                    placeholder="Escribe un comentario..."
                    {...register('comment', {
                      required: 'Este campo es requerido',
                      minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                      maxLength: { value: 250, message: 'Máximo 250 caracteres' },
                    })}
                  />
                  {errors.comment && <p className={styles.form__error}>{errors.comment.message}</p>}
                  <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>

                <div className={styles['publication__comments-users']}>
                  {publication.comments.map((commentUser: any) => (
                    <div className={styles['publication__comment-user']} key={commentUser._id}>
                      <Link href={`/home/profile/${commentUser.user._id}`}>
                        <a>
                          <Image src={commentUser.user.profile} width={35} height={35} alt="profile" />
                        </a>
                      </Link>
                      <div className={styles['comment']}>
                        <p>
                          {commentUser.user.fullname} <span> {dateComment(commentUser.date)}</span>{' '}
                        </p>
                        <TextareaAutosize readOnly value={commentUser.comment} />
                      
                      </div>
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
