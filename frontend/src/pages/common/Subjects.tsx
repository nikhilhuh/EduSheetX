import React from "react";
import ErrorModal from "../../components/Modals/ErrorModal";
import { getSubjects } from "../../services/api/apiCalls/common/getSubjects";
import { Subject } from "../../utils/constants";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Subjects/Hero";
import LoadingData from "../../components/Miscellaneous/LoadingData";
import NoData from "../../components/Miscellaneous/NoData";
import MainContent from "../../components/Subjects/MainContent";
import AddSubjectModal from "../../components/Modals/AddSubjectModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { useUser } from "../../context/UserContext";
import { deleteSubject } from "../../services/api/apiCalls/teacher/deleteSubject";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";

const Subjects: React.FC = () => {
  const { UserDetails } = useUser();
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [mainError, setMainError] = React.useState<string>("");
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [addSubject, setAddSubject] = React.useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(
    null
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchSubjects();
  }, []);

  React.useEffect(() => {
    if (addSubject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [addSubject]);

  const fetchSubjects = async () => {
    setLoadingData(true);
    try {
      const response = await getSubjects();
      if (response.success) {
        setSubjects(response.data);
      } else {
        setError("Could not connect to the server, try refreshing the page.");
      }
    } catch (err: any) {
      setError("Could not connect to the server, try refreshing the page.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (
      !UserDetails ||
      UserDetails.role !== "teacher" ||
      !selectedSubject ||
      !selectedSubject._id
    )
      return;

    try {
      const response = await deleteSubject(
        UserDetails.email,
        selectedSubject._id
      );
      if (response.success) {
        setSuccess("Subject deleted successfully");
        fetchSubjects();
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError(response.message || "Failed to delete subject");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError("Failed to delete subject");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && (
        <div className="text-white text-center px-4 py-1 w-full bg-red-400/80 font-inter font-bold text-sm tablet:text-base">
          {error}
        </div>
      )}
      {mainError && <ErrorModal error={mainError} />}
      {success && <SuccessModal success={success} />}
      {addSubject && UserDetails && (
        <AddSubjectModal
          setMainError={setMainError}
          setSuccess={setSuccess}
          setAddSubject={setAddSubject}
          fetchSubjects={fetchSubjects}
          UserDetails={UserDetails}
        />
      )}
      {showConfirmModal && UserDetails && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${selectedSubject?.name}"?`}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
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
            <div className="max-w-6xl mx-auto px-4 py-16">
              <MainContent
                subjects={subjects}
                setAddSubject={setAddSubject}
                onDeleteClick={(subject: Subject) => {
                  setSelectedSubject(subject);
                  setShowConfirmModal(true);
                }}
              />
              {UserDetails && UserDetails.role === "teacher" && (
                <div
                  className="mt-10 flex justify-end"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <button
                    onClick={() => setAddSubject(true)}
                    className="max-w-max bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded text-center text-white font-semibold"
                  >
                    Add Subject
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

export default Subjects;
