import React from "react";
import Cliploader from "../Loaders/Cliploader";
import { extractQuestions } from "../../services/api/apiCalls/teacher/extractQuestions";
import { useUser } from "../../context/UserContext";

interface ExtractQuestionsProps {
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

const ExtractQuestions: React.FC<ExtractQuestionsProps> = ({
  setQuestions,
  setError,
  setSuccess,
}) => {
  const { UserDetails } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExtraction = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (!UserDetails) {
      setError("Cannot find your details, please login again.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);

    try {
      const res = await extractQuestions(UserDetails.email, formData);
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        const transformed = data.questions.map((q: any) => ({
          questionText: q.question,
          options: {
            A: q.options[0] || "",
            B: q.options[1] || "",
            C: q.options[2] || "",
            D: q.options[3] || "",
          },
          correctAnswer: q.correctAnswer,
        }));
        setQuestions(transformed);
        setSuccess("Questions auto-filled from image!");
        setTimeout(() => setSuccess(""), 2000);
      } else {
        setError("No questions found in the uploaded file.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("Failed to extract questions.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 px-4 py-2">
      <div className="text-sm font-medium text-gray-700">
        Upload Image/PDF of Test (Auto-fill questions)
      </div>
      <div className="flex items-center gap-4">
        <label
          htmlFor="fileUpload"
          className="cursor-pointer max-w-[80vw] px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all"
        >
          📄 {selectedFile ? selectedFile.name : "Select Image or PDF"}
        </label>

        <input
          id="fileUpload"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <button
        type="button"
        onClick={handleExtraction}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-all shadow-md hover:shadow-lg cursor-pointer"
        disabled={loading}
      >
        {loading ? <Cliploader size={20} /> : "Extract Questions"}
      </button>
    </div>
  );
};

export default ExtractQuestions;
