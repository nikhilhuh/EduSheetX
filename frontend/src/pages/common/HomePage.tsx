import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { getSiteStats } from "../../services/api/apiCalls/common/getSiteStats";
import { StatsSection } from "../../components/Home/StatsSection";
import { Instructions } from "../../components/Home/Instructions";
import Hero from "../../components/Home/Hero";

const HomePage: React.FC = () => {
  const [siteStats, setSiteStats] = React.useState<{
    totalStudents: number;
    totalTestsTaken: number;
    totalQuestionsAnswered: number;
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
      <StatsSection siteStats={siteStats ?? { totalStudents: 0, totalTestsTaken: 0, totalQuestionsAnswered: 0 }} />
      <Footer />
    </div>
  );
};

export default HomePage;
