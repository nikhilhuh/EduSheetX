import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { addStudent } from "../../services/api/apiCalls/student/addStudent";
import { SignUpUser } from "../../utils/constants";
import Cliploader from "../../components/Loaders/Cliploader";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import LeaderBoardImg from "../../assets/images/leaderboard.svg";
import SignUpImg from "../../assets/images/signup.png";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<SignUpUser>({
    firstName: "",
    lastName: "",
    role: "student",
    studentClass: "10",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      const response = await addStudent(
        credentials.firstName,
        credentials.lastName,
        credentials.studentClass,
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />

      <div className="grid grid-cols-1 tablet:grid-cols-2">
        <img
          src={SignUpImg}
          alt="Student Welcome"
          className="h-full w-full object-contain"
        />
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
          {/* Header Image */}
          <img
            src={LeaderBoardImg}
            alt="Leaderboard"
            className="h-[10vh] w-[10vh] mb-4"
          />

          {/* Heading and Subtext */}
          <div className="text-center mb-6">
            <h1 className="text-xl laptop-sm:text-2xl font-semibold text-gray-800">
              Create your{" "}
              <span className="text-blue-600 font-bold">EduSheetX</span> account
            </h1>
            <p className="text-sm laptop-sm:text-base text-gray-600 mt-1">
              Access personalized dashboards, compete on the leaderboard, <br />
              and unlock a better learning experience tailored just for you.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-base laptop-sm:text-lg 4k:text-xl"
          >
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={credentials.firstName}
                onChange={handleCredentialsChange}
                placeholder="Your first name"
                autoComplete="given-name"
                className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-[75vw] laptop-sm:w-[25vw] invalid:border-pink-500 invalid:text-pink-600"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">👤</div>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={credentials.lastName}
                onChange={handleCredentialsChange}
                placeholder="Your last name"
                autoComplete="family-name"
                className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-[75vw] laptop-sm:w-[25vw] invalid:border-pink-500 invalid:text-pink-600"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">👤</div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleCredentialsChange}
                placeholder="Your email"
                autoComplete="email"
                className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-[75vw] laptop-sm:w-[25vw] invalid:border-pink-500 invalid:text-pink-600"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">📧</div>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleCredentialsChange}
                placeholder="Set your password"
                className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-[75vw] laptop-sm:w-[25vw] invalid:border-pink-500 invalid:text-pink-600"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">🔒</div>
              <div
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-[75vw] laptop-sm:w-[25vw] invalid:border-pink-500 invalid:text-pink-600"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">🔒</div>
              <div
                title={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`bg-blue-500 text-white py-2 px-6 rounded-xl transition-colors duration-300 ${
                  !isFormValid || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {loading ? <Cliploader size={20} /> : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Switch to Sign In */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm">Already registered?</p>
            <Link to="/signin">
              <button className="px-4 py-2 text-sm rounded-full bg-blue text-white font-semibold hover:bg-blue-900 transition-colors duration-200 cursor-pointer">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
