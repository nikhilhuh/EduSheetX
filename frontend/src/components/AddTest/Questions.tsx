import React from "react";
import imageCompression from "browser-image-compression";
import { axiosInstance } from "../../services/axiosInstance";
import Cliploader from "../Loaders/Cliploader";
import SelectOptionDropdown from "../Dropdown/SelectOptionDropdown";

interface QuestionProps {
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const Questions: React.FC<QuestionProps> = ({ questions, setQuestions }) => {
  const [loading, setLoading] = React.useState<Record<number, boolean>>({});

  const toggleLoading = (index: number, isLoading: boolean) => {
    setLoading((prev) => ({ ...prev, [index]: isLoading }));
  };

  React.useEffect(() => {
    setLoading({});
  }, [questions.length]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      toggleLoading(index, true);

      const compressedFile = await imageCompression(file, options);

      // Upload to backend
      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await axiosInstance.post("/uploadquestionimage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imagePath = res.data.path;

      const updated = questions.map((q, i) =>
        i === index ? { ...q, questionImage: imagePath } : q
      );

      setQuestions(updated);
    } catch (error: any) {
      console.error("Upload error:", error.response || error.message || error);
      alert("Image upload failed. Please try another image.");
    } finally {
      toggleLoading(index, false);
    }
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...questions];

    if (
      field === "questionText" ||
      field === "correctAnswer" ||
      field === "questionType" ||
      field === "questionImage" ||
      field === "questionCaption" ||
      field === "explanation"
    ) {
      updated[index][field] = value;

      // Reset irrelevant field when question type changes
      if (field === "questionType") {
        if (value === "text") updated[index]["questionImage"] = "";
        if (value === "image") updated[index]["questionText"] = "";
      }
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  return (
    <div className="space-y-6 bg-white p-2 mobile-l:p-4 tablet:p-6 rounded-lg tablet:shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Questions
      </h2>

      <div className="space-y-5">
        {questions.map((q, idx) => (
          <div key={idx}>
            <div
              className={`flex items-center justify-between mb-3 ${
                idx > 0 ? "border-t pt-4" : ""
              }`}
            >
              <h3 className="font-medium text-gray-800">Question {idx + 1}</h3>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setQuestions((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="text-red-600 font-semibold cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor={`questiontype-${idx}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question Type
              </label>
              <select
                id={`questiontype-${idx}`}
                value={q.questionType || "text"}
                onChange={(e) =>
                  handleQuestionChange(idx, "questionType", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
              </select>

              {q.questionType === "image" ? (
                <>
                  <input
                    type="file"
                    id={`questionImage-${idx}`}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, idx)}
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {q.questionImage && (
                    <div className="mt-3 flex flex-col items-center justify-center mb-3 gap-4">
                      <img
                        src={q.questionImage}
                        alt={`Question ${idx + 1}`}
                        className="max-w-xs max-h-64 rounded border"
                      />
                      <input
                        id={`questionCaption-${idx}`}
                        type="text"
                        value={q.questionCaption}
                        onChange={(e) =>
                          handleQuestionChange(
                            idx,
                            "questionCaption",
                            e.target.value
                          )
                        }
                        placeholder="Question Caption - (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                      />
                    </div>
                  )}
                  {loading[idx] && <Cliploader size={25} color="blue" />}
                </>
              ) : (
                <input
                  type="text"
                  id={`questionText-${idx}`}
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(idx, "questionText", e.target.value)
                  }
                  placeholder={`Enter question ${idx + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                  required
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt}>
                    <label htmlFor={`Option-${opt}-${idx}`} className="sr-only">
                      Option {opt}
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium text-gray-600">
                        {opt}.
                      </span>
                      <input
                        id={`Option-${opt}-${idx}`}
                        type="text"
                        value={q.options[opt]}
                        onChange={(e) =>
                          handleQuestionChange(idx, opt, e.target.value)
                        }
                        placeholder={`Option ${opt}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <span
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Correct Answer
                </span>
                <SelectOptionDropdown options={[ {label: "A", value: "A"}, {label: "B", value: "B"}, {label: "C", value: "C"}, {label: "D", value: "D"}]} placeholder="Select correct option" onSelect={(value)=> handleQuestionChange(idx, "correctAnswer", value)}  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all cursor-pointer"/>
              </div>

              <div>
                <label
                  htmlFor={`explanation-${idx}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Explanation
                </label>
                <input
                  type="text"
                  id={`explanation-${idx}`}
                  value={q.explanation}
                  onChange={(e) =>
                    handleQuestionChange(idx, "explanation", e.target.value)
                  }
                  placeholder="Solution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          setQuestions((prev) => [
            ...prev,
            {
              questionType: "text",
              questionText: "",
              questionImage: "",
              options: { A: "", B: "", C: "", D: "" },
              correctAnswer: "",
              explanation: "",
            },
          ])
        }
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-blue-600 font-medium cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Another Question
      </button>
    </div>
  );
};

export default Questions;
