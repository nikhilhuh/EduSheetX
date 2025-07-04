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
import QuestionStatusGrid from "../../components/Test/QuestionsStatusGrid";

const TestPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const test: Test = state?.test;

  const [error, setError] = React.useState<string>("");
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = test.questions[currentQuestionIndex];
  const [evaluating, setEvaluating] = React.useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = React.useState<number>(
    test.timeLimit * 60
  );

  // ✅ Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Timer logic: restore or initialize session
  React.useEffect(() => {
    const storageKey = `test_start_time_${test._id}`;
    let parsedStartTime: number;

    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      parsedStartTime = parseInt(saved);
    } else {
      parsedStartTime = Date.now();
      sessionStorage.setItem(storageKey, parsedStartTime.toString());
    }

    const endTime = parsedStartTime + test.timeLimit * 60 * 1000;

    const update = () => {
      const now = Date.now();
      const remaining = Math.floor((endTime - now) / 1000);
      if (remaining <= 0) {
        setSecondsLeft(0);
        clearInterval(interval);
        sessionStorage.removeItem(storageKey);
        // handleSubmit(); // auto submit if needed
      } else {
        setSecondsLeft(remaining);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [test._id, test.timeLimit]);

  // ✅ Clean session if navigating away (not on reload)
  React.useEffect(() => {
    const storageKey = `test_start_time_${test._id}`;

    const markReload = () => {
      sessionStorage.setItem("isReloading", "true");
    };

    window.addEventListener("beforeunload", markReload);

    return () => {
      const isReloading = sessionStorage.getItem("isReloading") === "true";

      if (!isReloading) {
        sessionStorage.removeItem(storageKey);
      }

      sessionStorage.removeItem("isReloading");
      window.removeEventListener("beforeunload", markReload);
    };
  }, [test._id]);

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
    const normalizedAnswers = test.questions.map((_, i) => answers[i] ?? null);

    try {
      const response = await getTestResult(
        test.subject,
        test.topic,
        test.name,
        normalizedAnswers
      );

      if (response.success) {
        sessionStorage.removeItem(`test_start_time_${test._id}`);
        const result = response.data;
        navigate("result", { state: { result } });
      } else {
        setError(response.message || "Something went wrong");
        setTimeout(() => setError(""), 2000);
      }
    } catch {
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

      <div className="flex-1 mx-auto space-y-4 min-w-[90vw] max-w-[95vw] laptop-sm:min-w-[70vw] laptop-sm:max-w-[70vw] px-4 py-16">
        <div className="flex justify-between items-baseline">
          <div className="text-lg text-gray-800">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </div>
          <CountdownTimer secondsLeft={secondsLeft} />
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

        <QuestionStatusGrid
          answers={answers}
          totalQuestions={test.questions.length}
          currentIndex={currentQuestionIndex}
          setCurrentIndex={setCurrentQuestionIndex}
        />

        <SubmitButton onSubmit={handleSubmit} evaluating={evaluating} />
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
