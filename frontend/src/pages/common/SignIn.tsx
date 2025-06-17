import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/Status Modals/ErrorModal";
import SuccessModal from "../../components/Modals/Status Modals/SuccessModal";
import { useUser } from "../../context/UserContext";
import { signin } from "../../services/api/apiCalls/common/signin";
import { fetchuser } from "../../services/api/apiCalls/common/fetchUserDetails";
import { SignInUser } from "../../utils/constants";
import Cliploader from "../../components/Loaders/Cliploader";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import SigninImg from "../../assets/images/signin.svg";
import LeaderBoardImg from "../../assets/images/leaderboard.svg";

const SignIn: React.FC = () => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<SignInUser>({
    role: "student",
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
      const response = await signin(
        credentials.role,
        credentials.email,
        credentials.password
      );
      if (response.success) {
        const userDetails = await fetchuser(credentials.email);
        if (userDetails.success) {
          localStorage.setItem("user", JSON.stringify(userDetails.user));
          setUserDetails(userDetails.user);
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
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />

      {/* Main content wrapper should expand to fill space */}
      <div className="grid grid-cols-1 tablet:grid-cols-2">
        <img
          src={SigninImg}
          alt="Sign In Image"
          className="h-full w-full object-contain"
        />

        <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 bg-white">
          {/* leaderboard image */}
          <img
            src={LeaderBoardImg}
            alt="Leaderboard Image"
            className="h-[10vh] w-[10vh] mb-4"
          />
          {/* Heading */}
          <h1 className="text-center text-3xl laptop-sm:text-4xl font-semibold text-gray-800 mb-3 leading-snug">
            Welcome Back to{" "}
            <span className="text-blue-600 font-extrabold">EduSheetX</span>!
          </h1>
          <p className="text-center text-gray-600 text-base laptop-sm:text-lg mb-6">
            Sign in to unlock powerful tools, track your progress,
            <br />
            and climb your way to the leaderboard!
          </p>

          {/* Card Container */}
          <div className="bg-white shadow-2xl rounded-2xl px-8 py-6 w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-base laptop-sm:text-lg 4k:text-xl"
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
            <div className="text-center mt-5">
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

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};

export default SignIn;
