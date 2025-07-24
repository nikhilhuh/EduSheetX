import React from "react";
import { ResultType } from "../../utils/constants";
import { useParams } from "react-router-dom";

const Hero: React.FC<{ result: ResultType }> = ({ result }) => {
  const { testName } = useParams<{ testName: string }>();
  const getRemark = (marks: number, total: number): string => {
    const percentage = (marks / total) * 100;

    if (percentage === 100) return "Perfect Score! 🎯 You nailed it!";
    if (percentage >= 80) return "Excellent! 🌟 Keep up the great work!";
    if (percentage >= 60)
      return "Good job! 💪 A little more effort and you're there!";
    if (percentage >= 40) return "Not bad! Keep practicing! 📘";
    return "Needs improvement. Don't give up! 🚀";
  };
  return (
    <>
      {/* Hero Section */}
      <header className="relative bg-blue-500 w-full flex flex-col laptop-sm:flex-row items-center justify-around gap-14 px-6 py-10 pb-20 overflow-hidden">
        {/* Background Gradient (under everything) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 z-0" />
        {/* Decorative Floating Shapes (above gradient, behind content) */}
        {/* Floating Decorative Shapes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Large Circle */}
          <svg
            className="absolute top-10 left-10 w-20 h-20 text-white opacity-10 animate-float-slow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>

          {/* Small Circle */}
          <svg
            className="absolute top-32 right-20 w-12 h-12 text-white opacity-10 animate-float-fast"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>

          {/* Star Bottom Left */}
          <svg
            className="absolute bottom-20 left-32 w-16 h-16 text-white opacity-10 rotate-45 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>

          {/* Extra Circle Top Right */}
          <svg
            className="absolute top-6 right-10 w-10 h-10 text-white opacity-10 animate-float-slow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="5" />
          </svg>

          {/* Star Top Center */}
          <svg
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-14 h-14 text-white opacity-10 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>

          {/* Extra Star Bottom Right */}
          <svg
            className="absolute bottom-16 right-24 w-12 h-12 text-white opacity-10 rotate-12 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>

          {/* Small Floating Circle Middle */}
          <svg
            className="absolute bottom-1/2 left-1/3 w-8 h-8 text-white opacity-10 animate-float-slow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        {/* Left Text Content */}
        <div
          data-aos="fade-right"
          data-aos-duration="900"
          className="z-20 max-w-xl space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl tablet:text-5xl laptop-lg:text-6xl font-extrabold text-white leading-tight text-center">
            {testName}
            <br />
            <span className="text-yellow-300">RESULT</span>
          </h1>
          <p className="text-white text-2xl font-semibold text-center">
            Your score is {result.marks} / {result.totalQuestions * 1}
          </p>

          <p className="text-white text-xl font-medium text-center italic">
            {getRemark(result.marks, result.totalQuestions)}
          </p>
        </div>
        {/* Summary */}
        <div
          data-aos="zoom-in-up"
          data-aos-delay="300"
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 z-20"
        >
          {/* Total Questions */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-blue-700 mb-1">Questions</p>
            <p className="text-3xl font-bold text-blue-900">
              {result.totalQuestions}
            </p>
          </div>

          {/* Attempted */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-yellow-800 mb-1">Attempted</p>
            <p className="text-3xl font-bold text-yellow-900">
              {result.attemptedQuestions}
            </p>
          </div>

          {/* Correct */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-green-800 mb-1">Correct</p>
            <p className="text-3xl font-bold text-green-900">
              {result.correctAnswers}
            </p>
          </div>

          {/* Wrong */}
          <div className="bg-gradient-to-br from-red-100 to-red-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-red-800 mb-1">Wrong</p>
            <p className="text-3xl font-bold text-red-900">
              {result.wrongAnswers}
            </p>
          </div>

          {/* Unattempted */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-gray-700 mb-1">Unattempted</p>
            <p className="text-3xl font-bold text-gray-900">
              {result.unattempted}
            </p>
          </div>

          {/* Marks */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 mobile-l:p-4 laptop-sm:p-6 rounded-xl text-center shadow-md">
            <p className="font-semibold text-purple-800 mb-1">Marks</p>
            <p className="text-3xl font-bold text-purple-900">{result.marks}</p>
          </div>
        </div>
      </header>
      {/* Bottom Wave */}
      <div className="w-full overflow-hidden leading-none -mt-20 z-10">
        <svg
          className="w-full h-[100px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,181.3C672,203,768,245,864,245.3C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </>
  );
};

export default Hero;
