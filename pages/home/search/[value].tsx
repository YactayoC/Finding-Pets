import { GetServerSideProps } from 'next';
import { useAtomValue } from 'jotai';

import HomeLayout from 'components/layouts/Home/HomeLayout';
import HomePublications from 'components/homeUI/HomePublications';
import HomeRandom from 'components/homeUI/HomeRandom';
import HomeOptions from 'components/homeUI/HomeOptions';
import { useSWRPublications, useSWRUser } from 'hooks';
import { infoUser } from 'store/stateUser';
import findingPetsApi from 'axios/findingPetsApi';

const ResultPage = ({ query }: any) => {
  const userAtom = useAtomValue(infoUser);
  const { user } = useSWRUser(`/user/get-user?userId=${userAtom?._id!}`);
  const {publications, isLoading} = useSWRPublications(`/publication/search-publication?search=${query?.value}`)

  if (!user) {
    return null;
  }

  return (
    <HomeLayout title={`Results for:  ${query.value}`}>
      <HomeOptions />
      <HomePublications publications={publications} isLoading={isLoading} user={user.user} />
      <HomeRandom />
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  //const { data } = await findingPetsApi.get(`/publication/search-publication?search=${params?.value}`);
  
  return {
    props: {
      //publications: data,
      query: params
    },
  };
};

ResultPage.requireAuth = true;
export default ResultPage;
