import React from "react";
import ErrorModal from "../../components/Modals/ErrorModal";
import { getSubjects } from "../../services/api/apiCalls/common/getSubjects";
import { Subject } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Subjects/Hero";
import LoadingData from "../../components/Miscellaneous/LoadingData";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Subjects/MainContent";

const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [subjects, setSubjects] = React.useState<Subject[]>([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSubjects = async () => {
      setLoadingData(true);
      try {
        const response = await getSubjects();
        if (response.success) {
          setSubjects(response.data);
        } else {
          setError(response.message || "Something went wrong.");
          setTimeout(() => setError(""), 2000);
        }
      } catch (err: any) {
        setError("Something went wrong.");
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoadingData(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectClick = (subject: Subject) => {
    navigate(`${encodeURIComponent(subject.name)}`, {
      state: { subject }, // passing subject as location.state
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      <Hero />
      {/* Main section */}
      {loadingData ? (
        <LoadingData text="Searching for Subjects" />
      ) : (
        <div className="px-4 py-2 flex-1">
          {subjects.length === 0 ? (
            <NoData text="No subjects found at the moment.." />
          ) : (
           <MainContent subjects={subjects} handleSubjectClick={handleSubjectClick} />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Subjects;
