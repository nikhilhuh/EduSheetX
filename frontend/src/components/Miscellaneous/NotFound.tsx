import React from "react";
import { useNavigate } from "react-router-dom";
import NoDataImg from "../../assets/images/nodata.svg";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const NotFound: React.FC<{ text: string }> = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1 px-4 py-10 flex flex-col justify-center items-center gap-6 text-center">
        <img
          src={NoDataImg}
          alt="No Data"
          className="h-[40vh] w-auto max-w-full"
        />
        <p className="text-gray-800 text-xl text-center">
          Oops..!
          <br />
          {text}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 cursor-pointer"
        >
          Go to Homepage
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
