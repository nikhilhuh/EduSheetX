import React from "react";
import LogoImg from "../../assets/images/favicon.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-gray-100 px-6 py-6 mt-10">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <img src={LogoImg} alt="Logo" className="h-[6vh] w-auto rounded-full" />
          <div className="text-3xl font-extrabold tracking-wide">EduSheetX</div>
        </div>
        <p className="text-sm sm:text-base text-gray-100 opacity-90">
          Helping students achieve their dream results through smart practice.
        </p>
        <div className="text-xs text-gray-200 mt-2">
          © {new Date().getFullYear()} EduSheetX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
