import React from "react";
import { getSubjectTopicTests } from "../../services/api/apiCalls/common/getSubjectTopicTests";
import ErrorModal from "../../components/Modals/Status Modals/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Clockloader from "../../components/Loaders/Clockloader";
import NoDataImg from "../../assets/images/nodata.svg";
import TestData from "../../components/Test/TestData";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";

const Tests: React.FC = () => {
  const { subjectName, topicName } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");
  const [tests, setTests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchSubjectTopicTests = async () => {
      if (!subjectName || !topicName) return;
      setLoading(true);
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
        setLoading(false);
      }
    };
    fetchSubjectTopicTests();
  }, [subjectName, topicName]);

  if (!subjectName || !topicName)
    return (
      <div className="px-4 py-2 flex-1">
        <div className="flex flex-col w-full mt-4 justify-center items-center gap-4">
          <img src={NoDataImg} alt="No Data" className="h-[45vh] w-auto" />
          <p className="text-gray-800 text-xl text-center">
            Oops..!
            <br />
            Subject or Topic was not found.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      <div
        onClick={() => navigate(-1)}
        title="Go Back"
        className="p-2 bg-[var(--color-primary)] max-w-max rounded-full cursor-pointer hover:scale-105 transition"
      >
        <IoMdArrowRoundBack className="text-2xl" />
      </div>
      <h2 className="text-2xl font-bold capitalize mt-4 mb-4">
        Tests for {subjectName} - {topicName}
      </h2>

      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Clockloader size={60} />
        </div>
      ) : (
        <>
          {tests.length === 0 ? (
            <div className="flex flex-col h-full w-full justify-center items-center gap-4">
              <img src={NoDataImg} alt="No Data" className="h-[25vh] w-auto" />
              <p className="text-gray-400">No tests found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop-sm:grid-cols-3 gap-4">
              {tests.map((test, index) => (
                <TestData
                  key={index}
                  subjectName={subjectName}
                  topicName={topicName}
                  test={test}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Tests;
