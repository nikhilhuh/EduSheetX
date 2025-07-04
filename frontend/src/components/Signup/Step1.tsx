import React from "react";
import Cliploader from "../Loaders/Cliploader";
import { generateOTP } from "../../services/api/apiCalls/common/generateOTP";

interface Step1Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const Step1: React.FC<Step1Props> = ({
  email,
  setEmail,
  setStep,
  setError,
}) => {
  const [verifying, setVerifying] = React.useState<boolean>(false);

  const handleVerification = async () => {
    if (!email) return;
    setVerifying(true);
    try {
      const response = await generateOTP(email);
      if (response.success) {
        setStep(2);
      } else {
        setError(response.message || "Verification failed. Try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err: any) {
      setError("Verification failed. Try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setVerifying(false);
    }
  };
  return (
    <>
    <p className="block mb-2 text-sm text-center font-medium text-gray-700">
        An OTP will be sent to the mail you provide below
      </p>
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoComplete="email"
          className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-full invalid:border-pink-500 invalid:text-pink-600"
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
