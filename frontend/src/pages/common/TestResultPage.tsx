import React from "react";
import { useLocation } from "react-router-dom";
import { ResultType } from "../../utils/constants";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Result/Hero";
import NavigationButtons from "../../components/Result/NavigationButtons";
import MainContent from "../../components/Result/MainContent";
import NotFound from "../../components/Miscellaneous/NotFound";

const TestResultPage: React.FC = () => {
  const { state } = useLocation();
  const result: ResultType | undefined = state?.result;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!result) return <NotFound text="No result data found." />;
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero result={result} />
      {/* Main Content */}
      <div className="flex-1 mx-auto space-y-4 min-w-[90vw] max-w-[95vw] laptop-sm:min-w-[60vw] laptop-sm:max-w-[70vw] px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Review Questions
        </h1>
        <MainContent result={result} />
        <NavigationButtons />
      </div>
      <Footer />
    </div>
  );
};

export default TestResultPage;
