import React from "react";
import { useLocation } from "react-router-dom";
import { ResultType } from "../../utils/constants";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Result/Hero";
import NavigationButtons from "../../components/Result/NavigationButtons";
import Review from "../../components/Result/Review";
import NotFound from "../../components/Miscellaneous/NotFound";
import Explanation from "../../components/Result/Explanation";

const TestResultPage: React.FC = () => {
  const { state } = useLocation();
  const result: ResultType | undefined = state?.result;
  const [panel, setPanel] = React.useState<"review" | "explanation">("review");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!result) return <NotFound text="No result data found." />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero result={result} />
      {/* Main Content */}
      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        className="flex-1 mx-auto space-y-4 min-w-[90vw] laptop-sm:min-w-[60vw] laptop-sm:max-w-[70vw] px-4 py-6"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <button
            onClick={() => setPanel("review")}
            className={`${
              panel === "review"
                ? "text-green-700 bg-green-100 hover:bg-green-200"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            } px-6 py-3 text-xl md:text-2xl font-semibold rounded-lg shadow transition cursor-pointer`}
          >
            Review Questions
          </button>
          <button
            onClick={() => setPanel("explanation")}
            className={`${
              panel === "explanation"
                ? "text-green-700 bg-green-100 hover:bg-green-200"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            } px-6 py-3 text-xl md:text-2xl font-semibold rounded-lg shadow transition cursor-pointer`}
          >
            Answers with Explanation
          </button>
        </div>

        {panel === "review" && <Review result={result} />}
        {panel === "explanation" && <Explanation result={result} />}
        <NavigationButtons />
      </div>
      <Footer />
    </div>
  );
};

export default TestResultPage;
