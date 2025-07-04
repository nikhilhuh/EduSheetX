import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { useUser } from "../../context/UserContext";
import { signin } from "../../services/api/apiCalls/common/signin";
import { fetchuser } from "../../services/api/apiCalls/common/fetchUserDetails";
import { SignInUser } from "../../utils/constants";
import Cliploader from "../../components/Loaders/Cliploader";
import Navbar from "../../components/Layout/Navbar";
import SigninImg from "../../assets/images/signin.svg";
import LeaderBoardImg from "../../assets/images/leaderboard.svg";
import { getOrCreateUserId } from "../../utils/getOrCreateUserId";

const SignIn: React.FC = () => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<SignInUser>({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    credentials.email.trim() !== "" && credentials.password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    setLoading(true);
    try {
      const guestId: string | undefined = getOrCreateUserId();
      const response = await signin(
        credentials.email,
        credentials.password,
        guestId
      );
      if (response.success) {
        const userDetailsResponse = await fetchuser(credentials.email);
        if (userDetailsResponse.success) {
          localStorage.setItem("userId", userDetailsResponse.user._id);
          localStorage.setItem("user", JSON.stringify(userDetailsResponse.user));
          setUserDetails(userDetailsResponse.user);
          setSuccess("Signin successful!");
          setError("");
          setTimeout(() => {
            setSuccess("");
            navigate(`/`);
          }, 2000);
        }
      } else {
        setError(response.message || "Signin failed. Try again.");
        setSuccess("");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Signin failed. Try again.");
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

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

        <div className="flex-1 flex flex-col h-full items-center px-4 py-6">
          {/* leaderboard image */}
          <img
            src={LeaderBoardImg}
            alt="Leaderboard Image"
            className="h-[10vh] w-[10vh] mb-4"
          />
          {/* Heading and subtext */}
          <div className="text-center mb-6">
            <h1 className="text-xl tablet:text-2xl laptop-sm:text-3xl font-semibold text-gray-800 mb-3">
              Welcome Back to{" "}
              <span className="text-blue-600 text-2xl tablet:text-3xl laptop-sm:text-4xl font-extrabold">EduSheetX</span>!
            </h1>
            <p className="text-sm laptop-sm:text-base text-gray-600">
              Sign in to unlock powerful tools, track your progress,
              <br />
              and climb your way to the leaderboard!
            </p>
            
          </div>
          {/* sign in form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-base laptop-sm:text-lg 4k:text-xl w-full max-w-md h-full"
            >
              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleCredentialsChange}
                    placeholder="your registered email"
                    autoComplete="email"
                    className="bg-gray-100 border border-gray-400 rounded-xl py-2 px-10 w-full"
                  />
                  <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600">
                    {/* Email Icon */}
                    📧
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleCredentialsChange}
                    placeholder="your password"
                    className="bg-gray-100 border border-gray-400 rounded-xl px-10 py-2 w-full"
                  />
                  <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600">
                    🔒
                  </div>
                  <div
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`bg-blue-500 text-white py-2 px-4 rounded-xl transition-all duration-200 ${
                  !isFormValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {loading ? <Cliploader size={20} /> : "Sign in"}
              </button>
            </form>

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
