import React from "react";
import { Link } from "react-router-dom";
import MascotImg from "../../assets/images/mascot.png";
import InstructionsImg from "../../assets/images/instructions.png";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <header className="relative flex-1 min-h-[90vh] bg-blue-500 w-full flex flex-col laptop-sm:flex-row justify-center gap-10 px-6 py-12">
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
        <div className="z-20 max-w-2xl space-y-8 text-center md:text-left">
          {/* Headline */}
          <h1 className="text-4xl laptop-sm:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Online Tests for <br />
            <span className="text-yellow-300 glow">Class 10</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-100 text-lg md:text-xl leading-relaxed">
            Attempt MCQ tests by subject and topic. Get instant scores and track
            your progress easily — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Link to="/subjects">
              <button className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-400 transition-all text-sm sm:text-base">
                🚀 Start Practicing
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-6 py-3 bg-white border border-blue-500 text-blue-600 font-semibold rounded-xl shadow-md hover:bg-blue-100 transition-all text-sm sm:text-base">
                📈 Go to Dashboard
              </button>
            </Link>
          </div>

          {/* Why Us Section */}
          <section className="pt-10 border-t border-white/20 mt-8">
            <h2 className="text-2xl laptop-sm:text-3xl font-semibold text-white mb-4 text-left">
              Why <span className="text-yellow-300 glow">EduSheetX?</span>
            </h2>
            <ul className="space-y-4 text-lg laptop-sm:text-xl text-gray-100 text-left">
              <li className="flex items-start gap-3">
                <span className="text-xl">🎯</span> Topic-wise Class 10 MCQ
                Tests
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⚡</span> Instant Score Evaluation
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📊</span> Dashboard to track your
                progress
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📱</span> Fully responsive on mobile &
                tablet
              </li>
            </ul>
          </section>
        </div>
        {/* Right Image or mascot */}
        <div className="z-20 flex justify-center items-center">
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src={MascotImg}
              alt="Mascot"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
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
            fill="#f3f4f6"
            d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,160C672,171,768,213,864,213.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      {/* instructions */}
      <section className="px-6 text-gray-800">
        <div className="max-w-6xl mx-auto grid laptop-sm:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div>
            <h2 className="text-3xl laptop-sm:text-4xl font-semibold mb-4">
              Instructions
            </h2>
            <ul className="list-disc list-outside space-y-2 text-lg laptop-sm:text-xl max-w-4xl px-8">
              <li>
                Click on "Start Practicing" and then select a Subject and then
                Topic of your choice.
              </li>
              <li>
                Select the test you want to give & click on "Start Test" to
                start the test
              </li>
              <li>
                The number of questions in the test will be written on the
                details of Test only.
              </li>
              <li>
                The time limit of each test will be different , which will be
                given in the details of Test itself.
              </li>
              <li>The Timer will start as soon as you start the test.</li>
              <li>
                The timer will be running at the top of screen above the
                questions , if the time is over the test will be submitted
                automatically irrespective of questions complete.
              </li>
              <li>
                For every question there is only one correct option out of the
                four given options.
              </li>
              <li>
                Each question carries one mark. There is no negative marking for
                incorrect choice.
              </li>
              <li>
                For moving to the next question, click on "Next" at the bottom
                of the screen.
              </li>
              <li>Questions can be answered in any order.</li>
              <li>
                For moving to a previous question click on "Prev" at the bottom
                of the screen.
              </li>
              <li>
                Students can make changes in their choice of answers before
                clicking the "SUBMIT" button.
              </li>
              <li>
                After completing all the questions, click on "Submit" button.
              </li>
              <li>
                Your Score will be displayed on the screen along with a
                leaderboard of that test.
              </li>
            </ul>
          </div>
          {/* right illustrations */}
          <div className="hidden laptop-sm:flex">
            <img
              src={InstructionsImg}
              alt="Instructions Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
