import React from "react";
import { useUser } from "../../context/UserContext";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { addTest } from "../../services/api/apiCalls/teacher/addTest";
import Cliploader from "../../components/Loaders/Cliploader";
import Navbar from "../../components/Layout/Navbar";
import Hero from "../../components/AddTest/Hero";
import Footer from "../../components/Layout/Footer";
import TestDetails from "../../components/AddTest/TestDetails";
import Questions from "../../components/AddTest/Questions";

const AddTest: React.FC = () => {
  const { UserDetails } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [testName, setTestName] = React.useState("");
  const [timeLimit, setTimeLimit] = React.useState<string>("");
  const [questions, setQuestions] = React.useState<any[]>([
    {
    questionType: "text",
    questionText: "",
    questionImage: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correctAnswer: "",
    explanation: "",
  },
  ]);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !testName ||
      !selectedSubject ||
      !selectedTopic ||
      !timeLimit ||
      questions.length === 0
    ) {
      setError("Please fill out the fields correctly.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (!UserDetails) {
      {
        setError("Cannot find your details, please login again.");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
    }
    setLoading(true);

    const test = {
      name: testName,
      subject: selectedSubject,
      topic: selectedTopic,
      timeLimit: Number(timeLimit),
      questions,
    };
    try {
      const res = await addTest(UserDetails.email, test);
      if (res.success) {
        setTestName("");
        setSelectedSubject("");
        setSelectedTopic("");
        setTimeLimit("");
        setQuestions([
          {
            questionType: "text",
            questionText: "",
            questionImage: "",
            questionCaption: "",
            options: {
              A: "",
              B: "",
              C: "",
              D: "",
            },
            correctAnswer: "",
            explanation: "",
          },
        ]);
        setSuccess("Test added successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError(res.message || "Failed to add test.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to create test.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (!UserDetails) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />
      <Hero />
      {/* Main content */}
      <div className="p-2 flex-1">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
          <TestDetails
            testName={testName}
            setTestName={setTestName}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            setError={setError}
          />

          <Questions questions={questions} setQuestions={setQuestions} />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? <Cliploader size={20} /> : "Create Test"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddTest;
