import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

interface OTPLoginProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}
const OTPLogin: React.FC<OTPLoginProps> = ({ step, setStep, setError, setSuccess }) => {
  const [email, setEmail] = React.useState<string>("");
  const [verifying, setVerifying] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center gap-4 text-base lg:text-lg 4k:text-xl w-[90vw] tablet:w-[70vw] laptop-sm:w-[50vw] laptop-lg:w-[30vw]">
      {step === 1 && (
        <Step1
          email={email}
          setEmail={setEmail}
          verifying={verifying}
          setVerifying={setVerifying}
          setStep={setStep}
          setError={setError}
        />
      )}
      {step === 2 && (
        <Step2
          email={email}
          verifying={verifying}
          setVerifying={setVerifying}
          setError={setError}
          setStep={setStep}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
};

export default OTPLogin;
