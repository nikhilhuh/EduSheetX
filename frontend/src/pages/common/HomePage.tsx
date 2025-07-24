import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { getSiteStats } from "../../services/api/apiCalls/common/getSiteStats";
import { StatsSection } from "../../components/Home/StatsSection";
import { Instructions } from "../../components/Home/Instructions";
import Hero from "../../components/Home/Hero";
import PopularTopics from "../../components/Home/PopularTopics";
import { getOrCreateUserId } from "../../utils/getOrCreateUserId";
import FAQ from "../../components/Home/FAQ";

const defaultSiteStats = {
  totalStudents: 0,
  totalTestsTaken: 0,
  totalQuestionsAnswered: 0,
  testsAvailable: 0,
  popularTopics: [],
};

const HomePage: React.FC = () => {
  const [siteStats, setSiteStats] = React.useState<typeof defaultSiteStats>();
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const init = async () => {
      await getOrCreateUserId();

      try {
        const response = await getSiteStats();
        if (response.success) {
          setSiteStats(response.data);
        } else {
          setError(
            "Problem in connecting to server. Please try refreshing the page."
          );
        }
      } catch (err) {
        setError(
          "Problem in connecting to server. Please try refreshing the page."
        );
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      {error && (
        <div className="text-white text-center px-4 py-1 w-full bg-red-400/80 font-inter font-bold text-sm tablet:text-base">
          {error}
        </div>
      )}
      <Navbar />
      <Hero />
      <Instructions />
      {siteStats && siteStats.popularTopics.length > 0 && (
        <PopularTopics
          popularTopics={siteStats.popularTopics}
        />
      )}
      <StatsSection siteStats={siteStats ?? defaultSiteStats} />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
