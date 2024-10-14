import Hero from "../components/home/Hero";
import AcademicMajor from "../components/home/AcademicMajor";
import Introduction from "../components/home/Introduction";
import Review from "../components/home/Review";
import ConsultingServices from "../components/home/ConsultingServices";

const HomePage = () => {
  return (
    <div className="flex overflow-hidden flex-col">
      <Hero />
      <AcademicMajor />
      <Introduction />
      <Review />
      <ConsultingServices />
    </div>
  );
};

export default HomePage;
