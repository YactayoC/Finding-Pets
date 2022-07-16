import { useAtomValue } from 'jotai';

import HomeLayout from 'components/layouts/Home/HomeLayout';
import HomeOptions from 'components/homeUI/HomeOptions';
import HomePublications from 'components/homeUI/HomePublications';
import HomeRandom from 'components/homeUI/HomeRandom';
import { useSWRPublications, useSWRUser } from 'hooks';
import { infoUser } from 'store/stateUser';

const Main = () => {
  const userAtom = useAtomValue(infoUser);
  const { publications, isLoading} = useSWRPublications("/publication/get-all-publications");
  const { user } = useSWRUser(`/user/get-user?userId=${userAtom?._id!}`);
  
  if (!user) {
    return null;
  }

  return (
    <HomeLayout title="FindingPets | Home">
      <HomeOptions />
      <HomePublications
        publications={publications}
        isLoading={isLoading}
        user={user.user}
      />
      <HomeRandom />
    </HomeLayout>
  );
};

Main.requireAuth = true;
export default Main;
