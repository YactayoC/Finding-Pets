import { GetServerSideProps } from "next";

import HomeLayout from "components/layouts/Home/HomeLayout";
import HomePublications from "components/homeUI/HomePublications";
import HomeRandom from "components/homeUI/HomeRandom";
import HomeOptions from "components/homeUI/HomeOptions";
import { useUser } from "hooks";

const ResultPage = ({ query }: {query: {value: string}}) => {
  const { user } = useUser();
  
  if (!user) {
    return null;
  }

  return (
    <HomeLayout title={`Results for:  ${query.value}`}>
      <HomeOptions />
      <HomePublications url={`/publication/search-publication?search=${query?.value}`} />
      <HomeRandom />
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
return {
    props: {
      query: params,
    },
  };
};

ResultPage.requireAuth = true;
export default ResultPage;
