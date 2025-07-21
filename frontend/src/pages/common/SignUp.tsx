import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { signUp } from "../../services/api/apiCalls/common/signUp";
import { SignUpUser } from "../../utils/constants";
import Cliploader from "../../components/Loaders/Cliploader";
import Navbar from "../../components/Layout/Navbar";
import SignUpImg from "../../assets/images/signup.png";
import Step1 from "../../components/Signup/Step1";
import Step2 from "../../components/Signup/Step2";
import Step3 from "../../components/Signup/Step3";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [email, setEmail] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [credentials, setCredentials] = React.useState<SignUpUser>({
    firstName: "",
    lastName: "",
    role: "student",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFormValid =
    credentials.firstName.trim() !== "" &&
    credentials.email.trim() !== "" &&
    credentials.password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    confirmPassword === credentials.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading || confirmPassword !== credentials.password)
      return;
    setLoading(true);
    try {
      const response = await signUp(
        credentials.firstName,
        credentials.lastName,
        credentials.email,
        credentials.password
      );
      if (response.success) {
        setSuccess("Signup successful! You can now log in.");
        setError("");
        setTimeout(() => {
          setSuccess("");
          navigate("/signin");
        }, 2000);
      } else {
        setError("Signup failed. Try again.");
        setSuccess("");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError("Signup failed. Try again.");
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />

      <div className="grid grid-cols-1 laptop-sm:grid-cols-2 h-[92svh]">
        <img
          src={SignUpImg}
          alt="Student Welcome"
          className="hidden laptop-sm:block h-full w-full object-contain"
        />

        <div className="flex-1 flex flex-col h-full items-center px-4 py-6">
          {/* Heading and Subtext */}
          <div className="text-center mb-6">
            <h1 className="text-xl tablet:text-2xl laptop-sm:text-3xl font-bold text-gray-800">
              Create your account
            </h1>
            <p className="text-sm laptop-sm:text-base text-gray-600 mt-1">
              Access personalized dashboards, compete on the leaderboard, and many more <br />
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-center gap-4 lg:text-lg 4k:text-xl w-[90vw] tablet:w-[70vw] laptop-sm:w-[40vw] laptop-lg:w-[30vw]"
          >
            {step === 1 && (
              <Step1
                email={email}
                setEmail={setEmail}
                setStep={setStep}
                setError={setError}
              />
            )}
            {step === 2 && (
              <Step2 email={email} setStep={setStep} setError={setError} />
            )}
            {step === 3 && (
              <Step3
                email={email}
                credentials={credentials}
                setCredentials={setCredentials}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}
            {step == 3 && (
              <>
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`bg-blue-500 text-white py-2 px-6 rounded-xl transition-colors duration-300 ${
                      !isFormValid || loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600 cursor-pointer"
                    }`}
                  >
                    {loading ? <Cliploader size={20} /> : "Sign Up"}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Switch to Sign In */}
          <div className="flex items-center text-sm mt-auto">
            <p>Already have an account?</p>
            <Link to="/signin">
              <button className="ml-2 text-blue-600 hover:underline font-medium cursor-pointer">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
