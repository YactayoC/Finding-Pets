import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import Swal from 'sweetalert2';

import { TPublication } from 'types';
import { datePublication } from 'utils/dateInfo';
import { usePublications, useUser } from 'hooks';

import styles from 'styles/home/Home.module.css';
import { useUpdateAtom } from 'jotai/utils';
import { stateModalPublication } from 'store/stateModalPublication';

type Props = {
  publication: TPublication | any;
};

const Publication: FC<Props> = ({ publication }) => {
  const { user } = useUser();
  const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);
  const setShowModalEditPublication = useUpdateAtom(stateModalPublication);
  const { deletePublication } = usePublications();

  if (!user) {
    return null;
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
                        setIsVisibleOptions(false)
                        setShowModalEditPublication({
                          isVisible: true,
                          id: publication._id,
                          description: publication.description,
                          state: publication.state,
                          images: publication.images[0]
                        })
                      }
                    }
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
        </div>
      </div>
    </>
  );
};

export default Publication;
