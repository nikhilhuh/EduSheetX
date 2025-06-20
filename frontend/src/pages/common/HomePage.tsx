import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { getSiteStats } from "../../services/api/apiCalls/common/getSiteStats";
import { StatsSection } from "../../components/Home/StatsSection";
import { Instructions } from "../../components/Home/Instructions";
import Hero from "../../components/Home/Hero";
import PopularSubjects from "../../components/Home/PopularSubjects";

const HomePage: React.FC = () => {
  const [siteStats, setSiteStats] = React.useState<{
    totalStudents: number;
    totalTestsTaken: number;
    totalQuestionsAnswered: number;
    testsAvailable: number;
  }>();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const getsitestats = async () => {
      try {
        const response = await getSiteStats();
        if (response.success) {
          setSiteStats(response.data);
        }
      } catch (err: any) {
        console.error("Unable to get stats of site");
      }
    };
    getsitestats();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />
      <Hero />
      <Instructions />
      <PopularSubjects />
      <StatsSection siteStats={siteStats ?? { totalStudents: 0, totalTestsTaken: 0, totalQuestionsAnswered: 0, testsAvailable: 0 }} />
      <Footer />
    </div>
  );
};

export default HomePage;
