import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { getSiteStats } from "../../services/api/apiCalls/common/getSiteStats";
import { StatsSection } from "../../components/Home/StatsSection";
import { Instructions } from "../../components/Home/Instructions";
import Hero from "../../components/Home/Hero";
import PopularTopics from "../../components/Home/PopularTopics";

const HomePage: React.FC = () => {
  const [siteStats, setSiteStats] = React.useState<{
    totalStudents: number;
    totalTestsTaken: number;
    totalQuestionsAnswered: number;
    testsAvailable: number;
    popularTopics: { subjectName: string; topicName: string }[];
  }>();

  const defaultPopularTopics = [
    { subjectName: "Mathematics", topicName: "Trigonometric Identities" },
    { subjectName: "Mathematics", topicName: "Real Numbers" },
    { subjectName: "Mathematics", topicName: "Circles" },
    { subjectName: "Science", topicName: "Chemical Reactions and Equations" },
    {
      subjectName: "Science",
      topicName: "Heredity and Evolution",
    },
    {
      subjectName: "Science",
      topicName: "The Human Eye and the Colourful World",
    },
  ];

  const defaultSiteStats = {
    totalStudents: 0,
    totalTestsTaken: 0,
    totalQuestionsAnswered: 0,
    testsAvailable: 0,
  };

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
      <PopularTopics
        popularTopics={
          siteStats ? siteStats.popularTopics : defaultPopularTopics
        }
      />
      <StatsSection siteStats={siteStats ?? defaultSiteStats} />
      <Footer />
    </div>
  );
};

export default HomePage;
