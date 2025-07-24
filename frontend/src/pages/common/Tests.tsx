import React from "react";
import { getSubjectTopicTests } from "../../services/api/apiCalls/common/getSubjectTopicTests";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { Test } from "../../utils/constants";
import Hero from "../../components/Tests/Hero";
import LoadingData from "../../components/Miscellaneous/LoadingData";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Tests/MainContent";
import NotFound from "../../components/Miscellaneous/NotFound";
import { useUser } from "../../context/UserContext";

const Tests: React.FC = () => {
  const { subjectName, topicName } = useParams();
  const { UserDetails } = useUser();
  const [error, setError] = React.useState<string>("");
  const [tests, setTests] = React.useState<Test[]>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchSubjectTopicTests();
  }, [subjectName, topicName, UserDetails]);

  if (!subjectName || !topicName)
    return <NotFound text="Subject or Topic was not found." />;

  const fetchSubjectTopicTests = async () => {
    if (!subjectName || !topicName) return;
    try {
      setLoadingData(true);
      const response = await getSubjectTopicTests(subjectName, topicName);
      if (response.success) {
        setTests(response.data);
      } else {
        setError("Could not connect to the server, try refreshing the page");
      }
    } catch (err) {
      setError("Could not connect to the server, try refreshing the page");
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && (
        <div className="text-white text-center px-4 py-1 w-full bg-red-400/80 font-inter font-bold text-sm tablet:text-base">
          {error}
        </div>
      )}
      <Navbar />
      <Hero />
      {/* Main content */}
      {loadingData ? (
        <LoadingData text="Searching for test papers to practice" />
      ) : (
        <div className="px-4 py-2 flex-1">
          {tests.length === 0 ? (
            <NoData text="No tests of this topic can be found at the moment.." />
          ) : (
            <MainContent tests={tests} />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Tests;
