import React from "react";
import Cliploader from "../Loaders/Cliploader";
import { Check, Edit } from "lucide-react";
import { verifyOTP } from "../../services/api/apiCalls/common/verifyOTP";
import { generateSignUpOTP } from "../../services/api/apiCalls/common/generateSignUpOTP";
import mailSentImg from "../../assets/images/mail.svg";

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

  const handleResendOTP = async () => {
    if (!email || resent) return;
    setResending(true);
    try {
      const response = await generateSignUpOTP(email);
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
        }, 2000);
      }
    } catch (err: any) {
      setError("Resend failed. Try again.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setResending(false);
    }
  };
  
  return (
    <div className="w-full flex flex-col gap-4">
      <img src={mailSentImg} alt="Send Mail" className="h-[15svh]" />
      <p className="text-xs lg:text-sm text-center font-medium text-gray-800 w-full justify-center flex flex-wrap gap-1">
        Enter the 6-digit OTP sent to
        <span className="flex w-full justify-center items-center gap-1 underline underline-offset-1">
          {email}
          <Edit className="h-3 w-3 md:h-4 md:w-4 cursor-pointer" onClick={() => setStep(1)} />
        </span>
      </p>
      <p className="block text-xs lg:text-sm text-center font-medium text-gray-800">
        The otp is only valid for 5 minutes,
        <br />
        after that it will expire automatically for privacy concerns
      </p>
      <div className="flex justify-center gap-2">
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
            className="h-8 w-8 md:h-10 md:w-10 lg:w-12 lg:h-12 text-center text-xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:ring-2 text-black"
          />
        ))}
      </div>

      <div className="flex gap-1 justify-center items-center">
        <span className="text-xs lg:text-sm font-normal text-gray-800">Didn't receive the otp?</span>
        <button
          type="button"
          onClick={handleResendOTP}
          title="Resend otp"
          className={`outline-none font-semibold w-max text-xs lg:text-sm text-black/90 ${
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
        </button>
      </div>

      <button
        type="button"
        onClick={handleOtpSubmit}
        disabled={verifying || otp.join("").length < 6}
        className={`bg-blue-500 text-white py-2 px-4 rounded-xl transition-colors duration-300 ${
          verifying || otp.join("").length < 6
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {verifying ? <Cliploader size={20} /> : "Submit OTP"}
      </button>
    </div>
  );
};

export default Step2;
