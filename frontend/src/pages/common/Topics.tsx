import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Subject } from "../../utils/constants";
import NoDataImg from "../../assets/images/nodata.svg";
import ErrorModal from "../../components/Modals/Status Modals/ErrorModal";
import Navbar from "../../components/Layout/Navbar";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import EduSheetXgif from "../../assets/images/edusheetx.gif";
import Footer from "../../components/Layout/Footer";

const Topics: React.FC = () => {
  const { state } = useLocation();
  const subject = state?.subject as Subject | undefined;
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (!subject) {
      setError("Unable to fetch Subject Topics, try again");
      setTimeout(() => {
        setError("");
        navigate(-1);
      }, 2000);
    }
  }, [subject]);

  const handleTopicClick = (topic: string) => {
    if (!subject) return;
    navigate(`${encodeURIComponent(topic)}`, {
      state: { topic }, // passing topic as location.state
    });
  };

  if (!subject)
    return (
      <div className="px-4 py-2 flex-1">
        <div className="flex flex-col w-full mt-4 justify-center items-center gap-4">
          <img src={NoDataImg} alt="No Data" className="h-[45vh] w-auto" />
          <p className="text-gray-800 text-xl text-center">
            Oops..!
            <br />
            Subject was not found.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      {/* Hero Section */}
      <header className="relative bg-blue-500 w-full flex flex-col-reverse tablet:flex-row items-center justify-around gap-14 px-6 py-20 overflow-hidden">
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
        <div className="z-20 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl laptop-sm:text-6xl font-extrabold text-white leading-tight">
            Choose Your <span className="text-yellow-300">Topic</span>
          </h1>
          <p className="text-white/90 text-lg">
            Unlock your potential with every quiz.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1 backdrop-blur-md">
            <Breadcrumbs />
          </div>
        </div>
        {/* Right Mascot/Image */}
        <div className="relative z-20 w-full max-w-sm">
          {/* Yellow Glow Blob */}
          <img
            src={EduSheetXgif}
            alt="Why EduSheet"
            className="w-full h-[50vh] object-cover drop-shadow-2xl rounded-xl border-4 border-white relative z-20"
          />
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

      <div className="px-4 py-2 flex-1">
        {subject.topics.length === 0 ? (
          <div className="flex flex-col w-full mt-4 justify-center items-center gap-4">
            <img src={NoDataImg} alt="No Data" className="h-[45vh] w-auto" />
            <p className="text-gray-800 text-xl text-center">
              Oops..!
              <br />
              No topics found at the moment..
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10 capitalize">
              Topics in {subject.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subject.topics.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => handleTopicClick(topic)}
                  className="fade-in-up group bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:scale-[1.03]"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                    📘
                  </div>
                  <div className="font-semibold text-blue-800 text-lg capitalize">
                    {topic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Topics;
