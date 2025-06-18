import React from "react";
import { useUser } from "../../context/UserContext";
import { getSubjects } from "../../services/api/apiCalls/common/getSubjects";
import { Subject } from "../../utils/constants";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { addTest } from "../../services/api/apiCalls/teacher/addTest";
import Clockloader from "../../components/Loaders/Clockloader";

const AddTests: React.FC = () => {
  const { UserDetails } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [subjectOptions, setSubjectOptions] = React.useState<
    {
      label: string;
      value: string;
      topics: string[];
    }[]
  >([]);
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [topicOptions, setTopicOptions] = React.useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = React.useState("");

  const [testName, setTestName] = React.useState("");
  const [timeLimit, setTimeLimit] = React.useState<number>(30);
  const [numQuestions, setNumQuestions] = React.useState<number>(1);
  const [questions, setQuestions] = React.useState<any[]>([]);

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    if (!UserDetails) return;
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await getSubjects(UserDetails.email);
        if (res.success) {
          const subs = res.data.map((sub: Subject) => ({
            label: sub.name.toUpperCase(),
            value: sub._id,
            topics: sub.topics,
          }));
          setSubjectOptions(subs);
        } else {
          setError("Failed to fetch subjects.");
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      } catch (err) {
        setError("Failed to fetch subjects.");
        setTimeout(() => {
          setError("");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [UserDetails]);

  React.useEffect(() => {
    if (selectedSubject) {
      const found = subjectOptions.find((s) => s.value === selectedSubject);
      if (found) setTopicOptions(found.topics);
    } else {
      setTopicOptions([]);
    }
    setSelectedTopic("");
  }, [selectedSubject]);

  React.useEffect(() => {
    const newQuestions = Array.from({ length: numQuestions }, (_) => ({
      questionText: "",
      options: { A: "", B: "", C: "", D: "" },
      correctAnswer: "",
    }));
    setQuestions(newQuestions);
  }, [numQuestions]);

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...questions];
    if (field === "questionText" || field === "correctAnswer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !testName ||
      !selectedSubject ||
      !selectedTopic ||
      !timeLimit ||
      questions.length === 0
    )
      return;

    if (!UserDetails) return;
    setLoading(true);

    const test = {
      name: testName,
      subject: selectedSubject,
      topic: selectedTopic,
      timeLimit,
      questions,
    };
    try {
      const res = await addTest(UserDetails.email, test);
      if (res.success) {
        setSuccess("Test created successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError("Failed to create test.");
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
    <div className="flex-grow">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Clockloader size={60} />
        </div>
      ) : (
        <>
          <h2 className="text-2xl laptop-lg:text-3xl font-bold mb-6 text-center">
            Create New Test
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Test Name"
                className="w-full border p-2 rounded shadow-sm outline-none"
                required
              />
            </div>

            <div>
              <select
                id="SubjectSelect"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border p-3 rounded outline-none"
                required
              >
                <option>Select Subject</option>
                {subjectOptions.map((sub) => (
                  <option
                    key={sub.value}
                    value={sub.value}
                    className="text-black"
                  >
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                id="TopicSelect"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full border p-3 rounded outline-none"
                required
              >
                <option>Select Topic</option>
                {topicOptions.map((topic, i) => (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="TimeLimit" className="block mb-1 font-medium">
                  Time Limit (minutes)
                </label>
                <input
                  id="TimeLimit"
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  placeholder="Time Limit (minutes)"
                  className="border p-3 rounded w-full outline-none"
                  min={1}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="QuestionsNumber"
                  className="block mb-1 font-medium"
                >
                  Number of Questions
                </label>
                <input
                  id="QuestionsNumber"
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  placeholder="Number of Questions"
                  className="border p-3 rounded w-full outline-none"
                  min={1}
                  required
                />
              </div>
            </div>

            {questions.map((q, idx) => (
              <div key={idx}>
                <div className="block mb-1 font-medium">Question {idx + 1}</div>
                <div className="p-4 border rounded shadow-sm space-y-2">
                  <input
                    type="text"
                    id={`question-${idx}`}
                    value={q.questionText}
                    onChange={(e) =>
                      handleQuestionChange(idx, "questionText", e.target.value)
                    }
                    placeholder={`Question ${idx + 1}`}
                    className="w-full border p-2 rounded outline-none"
                    required
                  />
                  {["A", "B", "C", "D"].map((opt) => (
                    <div key={opt}>
                      <input
                        id={`Option-${opt}-${idx}`}
                        type="text"
                        value={q.options[opt]}
                        onChange={(e) =>
                          handleQuestionChange(idx, opt, e.target.value)
                        }
                        placeholder={`Option ${opt}`}
                        className="w-full border p-2 rounded outline-none"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <select
                      id={`correctanswer-${idx}`}
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          idx,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      className="w-full border p-2 rounded outline-none"
                      required
                    >
                      <option value="">Correct Answer</option>
                      {["A", "B", "C", "D"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Create Test
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddTests;
