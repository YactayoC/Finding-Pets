import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

import ProfileLayout from "components/layouts/Home/ProfileLayout";
import HomePublications from "components/homeUI/HomePublications";
import LoaderProfile from "../../../components/loader/LoaderProfile";
import { dateUser } from "utils/dateInfo";
import { useSWRPublications, useSWRUser } from "hooks";
import findingPetsApi from "api/findingPetsApi";
import { stateModalProfile } from "store/stateModalProfile";
import { infoUser } from "store/stateUser";

import styles from "styles/home/Profile.module.css";

const ProfilePage = ({ userSSR }: any) => {
  const { query } = useRouter();
  const userAtom = useAtomValue(infoUser);
  const { publications, isLoading } = useSWRPublications(
    `/publication/get-my-publication?userId=${query.id}`
  );
  const { user } = useSWRUser(`/user/get-user?userId=${userAtom?._id}`);
  const setShowModalEditUser = useUpdateAtom(stateModalProfile);

  if (!userSSR) return;
  if (!user) {
    return null;
  }

  return (
    <ProfileLayout
      title={`Perfil | ${
        user.user._id === userSSR._id ? user.user.fullname : userSSR?.fullname
      }`}
    >
      <div className={styles.profile}>
        <div className={styles.hero}>
          <div className={styles.data}>
            {isLoading ? (
              <LoaderProfile />
            ) : (
              <Image
                src={
                  user.user._id === userSSR._id
                    ? user.user.profile
                    : userSSR?.profile
                }
                width={180}
                height={180}
                alt="profile"
              />
            )}
            <div className={styles.option}>
              <h2>
                {user.user._id === userSSR._id
                  ? user.user.fullname
                  : userSSR?.fullname}
              </h2>
              {userSSR._id === user?.user?._id && (
                <button onClick={() => setShowModalEditUser(true)}>
                  <i className="fa-solid fa-pen-to-square"></i>Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.view}>
          <div className={styles.details}>
            <h2>Detalles</h2>

            <ul className={styles.details__data}>
              <li>
                <i className="fa-solid fa-user"></i>
                {user.user._id === userSSR._id
                  ? user.user.fullname
                  : userSSR?.fullname}
              </li>
              <li>
                <i className="fa-solid fa-at"></i>
                {user.user._id === userSSR._id
                  ? user.user.email
                  : userSSR?.email}
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                {user.user._id === userSSR._id
                  ? user.user.phone
                  : userSSR?.phone}
              </li>
              <li>
                <i className="fa-solid fa-bullhorn"></i> Se unió{" "}
                {dateUser(userSSR?.createdAt)}
              </li>
            </ul>
          </div>

          <HomePublications
            publications={publications}
            isLoading={isLoading}
            user={user.user}
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
