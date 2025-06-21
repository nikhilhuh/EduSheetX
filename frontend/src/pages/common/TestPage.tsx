import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { getTestResult } from "../../services/api/apiCalls/common/getTestResult";
import Hero from "../../components/Test/Hero";
import CountdownTimer from "../../components/Test/CountdownTimer";
import QuestionCard from "../../components/Test/QuestionCard";
import ProgressBar from "../../components/Test/ProgressBar";
import NavigationButtons from "../../components/Test/NavigationButtons";
import SubmitButton from "../../components/Test/SubmitButton";
import { Test } from "../../utils/constants";
import NotFound from "../../components/Miscellaneous/NotFound";
import EvaluationModal from "../../components/Modals/EvaluationModal";

const TestPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const test: Test = state?.test;
  const [error, setError] = React.useState<string>("");
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = test.questions[currentQuestionIndex];
  const [evaluating, setEvaluating] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!test) return <NotFound text="Test was not found." />;

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionChange = (qIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = async () => {
    setEvaluating(true);
    const normalizedAnswers = test.questions.map(
      (_: any, i: number) => answers[i] ?? null
    );

    try {
      const response = await getTestResult(
        test.subject,
        test.topic,
        test.name,
        normalizedAnswers
      );

      if (response.success) {
        localStorage.removeItem(`test_start_time_${test._id}`);
        const result = response.data;
        navigate("result", { state: { result } });
      } else {
        setError(response.message || "Something went wrong");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err: any) {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      {evaluating && <EvaluationModal message="Evaluating your test" />}
      <Navbar />
      <Hero />

      {/* Main content */}
      <div className="flex-1 mx-auto space-y-4 min-w-[90vw] max-w-[95vw] laptop-sm:min-w-[70vw] laptop-sm:max-w-[70vw] px-4 py-16">
        {/* Question number and countdown timer */}
        <div className="flex justify-between items-baseline">
          <div className="text-lg text-gray-800">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </div>
          <CountdownTimer minutes={test.timeLimit} testId={test._id} />
        </div>

        <ProgressBar
          currentIndex={currentQuestionIndex}
          totalQuestions={test.questions.length}
        />

        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          selectedAnswer={answers[currentQuestionIndex]}
          onOptionChange={handleOptionChange}
        />

        <NavigationButtons
          currentIndex={currentQuestionIndex}
          totalQuestions={test.questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <SubmitButton onSubmit={handleSubmit} evaluating={evaluating} />
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
