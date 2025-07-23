import React from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import Navbar from "../../components/Layout/Navbar";
import SigninImg from "../../assets/images/signin.svg";
import UsernameForm from "../../components/Signin/UsernameForm";
import OTPLogin from "../../components/Signin/OTPLogin";

const SignIn: React.FC = () => {
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loginMethod, setLoginMethod] = React.useState<"password" | "otp">(
    "password"
  );
  const [step, setStep] = React.useState<number>(1);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />

      {/* Main content wrapper should expand to fill space */}
      <div className="grid grid-cols-1 laptop-sm:grid-cols-2 h-[92svh]">
        <img
          src={SigninImg}
          alt="Sign In Image"
          className="hidden laptop-sm:block h-full w-full object-contain"
        />

        <div className="flex-1 flex flex-col h-full items-center justify-center px-4 py-6">
          {/* Heading and subtext */}
          <div className="text-center mb-6">
            <h1 className="text-xl tablet:text-2xl laptop-sm:text-3xl font-bold text-gray-800 mb-3">
              Welcome Back
            </h1>
            <p className="text-sm laptop-sm:text-base text-gray-600">
              Sign in to unlock powerful tools, track your progress,
              <br />
              and climb your way to the leaderboard!
            </p>
          </div>

          {/* login options  */}
          <div className="flex-1 flex flex-col justify-center gap-4 lg:text-lg 4k:text-xl w-[90vw] tablet:w-[70vw] laptop-sm:w-[40vw] laptop-lg:w-[30vw]">
            <div className="h-[40svh]">
              {loginMethod === "password" ? (
                <UsernameForm setSuccess={setSuccess} setError={setError} />
              ) : (
                <OTPLogin
                  step={step}
                  setStep={setStep}
                  setError={setError}
                  setSuccess={setSuccess}
                />
              )}
            </div>

            {(loginMethod === "password" ||
              (loginMethod === "otp" && step === 1)) && (
              <>
                {/* or */}
                <div className="h-[1px] w-full bg-gray-600 mt-10 mb-10 relative flex justify-center items-center">
                  <div className="absolute bg-white text-black/70 px-4 font-serif">
                    or
                  </div>
                </div>
                {loginMethod === "password" ? (
                  <button
                    onClick={() => setLoginMethod("otp")}
                    className={`bg-blue-400 hover:cursor-pointer hover:bg-blue-500 font-medium text-white text-sm py-2 px-4 rounded-xl transition-all w-[90vw] tablet:w-[70vw] laptop-sm:w-[40vw] laptop-lg:w-[30vw]`}
                  >
                    Login with OTP
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginMethod("password")}
                    className={`bg-blue-400 hover:cursor-pointer hover:bg-blue-500 font-medium text-white text-sm  py-2 px-4 rounded-xl transition-all w-[90vw] tablet:w-[70vw] laptop-sm:w-[40vw] laptop-lg:w-[30vw]`}
                  >
                    Login with Password
                  </button>
                )}
              </>
            )}
          </div>

          {/* Sign up prompt */}
          <div className="text-center mt-auto">
            <p className="text-sm text-gray-700">
              Don't have an account?
              <Link to="/signup">
                <button className="ml-2 text-blue-600 hover:underline font-medium cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
