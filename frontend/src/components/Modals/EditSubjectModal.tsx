import React from "react";
import Cliploader from "../../components/Loaders/Cliploader";
import { Subject, User } from "../../utils/constants";
import { X } from "lucide-react";
import { editSubject } from "../../services/api/apiCalls/teacher/editSubject";
import { useNavigate } from "react-router-dom";

interface EditSubjectModalProps {
  subject: Subject;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setEditSubject: React.Dispatch<React.SetStateAction<boolean>>;
  fetchSubject: (name: string) => void;
  UserDetails: User;
}

const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  subject,
  setError,
  setSuccess,
  setEditSubject,
  fetchSubject,
  UserDetails,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subjectName, setSubjectName] = React.useState<string>(
    subject.name || ""
  );
  const [topics, setTopics] = React.useState<string[]>(subject.topics || []);
  const [newTopic, setNewTopic] = React.useState<string>("");
  const [formError, setFormError] = React.useState<Record<string, string>>({});

  const handleAddTopic = () => {
    const trimmed = newTopic.trim();
    if (trimmed && !topics.includes(trimmed)) {
      setTopics((prev) => [...prev, trimmed]);
    }
    setNewTopic("");
  };

  const handleRemoveTopic = (idx: number) => {
    setTopics((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError({});

    const newErrors: Record<string, string> = {};
    if (!subjectName.trim()) {
      newErrors.name = "Subject name is required.";
    }
    if (topics.length === 0) {
      newErrors.topics = "At least one topic is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    if (!subject._id) {
      setError("Invalid subject ID.");
      setEditSubject(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      setLoading(true);

      const updatedSubject: Subject = {
        name: subjectName.trim(),
        topics,
      };

      const res = await editSubject(
        UserDetails.email,
        updatedSubject,
        subject._id
      );
      if (res.success) {
        setSuccess("Subject updated successfully!");
        navigate(`/subjects/${encodeURIComponent(updatedSubject.name)}`, {
          replace: true,
        });
        fetchSubject(updatedSubject.name);
        setEditSubject(false);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError(res.message || "Failed to update subject.");
        setEditSubject(false);
        setTimeout(() => setError(""), 2000);
      }
    } catch {
      setError("Failed to update subject.");
      setEditSubject(false);
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setFormError({});
  }, [subjectName, topics]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg tablet:shadow-md flex-1 max-w-[90vw] tablet:max-w-[80vw] laptop-sm:max-w-[60vw] laptop-lg:max-w-[50vw] mx-auto max-h-[75svh] overflow-hidden">
        <div className="p-2 tablet:p-4 text-lg tablet:text-xl font-semibold text-gray-800 border-b flex justify-between items-center">
          <h2>Edit Subject</h2>
          <X
            onClick={() => setEditSubject(false)}
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
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
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

            {topics.length > 0 && (
              <div className="max-h-[20svh] space-y-3 tablet:space-y-5 overflow-y-auto">
                {topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <input
                      id={`topic-${idx}`}
                      type="text"
                      value={topic}
                      onChange={(e) => {
                        const updated = [...topics];
                        updated[idx] = e.target.value;
                        setTopics(updated);
                      }}
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
                id="new-topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a topic"
                className={`w-full p-2 tablet:px-4 tablet:py-2 border rounded-lg focus:border-blue-500  ${
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
              {loading ? <Cliploader size={20} /> : "Update Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubjectModal;
