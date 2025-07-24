import React from "react";
import Cliploader from "../../components/Loaders/Cliploader";
import { Subject, User } from "../../utils/constants";
import { addSubject } from "../../services/api/apiCalls/teacher/addSubject";
import { X } from "lucide-react";

interface AddSubjectModalProps {
  setMainError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setAddSubject: React.Dispatch<React.SetStateAction<boolean>>;
  fetchSubjects: () => void;
  UserDetails: User;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  setMainError,
  setSuccess,
  setAddSubject,
  fetchSubjects,
  UserDetails,
}) => {
  const [formError, setFormError] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subject, setSubject] = React.useState<Subject>({
    name: "",
    topics: [],
  });
  const [newTopic, setNewTopic] = React.useState<string>("");

  const handleAddTopic = () => {
    const trimmed = newTopic.trim();
    if (trimmed && !subject.topics.includes(trimmed)) {
      setSubject((prev) => ({
        ...prev,
        topics: [...prev.topics, trimmed],
      }));
    }
    setNewTopic("");
  };

  const handleRemoveTopic = (idx: number) => {
    setSubject((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError({});

    const newErrors: Record<string, string> = {};
    if (!subject.name.trim()) {
      newErrors.name = "Subject name is required.";
    }
    if (subject.topics.length === 0) {
      newErrors.topics = "At least one topic is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await addSubject(UserDetails.email, subject);
      if (res.success) {
        setSubject({ name: "", topics: [] });
        setNewTopic("");
        setAddSubject(false);
        setSuccess("Subject added successfully!");
        setTimeout(() => {
          fetchSubjects();
          setSuccess("");
        }, 2000);
      } else {
        setAddSubject(false);
        setMainError(res.message || "Failed to add subject.");
        setTimeout(() => setMainError(""), 2000);
      }
    } catch {
      setAddSubject(false);
      setMainError("Failed to add subject.");
      setTimeout(() => setMainError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setFormError({});
  }, [subject]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg tablet:shadow-md flex-1 max-w-[90vw] tablet:max-w-[80vw] laptop-sm:max-w-[60vw] laptop-lg:max-w-[50vw] mx-auto max-h-[75svh] overflow-hidden">
        <div className="p-2 tablet:p-4 text-lg tablet:text-xl font-semibold text-gray-800 border-b flex justify-between items-center">
          <h2>Add Subject</h2>
          <X
            onClick={() => setAddSubject(false)}
            className="text-red-500 cursor-pointer"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 tablet:space-y-6 p-3 tablet:p-6"
        >
          {/* Subject Name */}
          <div>
            <label
              htmlFor="subjectName"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Subject Name
            </label>
            <input
              id="subjectName"
              name="subjectName"
              type="text"
              value={subject.name}
              onChange={(e) =>
                setSubject((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. Science, History, etc."
              className={`w-full p-2 tablet:px-4 tablet:py-2 border rounded-lg focus:border-blue-500 ${
                formError.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {formError.name && (
              <p className="text-red-500 text-xs tablet:text-sm mt-1 ml-1">
                {formError.name}
              </p>
            )}
          </div>

          {/* Topics Section */}
          <div className="space-y-3 tablet:space-y-5">
            <h3 className="font-medium text-gray-800 border-t pt-4">Topics</h3>
            {formError.topics && (
              <p className="text-red-500 text-xs tablet:text-sm mt-1 ml-1">
                {formError.topics}
              </p>
            )}

            {subject.topics.length > 0 && (
              <div className="max-h-[20svh] space-y-3 tablet:space-y-5 overflow-y-auto">
                {subject.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <input
                      type="text"
                      id={`topic-${idx}`}
                      value={topic}
                      disabled
                      className="w-full p-2 tablet:px-4 tablet:py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(idx)}
                      className="ml-2 text-xs tablet:text-base tablet:ml-3 text-red-600 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 items-center">
              <input
                type="text"
                id="add-topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a topic"
                className={`w-full p-2 tablet:px-4 tablet:py-2 border rounded-lg focus:border-blue-500 ${
                  formError.topics ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={handleAddTopic}
                className="bg-blue-600 text-white p-2 tablet:px-4 tablet:py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={
                loading || !UserDetails || UserDetails.role !== "teacher"
              }
              className={`bg-blue-600 text-white px-4 py-2 tablet:px-8 tablet:py-3 rounded-lg focus:outline-none transition-all shadow-md hover:shadow-lg ${
                loading
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer hover:bg-blue-700"
              }`}
            >
              {loading ? <Cliploader size={20} /> : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectModal;
