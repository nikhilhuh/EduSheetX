import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/Status Modals/ErrorModal";
import Timer from "../../components/Test/Timer";

const Test: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const test = state?.test;
  const [error, setError] = React.useState<string>("");
  const [answers, setAnswers] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    if (!test) {
      setError("Test data not found.");
      setTimeout(() => {
        setError("");
        navigate(-1);
      }, 2000);
    }
  }, [test, navigate]);

  if (!test) return null;

  const handleOptionChange = (qIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Test submitted!");
    // TODO: Save answers to backend
    navigate(-1);
  };

  return (
    <div className="flex-grow space-y-4">
      {error && <ErrorModal error={error} />}
      <div className="flex items-center justify-between sticky top-0 left-0 bg-[var(--color-secondary)]">
        <div>
          <h2 className="text-2xl font-bold">{test.name}</h2>
          <p className="text-gray-600">Topic: {test.topic}</p>
        </div>
        <Timer minutes={test.timeLimit} onComplete={handleSubmit} />
      </div>

      <ol className="space-y-6">
        {test.questions.map((q: any, index: number) => (
          <li key={index} className="p-4 border rounded">
            <p className="font-medium mb-2">
              {index + 1}. {q.questionText}
            </p>
            <ul className="space-y-1">
              {["A", "B", "C", "D"].map((opt) => (
                <li key={opt}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={opt}
                      checked={answers[index] === opt}
                      onChange={() => handleOptionChange(index, opt)}
                      className="cursor-pointer"
                    />
                    {q.options[opt]}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default Test;
