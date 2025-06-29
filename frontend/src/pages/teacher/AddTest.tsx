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
    questionText: "Which of the following is a quadratic equation?",
    questionImage: "",
    options: {
      A: "x² + 2x + 1 = 0",
      B: "x + 3 = 0",
      C: "2x³ - 5x = 0",
      D: "4x + 1 = 0",
    },
    correctAnswer: "A",
    explanation: "A quadratic equation has the highest degree 2. Option A is quadratic.",
  },
  {
    questionType: "text",
    questionText: "Find the discriminant of the equation x² - 4x + 4 = 0.",
    questionImage: "",
    options: {
      A: "16",
      B: "0",
      C: "4",
      D: "8",
    },
    correctAnswer: "B",
    explanation: "D = b² - 4ac = (-4)² - 4×1×4 = 16 - 16 = 0.",
  },
  {
    questionType: "text",
    questionText: "What are the roots of x² - 5x + 6 = 0?",
    questionImage: "",
    options: {
      A: "x = 3, 2",
      B: "x = -3, -2",
      C: "x = 1, 6",
      D: "x = -1, -6",
    },
    correctAnswer: "A",
    explanation: "Factoring: x² - 5x + 6 = (x - 2)(x - 3), roots are x = 2 and x = 3.",
  },
  {
    questionType: "text",
    questionText: "If one root of the quadratic equation is 3, and the other is -2, what is the equation?",
    questionImage: "",
    options: {
      A: "x² - x - 6 = 0",
      B: "x² - x + 6 = 0",
      C: "x² + x - 6 = 0",
      D: "x² - x - 5 = 0",
    },
    correctAnswer: "A",
    explanation: "Equation from roots α and β: x² - (α + β)x + αβ. Sum = 1, product = -6.",
  },
  {
    questionType: "text",
    questionText: "How many real roots does the equation x² + 4x + 5 = 0 have?",
    questionImage: "",
    options: {
      A: "2 real roots",
      B: "1 real root",
      C: "No real roots",
      D: "Infinite roots",
    },
    correctAnswer: "C",
    explanation: "Discriminant = 16 - 20 = -4. Negative means no real roots.",
  },
  {
    questionType: "text",
    questionText: "Solve: 2x² - 3x - 5 = 0. Which of the following is a correct root?",
    questionImage: "",
    options: {
      A: "x = 5, -2",
      B: "x = -1, 5/2",
      C: "x = 5/2, -1",
      D: "x = 2, -5",
    },
    correctAnswer: "C",
    explanation: "Use quadratic formula: x = [-(-3) ± √((-3)² - 4×2×-5)] / 2×2 = (3 ± √49)/4 = (3 ± 7)/4.",
  },
  {
    questionType: "text",
    questionText: "What is the value of k if x² + kx + 16 = 0 has equal roots?",
    questionImage: "",
    options: {
      A: "±8",
      B: "0",
      C: "4",
      D: "16",
    },
    correctAnswer: "A",
    explanation: "Equal roots ⇒ Discriminant = 0 ⇒ k² - 64 = 0 ⇒ k = ±8.",
  },
  {
    questionType: "text",
    questionText: "Find the roots of the equation x² - 2√2x + 2 = 0.",
    questionImage: "",
    options: {
      A: "x = √2",
      B: "x = √2 ± i",
      C: "x = √2 ± 1",
      D: "x = √2 ± √2",
    },
    correctAnswer: "A",
    explanation: "It is a perfect square: (x - √2)² = 0 ⇒ x = √2.",
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
