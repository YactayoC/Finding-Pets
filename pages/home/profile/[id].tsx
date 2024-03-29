import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useUpdateAtom } from "jotai/utils";

//store
import { stateModalProfile } from "store/stateModalProfile";

// hooks
import { useUser } from "hooks";

//components
import ProfileLayout from "components/layouts/Home/ProfileLayout";
import HomePublications from "components/homeUI/HomePublications";
import Avatar from "components/Avatar";
import LoaderProfile from "../../../components/loader/LoaderProfile";
import EditableField from "components/EditableField";

//utils
import { dateUser } from "utils/dateInfo";
import { useUploadAvatar } from "hooks/user/mutations/useUploadAvatar";
import { useChangeFullName } from "hooks/user/mutations/useChangeFullName";
import { useChangePhone } from "hooks/user/mutations/useChangePhone";
import { TUser } from '../../../types/user';

//services
import findingPetsApi from "api/findingPetsApi";

import styles from "styles/home/Profile.module.css";


const ProfilePage = ({ userSSR }: any) => {
  const { user } = useUser();
  const { query } = useRouter();
  const setShowModalEditUser = useUpdateAtom(stateModalProfile);

  const { uploadAvatar } = useUploadAvatar();
  const { changeFullName } = useChangeFullName();
  const { changePhone } = useChangePhone();

  if (!userSSR) return;
  if (!user) {
    return null;
  }

  const userData = user._id === userSSR._id ? user : userSSR;

  return (
    <ProfileLayout title={`Perfil | ${userData.fullname}`}>
      <div className={styles.profile}>
        <div className={styles.hero}>
          <div className={styles.data}>
            {!user ? (
              <LoaderProfile />
            ) : (
              <Avatar
                src={userData.profile}
                alt="profile"
                editable={true}
                size="large"
                email={userData.email}
                onConfirmUpload={uploadAvatar}
                sameUser={user._id === userSSR._id ? true : false}
              />
            )}

            <div className={styles.option}>
              <h2>{userData.fullname}</h2>
              {/* {userSSR._id === user?.user?._id && (
                <button onClick={() => setShowModalEditUser(true)}>
                  <i className="fa-solid fa-pen-to-square"></i>Editar Perfil
                </button>
              )} */}
            </div>
          </div>
        </div>

        <div className={styles.view}>
          <div className={styles.details}>
            <h2>Detalles</h2>

            <ul className={styles.details__data}>
              <EditableField
                value={userData.fullname}
                icon={<i className="fa-solid fa-user"></i>}
                onConfirm={changeFullName}
                sameUser={user._id === userSSR._id ? true : false}
              />
              <EditableField
                value={userData.email}
                icon={<i className="fa-solid fa-at"></i>}
                type="email"
                onConfirm={async () => {
                  throw new Error("error");
                }}
                sameUser={user._id === userSSR._id ? true : false}
              />
              <EditableField
                value={userData.phone}
                icon={<i className="fa-solid fa-phone"></i>}
                type="tel"
                onConfirm={changePhone}
                sameUser={user._id === userSSR._id ? true : false}
              />
              <li>
                <i className="fa-solid fa-bullhorn"></i> Se unió
                {dateUser(userSSR?.createdAt)}
              </li>
            </ul>
          </div>

          <HomePublications
            url={`publication/get-my-publication?userId=${query.id}`}
            userSSR={userSSR}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const user = await findingPetsApi(`/user/get-user?userId=${id}`);
  return {
    props: {
      userSSR: user.data.user,
    },
  };
};

ProfilePage.requireAuth = true;
export default ProfilePage;
