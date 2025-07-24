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
import { axiosInstance } from "../../services/axiosInstance";
import Unauthorized from "../common/Unauthorized";

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
      questionImage: null,
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
  const [formError, setFormError] = React.useState<Record<string, string>>({});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  if (!UserDetails) return <Unauthorized />;

  // function to handle adding test 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(loading) return; // Prevent multiple submissions
    setFormError({}); // Reset form errors

    // check for form errors and inform user
    if (
      !testName.trim() ||
      !selectedSubject.trim() ||
      !selectedTopic.trim() ||
      !timeLimit.trim() ||
      questions.length === 0
    ) {
      if (
        !testName.trim() ||
        !selectedSubject.trim() ||
        !selectedTopic.trim() ||
        !timeLimit.trim() ||
        questions.length === 0
      ) {
        const newErrors: Record<string, string> = {};

        if (!testName.trim()) newErrors.testName = "Test name is required.";
        if (!selectedSubject.trim()) newErrors.subject = "Subject is required.";
        if (!selectedTopic.trim()) newErrors.topic = "Topic is required.";
        if (!timeLimit.trim()) newErrors.timeLimit = "Time limit is required.";
        if (questions.length === 0)
          newErrors.questions = "At least one question is required.";

        setFormError(newErrors);
        return;
      }
    }
    setLoading(true);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (q.questionImage) {
        const formData = new FormData();
        formData.append("image", q.questionImage);

        try {
          const res = await axiosInstance.post(
            "/uploadquestionimage",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          questions[i].questionImage = res.data.path; // set final image path
        } catch (error) {
          console.error("Image upload failed for question", i, error);
          setError(`Image upload failed for question ${i + 1}`);
          setTimeout(() => {
            setError("");
          }, 2000);
          setLoading(false);
          return;
        }
      }
    }

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
            formError={formError}
            setFormError={setFormError}
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
