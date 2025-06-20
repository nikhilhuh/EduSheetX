import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Subject } from "../../utils/constants";
import ErrorModal from "../../components/Modals/ErrorModal";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Topics/Hero";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Topics/MainContent";
import NotFound from "../../components/Miscellaneous/NotFound";
import { getSubjectTopics } from "../../services/api/apiCalls/common/getSubjectTopics";
import LoadingData from "../../components/Miscellaneous/LoadingData";

const Topics: React.FC = () => {
  const navigate = useNavigate();
  const { subjectName } = useParams();
  const [error, setError] = React.useState<string>("");
  const [topics, setTopics] = React.useState<Subject['topics']>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTopics = async () => {
      if (!subjectName) return;
      setLoadingData(true);
      try {
        const response = await getSubjectTopics(subjectName);
        if (response.success) {
          setTopics(response.data);
        } else {
          setError(
            response.message || "Unable to fetch Subject Topics, try again"
          );
          setTimeout(() => {
            setError("");
            navigate(-1);
          }, 2000);
        }
      } catch (err: any) {
        setError("Unable to fetch Subject Topics, try again");
        setTimeout(() => {
          setError("");
          navigate(-1);
        }, 2000);
      } finally {
        setLoadingData(false);
      }
    };
    fetchTopics();
  }, []);

  const handleTopicClick = (topic: string) => {
    if (!subjectName) return;
    navigate(`${encodeURIComponent(topic)}`);
  };

  if (!subjectName) return <NotFound text="Subject was not found." />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      <Hero />
      {/* Main content */}
      {loadingData? (
        <LoadingData text={`Searching for available topics of the ${subjectName}`} />
      ) : (
        <div className="px-4 py-2 flex-1">
        {topics.length === 0 ? (
          <NoData text="No topics found at the moment.." />
        ) : (
          <MainContent subjectName={subjectName} topics={topics} handleTopicClick={handleTopicClick} />
        )}
      </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Topics;
