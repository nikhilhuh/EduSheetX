import React from "react";
import sendMailImg from "../../assets/images/send-mail.svg";
import Cliploader from "../Loaders/Cliploader";
import { generateSignInOTP } from "../../services/api/apiCalls/common/generateSignInOTP";

interface Step1Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  verifying: boolean;
  setVerifying: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const Step1: React.FC<Step1Props> = ({
  email,
  setEmail,
  verifying,
  setVerifying,
  setStep,
  setError,
}) => {
  const handleVerification = async () => {
    if (!email) return;

    setVerifying(true);
    try {
      const response = await generateSignInOTP(email);
      if (response.success) {
        setStep(2);
      } else {
        setError(response.message || "Verification failed. Try again.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError("Verification failed. Try again.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <img src={sendMailImg} alt="Send Mail" className="h-[15svh]" />
      <p className="block mb-2 text-xs md:text-sm text-center font-medium text-gray-800">
        An OTP will be sent to the mail you provide below
      </p>
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your registered email"
          autoComplete="email"
          className="bg-gray-100 border border-gray-500 w-full rounded-xl py-2 px-10 invalid:border-pink-500 invalid:text-pink-600"
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2">📧</div>
      </div>
      <button
        onClick={handleVerification}
        disabled={verifying || !email}
        className={`bg-blue-500 text-white py-2 px-6 rounded-xl transition-colors duration-300 ${
          verifying || !email
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {verifying ? <Cliploader size={20} /> : "Verify Email"}
      </button>
    </>
  );
};

export default Step1;
