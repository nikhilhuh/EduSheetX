import React from "react";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import testSvg from "../../assets/images/add-test.svg";

const Hero: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="relative bg-blue-500 w-full flex flex-col tablet:flex-row items-center justify-around gap-14 px-6 py-10 pb-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 z-0" />

        {/* Floating Decorative Shapes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg className="absolute top-10 left-10 w-20 h-20 text-white opacity-10 animate-float-slow" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <svg className="absolute top-32 right-20 w-12 h-12 text-white opacity-10 animate-float-fast" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6" />
          </svg>
          <svg className="absolute bottom-20 left-32 w-16 h-16 text-white opacity-10 rotate-45 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>
          <svg className="absolute top-6 right-10 w-10 h-10 text-white opacity-10 animate-float-slow" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
          </svg>
          <svg className="absolute top-8 left-1/2 transform -translate-x-1/2 w-14 h-14 text-white opacity-10 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>
          <svg className="absolute bottom-16 right-24 w-12 h-12 text-white opacity-10 rotate-12 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
          </svg>
          <svg className="absolute bottom-1/2 left-1/3 w-8 h-8 text-white opacity-10 animate-float-slow" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>

        {/* Left Text Content */}
        <div className="z-20 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl tablet:text-5xl laptop-sm:text-6xl font-extrabold text-white leading-tight">
            Create New <span className="text-yellow-300">Test</span>
          </h1>
          <p className="text-white/90 text-lg">Design quizzes easily and engage students better!</p>
          <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1 backdrop-blur-md">
            <Breadcrumbs />
          </div>
        </div>

        {/* Right SVG + Tips */}
        <div className="z-20 flex flex-col items-center gap-6">
          {/* SVG Illustration */}
          <img
            src={testSvg}
            alt="Create test illustration"
            className="h-[25vh] w-auto drop-shadow-md"
          />

          {/* Tips Card */}
          <div className="bg-white/30 backdrop-blur-md text-white px-4 py-3 rounded-xl text-md w-[260px] shadow-lg">
            <p className="font-semibold mb-2">💡Quick Tips:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Use varied difficulty levels</li>
              <li>Try uploading few questions images instead of all text </li>
            </ul>
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
