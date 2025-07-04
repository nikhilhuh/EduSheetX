import React from "react";
import { SignUpUser } from "../../utils/constants";

interface Step3Props {
  email: string;
  credentials: SignUpUser;
  setCredentials: React.Dispatch<React.SetStateAction<SignUpUser>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const Step3: React.FC<Step3Props> = ({
  email,
  credentials,
  setCredentials,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

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

  return (
    <>
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
          className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-full invalid:border-pink-500 invalid:text-pink-600"
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
          className="bg-gray-100 border border-gray-500 rounded-xl py-2 px-10 w-full invalid:border-pink-500 invalid:text-pink-600"
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2">👤</div>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          readOnly
          autoComplete="email"
          className="w-full bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-400 rounded-xl py-2 px-10 focus:outline-none focus:ring-0"
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
          📧
        </div>
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
          className="bg-gray-100 border border-gray-500 w-full rounded-xl py-2 px-10 invalid:border-pink-500 invalid:text-pink-600"
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
          className="bg-gray-100 border border-gray-500 w-full rounded-xl py-2 px-10 invalid:border-pink-500 invalid:text-pink-600"
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
    </>
  );
};

export default Step3;
