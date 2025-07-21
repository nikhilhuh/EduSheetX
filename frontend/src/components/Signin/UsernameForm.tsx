import React from "react";
import { SignInUser } from "../../utils/constants";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cliploader from "../Loaders/Cliploader";
import { signin } from "../../services/api/apiCalls/common/signin";
import { fetchuser } from "../../services/api/apiCalls/common/fetchUserDetails";
import { getOrCreateUserId } from "../../utils/getOrCreateUserId";

interface UsernameFormProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
  setError,
  setSuccess,
}) => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<SignInUser>({
    email: "",
    password: "",
  });

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
      const guestId = getOrCreateUserId();
      const response = await signin({ email: credentials.email, password: credentials.password, guestId: guestId });
      if (response.success) {
        const userDetailsResponse = await fetchuser(credentials.email);
        if (userDetailsResponse.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(userDetailsResponse.user)
          );
          setUserDetails(userDetailsResponse.user);
          setSuccess("Signin successful!");
          setTimeout(() => {
            setSuccess("");
            navigate(`/`);
          }, 2000);
        }
      } else {
        setError(response.message || "Signin failed. Try again.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError("Signin failed. Try again.");
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full justify-center gap-4 text-base lg:text-lg 4k:text-xl w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[30vw]"
    >
      {/* Username Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium text-black/80">
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
            autoComplete="username"
            className="bg-gray-100 border border-gray-400 rounded-xl py-2 px-10 w-full"
          />
          <div className="absolute top-1/2 left-3 -translate-y-1/2">📧</div>
        </div>
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium text-black/80">
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
            : "hover:bg-blue-600 cursor-pointer font-medium"
        }`}
      >
        {loading ? <Cliploader size={20} /> : "Sign in"}
      </button>
    </form>
  );
};

export default UsernameForm;
