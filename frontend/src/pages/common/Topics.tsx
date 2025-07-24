import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Subject } from "../../utils/constants";
import ErrorModal from "../../components/Modals/ErrorModal";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Topics/Hero";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Topics/MainContent";
import { getSubject } from "../../services/api/apiCalls/common/getSubject";
import LoadingData from "../../components/Miscellaneous/LoadingData";
import SuccessModal from "../../components/Modals/SuccessModal";
import EditSubjectModal from "../../components/Modals/EditSubjectModal";
import { useUser } from "../../context/UserContext";

const Topics: React.FC = () => {
  const navigate = useNavigate();
  const { subjectName } = useParams();
  const decodedSubjectName = subjectName ? decodeURIComponent(subjectName) : "";
  const { UserDetails } = useUser();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [subject, setSubject] = React.useState<Subject | null>(null);
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [editSubject, setEditSubject] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (decodedSubjectName) {
      fetchSubject(decodedSubjectName);
    }
  }, [decodedSubjectName]);

  React.useEffect(() => {
    if (editSubject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [editSubject]);

  const fetchSubject = async (name: string) => {
    if (!subjectName) return;
    setLoadingData(true);
    try {
      const response = await getSubject(name);
      if (response.success) {
        setSubject(response.data);
      } else {
        setError(response.message || "Unable to fetch Subject, try again");
        setTimeout(() => {
          setError("");
          navigate(-1);
        }, 2000);
      }
    } catch (err: any) {
      setError("Unable to fetch Subject, try again");
      setTimeout(() => {
        setError("");
        navigate(-1);
      }, 2000);
    } finally {
      setLoadingData(false);
    }
  };

  const handleTopicClick = (topic: string) => {
    if (!subjectName) return;
    navigate(`${encodeURIComponent(topic)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      {editSubject && UserDetails && subject && (
        <EditSubjectModal
          subject={subject}
          setError={setError}
          setSuccess={setSuccess}
          fetchSubject={fetchSubject}
          setEditSubject={setEditSubject}
          UserDetails={UserDetails}
        />
      )}
      <Navbar />
      <Hero />
      {/* Main content */}
      {loadingData ? (
        <LoadingData text={`Searching for available topics.`} />
      ) : (
        <div className="px-4 py-2 flex-1">
          {!subject ? (
            <NoData text="Subject was not found at the moment.." />
          ) : subject.topics.length === 0 ? (
            <NoData text="No topics found at the moment.." />
          ) : (
            <div className="max-w-6xl mx-auto px-4 py-16">
              <MainContent
                subject={subject}
                handleTopicClick={handleTopicClick}
              />
              {UserDetails && UserDetails.role === "teacher" && (
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="mt-10 flex justify-end"
                >
                  <button
                    onClick={() => setEditSubject(true)}
                    className="max-w-max bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded text-center text-white font-semibold"
                  >
                    Edit Subject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Topics;
