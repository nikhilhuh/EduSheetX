import React from "react";
import Cliploader from "../Loaders/Cliploader";
import { Check } from "lucide-react";
import { verifyOTP } from "../../services/api/apiCalls/common/veirfyOTP";
import { generateOTP } from "../../services/api/apiCalls/common/generateOTP";

interface Step2Props {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const Step2: React.FC<Step2Props> = ({ email, setStep, setError }) => {
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [verifying, setVerifying] = React.useState<boolean>(false);
  const [resending, setResending] = React.useState<boolean>(false);
  const [resent, setResent] = React.useState<boolean>(false);
  const [resendText, setResendText] = React.useState<string>("Resend OTP");

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.charAt(0); // only take 1 digit
    setOtp(newOtp);

    // Auto-focus next
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]!.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current box
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        // Move to previous box
        inputRefs.current[index - 1]!.focus();
      }
    }
  };

  const handleOtpSubmit = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;
    setVerifying(true);
    try {
      const response = await verifyOTP(email, finalOtp);
      if (response.success) {
        setStep(3);
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

  const handleResendOTP = async () => {
    if (!email || resent) return;
    setResending(true);
    try {
      const response = await generateOTP(email);
      if (response.success) {
        setResent(true);
        setResendText("OTP Resent");
        setTimeout(() => {
          setResendText("Resend OTP");
          setResent(false);
        }, 1000 * 60);
      } else {
        setError(response.message || "Resend failed. Try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err: any) {
      setError("Resend failed. Try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setResending(false);
    }
  };
  return (
    <>
      <p className="block mb-2 text-sm text-center font-medium text-gray-700">
        Enter the 6-digit OTP sent to {email}
      </p>
      <p className="block mb-2 text-sm text-center font-medium text-gray-700">
        The otp is only valid for 5 minutes,
        <br />
        after that it will expire automatically for privacy concerns
      </p>
      <div className="flex justify-center gap-2 mt-4">
        {otp.map((digit, index) => (
          <input
            id={`digit-${index}`}
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleOtpKeyDown(e, index)}
            className="h-8 w-8 tablet:w-12 tablet:h-12 text-center text-lg tablet:text-xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-kipm-navy"
          />
        ))}
      </div>

      <div className="mt-4 flex justify-end items-center">
        <div
        onClick={handleResendOTP}
          title="Resend otp"
          className={` font-semibold w-max text-xs tablet:text-sm ${
            !resent ? "cursor-pointer underline-offset-2 hover:underline" : ""
          }`}
        >
          {resending ? (
            <Cliploader size={16} color="blue" />
          ) : resent ? (
            <span className="flex gap-1 items-center">
              <Check className="h-5 w-5" />
              {resendText}
            </span>
          ) : (
            resendText
          )}
        </div>
      </div>

      <button
        onClick={handleOtpSubmit}
        disabled={verifying || otp.join("").length < 6}
        className={`mt-2 bg-blue-500 text-white py-2 px-6 rounded-xl transition-colors duration-300 ${
          verifying || otp.join("").length < 6
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {verifying ? <Cliploader size={20} /> : "Submit OTP"}
      </button>
    </>
  );
};

export default Step2;
