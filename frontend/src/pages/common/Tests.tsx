import React from "react";
import { getSubjectTopicTests } from "../../services/api/apiCalls/common/getSubjectTopicTests";
import ErrorModal from "../../components/Modals/ErrorModal";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { Test } from "../../utils/constants";
import Hero from "../../components/Tests/Hero";
import LoadingData from "../../components/Miscellaneous/LoadingData";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Tests/MainContent";
import NotFound from "../../components/Miscellaneous/NotFound";

const Tests: React.FC = () => {
  const { subjectName, topicName } = useParams();
  const [error, setError] = React.useState<string>("");
  const [tests, setTests] = React.useState<Test[]>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0,0);
    const fetchSubjectTopicTests = async () => {
      if (!subjectName || !topicName) return;
      setLoadingData(true);
      try {
        const response = await getSubjectTopicTests(subjectName, topicName);
        if (response.success) {
          setTests(response.data);
        } else {
          setError(
            response.message || `Couldn't load test papers of ${topicName}`
          );
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      } catch (err) {
        setError(`Couldn't load test papers of ${topicName}`);
        setTimeout(() => {
          setError("");
        }, 2000);
      } finally {
        setLoadingData(false);
      }
    };
    fetchSubjectTopicTests();
  }, [subjectName, topicName]);

  if (!subjectName || !topicName)
    return <NotFound text="Subject or Topic was not found." />

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
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
            <MainContent tests={tests} setError={setError}/>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Tests;
