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
import AddSubjectModal from "../../components/Modals/AddSubjectModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { useUser } from "../../context/UserContext";
import { deleteSubject } from "../../services/api/apiCalls/teacher/deleteSubject";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";

const Subjects: React.FC = () => {
  const { UserDetails } = useUser();
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
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

  const handleSubjectClick = (subject: Subject) => {
    navigate(`${encodeURIComponent(subject.name)}`);
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
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      {addSubject && (
        <AddSubjectModal
          setError={setError}
          setSuccess={setSuccess}
          setAddSubject={setAddSubject}
          fetchSubjects={fetchSubjects}
        />
      )}
      {showConfirmModal && (
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
            <MainContent
              subjects={subjects}
              handleSubjectClick={handleSubjectClick}
              setAddSubject={setAddSubject}
              onDeleteClick={(subject: Subject) => {
                setSelectedSubject(subject);
                setShowConfirmModal(true);
              }}
            />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Subjects;
