import { GetServerSideProps } from 'next';
import HomeLayout from 'components/layouts/Home/HomeLayout';
import findingPetsApi from 'axios/findingPetsApi';
import HomePublications from 'components/homeUI/HomePublications';
import { useAtomValue } from 'jotai';
import { infoUser } from 'store/stateUser';
import { useSWRUser } from 'hooks';
import HomeOptions from 'components/homeUI/HomeOptions';
import HomeRandom from 'components/homeUI/HomeRandom';

const Result = ({ publications, query }: any) => {
  const userAtom = useAtomValue(infoUser);
  const { user } = useSWRUser(`/user/get-user?userId=${userAtom?._id!}`);

  if (!user) {
    return null;
  }

  return (
    <HomeLayout title={`Results for:  ${query.value}`}>
      <HomeOptions />
      <HomePublications publications={publications} isLoading={false} user={user.user} />
      <HomeRandom />
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await findingPetsApi.get(`/publication/search-publication?search=${params?.value}`);
  return {
    props: {
      publications: data,
      query: params
    },
  };
};

export default Result;
