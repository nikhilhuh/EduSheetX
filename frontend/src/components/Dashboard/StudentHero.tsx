import React from "react";
import { User } from "../../utils/constants";
import Breadcrumbs from "../Layout/Breadcrumbs";

interface StudentHeroProps {
  totalTests: number;
  averageMarks: string;
  percentage: string;
  testStreak: number;
  UserDetails: User;
}

const StudentHero: React.FC<StudentHeroProps> = ({
  totalTests,
  averageMarks,
  percentage,
  testStreak,
  UserDetails
}) => {
  const cardStyle =
    "rounded-2xl p-5 shadow-lg bg-gradient-to-br text-white from-purple-500 to-indigo-600 flex flex-col justify-center gap-4 text-center";
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
        {/* Left Content */}
        <div className="z-20 max-w-2xl space-y-4 text-center">
          {/* Headline */}
          <h1 className="text-4xl laptop-sm:text-6xl font-extrabold text-white leading-tight text-center drop-shadow-md">
            <span>Welcome</span>
            <br />
            <span className="text-yellow-300 glow">
              {UserDetails.firstName} {UserDetails.lastName}
            </span>
          </h1>
          {/* Subtext */}
          <p className="text-gray-100 text-lg md:text-xl leading-relaxed text-center max-w-lg">
            Your personalised dashboard is ready to track your progress.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex justify-center items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1 backdrop-blur-md">
              <Breadcrumbs />
            </div>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid w-full laptop-sm:w-auto mobile-l:grid-cols-2 gap-4 mb-8 z-20">
          <div
          title="Total tests submitted by you"
            className={`${cardStyle} bg-gradient-to-br from-yellow-400 to-yellow-600`}
          >
            <p>Total Tests Taken</p>
            <p className="text-xl tablet:text-3xl font-bold">{totalTests}</p>
          </div>
          <div
          title="Your Average Marks in all the tests combined"
            className={`${cardStyle} bg-gradient-to-br from-sky-400 to-sky-600`}
          >
            <p>Average Marks</p>
            <p className="text-xl tablet:text-3xl font-bold">{averageMarks}</p>
          </div>
          <div
          title="Your percentage in all tests"
            className={`${cardStyle} bg-gradient-to-br from-green-400 to-green-600`}
          >
            <p>Percentage</p>
            <p className="text-xl tablet:text-3xl font-bold">{percentage}%</p>
          </div>
          <div
          title={`You current streak`}
            className={`${cardStyle} bg-gradient-to-br from-pink-400 to-pink-600`}
          >
            <p>Current Streak</p>
            <p className="text-xl tablet:text-3xl font-bold">
              {testStreak}
            </p>
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
            fill="#ffffff"
            d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,160C672,171,768,213,864,213.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </>
  );
};

export default StudentHero;
