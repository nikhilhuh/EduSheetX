import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import NotFoundImg from "../../assets/images/404-mascot.png"; 

const Error404: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex flex-col-reverse laptop-sm:flex-row items-center justify-center min-h-[80vh] px-6 py-12 gap-10">
        {/* Text Section */}
        <div className="text-center laptop-sm:text-left max-w-xl">
          <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Oops! The page you’re looking for doesn’t exist or has been moved.
            <br />
            Please check the URL or return to the previous page.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl shadow hover:blue-600 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-sm">
          <img
            src={NotFoundImg}
            alt="404 Elephant Mascot"
            className="w-full h-auto object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Error404;
