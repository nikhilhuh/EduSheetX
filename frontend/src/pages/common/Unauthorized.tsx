import React from "react";
import { useNavigate } from "react-router-dom";
import UnauthorizedImg from "../../assets/images/unauthorised-mascot.png";
import Navbar from "../../components/Layout/Navbar";

const Unauthorized: React.FC = () => {
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
      <main className="flex flex-col-reverse laptop-sm:flex-row items-center justify-center min-h-[80vh] px-6 py-10  gap-10">
        {/* Text Section */}
        <div className="text-center laptop-sm:text-left max-w-xl">
          <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            You do not have permission to view this page. <br />
            Please check your role or try logging in with a different account.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl shadow hover:bg-blue-600 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-sm">
          <img
            src={UnauthorizedImg}
            alt="Unauthorized Elephant Mascot"
            className="w-full h-auto object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Unauthorized;
