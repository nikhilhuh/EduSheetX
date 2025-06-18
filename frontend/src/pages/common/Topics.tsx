import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Subject } from "../../utils/constants";
import ErrorModal from "../../components/Modals/ErrorModal";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Topics/Hero";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Topics/MainContent";
import NotFound from "../../components/Miscellaneous/NotFound";

const Topics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState<string>("");
  // Try to retrieve subject from state or sessionStorage
  const [subject, setSubject] = React.useState<Subject | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const subjectFromState = location.state?.subject;
    if (subjectFromState) {
      setSubject(subjectFromState);
      sessionStorage.setItem(
        "selectedSubject",
        JSON.stringify(subjectFromState)
      );
    } else {
      const stored = sessionStorage.getItem("selectedSubject");
      if (stored) {
        setSubject(JSON.parse(stored));
      } else {
        setError("Unable to fetch Subject Topics, try again");
        setTimeout(() => {
          setError("");
          navigate(-1);
        }, 2000);
      }
    }
  }, []);

  const handleTopicClick = (topic: string) => {
    if (!subject) return;
    navigate(`${encodeURIComponent(topic)}`, {
      state: { topic }, // passing topic as location.state
    });
  };

  if (!subject) return <NotFound text="Subject was not found." />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      <Hero />
      {/* Main content */}
      <div className="px-4 py-2 flex-1">
        {subject.topics.length === 0 ? (
          <NoData text="No topics found at the moment.." />
        ) : (
          <MainContent subject={subject} handleTopicClick={handleTopicClick} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Topics;
