import React from "react";
import { getSubjects } from "../../services/api/apiCalls/common/getSubjects";
import { Subject } from "../../utils/constants";
import { debounce } from "lodash";
import { useUser } from "../../context/UserContext";
import { validateTestName } from "../../services/api/apiCalls/teacher/addTest";
import Cliploader from "../Loaders/Cliploader";

interface TestDetailsProps {
  testName: string;
  setTestName: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedTopic: string;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
  timeLimit: string;
  setTimeLimit: React.Dispatch<React.SetStateAction<string>>;
  formError: Record<string, string>;
  setFormError: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const TestDetails: React.FC<TestDetailsProps> = ({
  testName,
  setTestName,
  selectedSubject,
  setSelectedSubject,
  selectedTopic,
  setSelectedTopic,
  timeLimit,
  setTimeLimit,
  formError,
  setFormError,
}) => {
  const { UserDetails } = useUser();
  const [loadingName, setLoadingName] = React.useState<boolean>(false);
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(
    null
  );
  const [subjectOptions, setSubjectOptions] = React.useState<
    {
      label: string;
      value: string;
      topics: string[];
    }[]
  >([]);
  const [topicOptions, setTopicOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!UserDetails) return;

    const fetchSubjects = async () => {
      const newErrors: Record<string, string> = {};
      try {
        const res = await getSubjects();
        if (res.success) {
          const subs = res.data.map((sub: Subject) => ({
            label: sub.name.toUpperCase(),
            value: sub._id,
            topics: sub.topics,
          }));
          setSubjectOptions(subs);
        } else {
          newErrors.subject =
            "Failed to fetch subjects, try reloading the page";
        }
      } catch (err) {
        newErrors.subject = "Failed to fetch subjects, try reloading the page";
      } finally {
        if (Object.keys(newErrors).length > 0) {
          setFormError((prev) => ({ ...prev, ...newErrors }));
        }
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

  // Debounced validation function
  const debouncedValidate = React.useCallback(
    debounce(async (name: string) => {
      if (!name.trim() || !UserDetails) {
        setNameAvailable(null);
        return;
      }

      setLoadingName(true);
      try {
        const res = await validateTestName(UserDetails.email, name);
        setNameAvailable(res.success);
      } catch (error) {
        setNameAvailable(false);
      } finally {
        setLoadingName(false);
      }
    }, 500),
    [UserDetails]
  );

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);

  return (
    <div className="space-y-6 bg-white p-2 mobile-l:p-4 tablet:p-6 rounded-lg tablet:shadow-md">
      {/* Test Details Section */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Test Details
      </h2>

      <div className="space-y-4">
        {/* Test Name */}
        <div>
          <label
            htmlFor="Test Name"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Test Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="Test Name"
              value={testName}
              onChange={(e) => {
                setFormError((prev) => ({ ...prev, testName: "" }));
                setTestName(e.target.value);
                debouncedValidate(e.target.value);
              }}
              placeholder="Enter test name"
              className={`w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all overflow-x-hidden break-words overflow-y-auto ${
                formError.testName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {/* Only show indicator when not empty and not typing */}
            {testName && nameAvailable !== null && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {loadingName ? (
                  <Cliploader size={10} color="green" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      nameAvailable ? "text-green-500" : "text-red-500"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {nameAvailable ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                )}
              </div>
            )}
            {/* test name error */}
            {formError.testName && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {formError.testName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject Select */}
          <div>
            <label
              htmlFor="SubjectSelect"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <select
              id="SubjectSelect"
              value={selectedSubject}
              onChange={(e) => {
                setFormError((prev) => ({ ...prev, subject: "" }));
                setSelectedSubject(e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500 transition-all cursor-pointer ${
                formError.subject ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((sub) => (
                <option
                  key={sub.value}
                  value={sub.value}
                  className="text-gray-800"
                >
                  {sub.label}
                </option>
              ))}
            </select>

            {/* subject error */}
            {formError.subject && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {formError.subject}
              </p>
            )}
          </div>
          {/* Topic Select */}
          <div>
            <label
              htmlFor="TopicSelect"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              Topic
            </label>
            <select
              id="TopicSelect"
              value={selectedTopic}
              onChange={(e) => {
                setFormError((prev) => ({ ...prev, topic: "" }));
                setSelectedTopic(e.target.value);
              }}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500 transition-all cursor-pointer ${
                formError.topic ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option>Select Topic</option>
              {topicOptions.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            {/* topic error */}
            {formError.topic && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {formError.topic}
              </p>
            )}
          </div>
          {/* Time Limit */}
          <div>
            <label
              htmlFor="TimeLimit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Limit (minutes)
            </label>
            <input
              id="TimeLimit"
              type="number"
              value={timeLimit}
              onChange={(e) => {
                setFormError((prev) => ({ ...prev, timeLimit: "" }));
                setTimeLimit(e.target.value);
              }}
              placeholder="e.g. 30"
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500 transition-all cursor-pointer ${
                formError.timeLimit ? "border-red-500" : "border-gray-300"
              }`}
              min={1}
              required
            />

            {/* time limit error */}
            {formError.timeLimit && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {formError.timeLimit}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
