import HomeLayout from "components/layouts/Home/HomeLayout";
import HomeOptions from "components/homeUI/HomeOptions";
import HomePublications from "components/homeUI/HomePublications";
import HomeRandom from "components/homeUI/HomeRandom";

const Main = () => {
  return (
    <HomeLayout title="FindingPets | Home">
      <HomeOptions />
      <HomePublications />
      <HomeRandom />
    </HomeLayout>
  );
};

Main.requireAuth = true;
export default Main;
