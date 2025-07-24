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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col-reverse md:flex-row items-center justify-center flex-grow px-6 py-12 gap-10">
        {/* Text Content */}
        <div
          className="text-center md:text-left max-w-lg"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <h1 className="text-7xl font-extrabold text-red-600 mb-3 tracking-tight">
            403
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Sorry, you don’t have permission to access this page. <br />
            Check your role or try logging in with a different account.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 transform hover:scale-105"
          >
            ← Go Back
          </button>
        </div>

        {/* Image */}
        <div
          className="w-full max-w-sm"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img
            src={UnauthorizedImg}
            alt="Unauthorized Access Mascot"
            className="w-full h-auto object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Unauthorized;
