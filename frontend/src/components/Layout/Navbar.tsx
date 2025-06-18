import React from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { logout } from "../../services/api/apiCalls/common/logout";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import Cliploader from "../Loaders/Cliploader";

const Navbar: React.FC = () => {
  const { UserDetails, setUserDetails } = useUser();
  const [idClicked, setIdClicked] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  // handling user options closing if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIdClicked(false);
      }
    };

    if (idClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [idClicked]);

  // handling logout
  const handleLogout = async () => {
    if (loading || !UserDetails) return;
    setLoading(true);
    try {
      const response = await logout(UserDetails.email);
      if (response.success) {
        setSuccess("Logged out");
        setTimeout(() => {
          setSuccess("");
          localStorage.removeItem("user");
          setUserDetails(null);
        }, 2000);
      } else {
        setError("Logout failed. Try again.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err: any) {
      setError("Logout failed. Try again.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full sticky top-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 flex justify-around items-center z-40">
      {success && <SuccessModal success={success} />}
      {error && <ErrorModal error={error} />}
      <Link to="/" className="cursor-pointer">
        <div title="Go to Home" className="text-2xl font-bold tracking-wide">EduSheetX</div>
      </Link>
      {!UserDetails ? (
        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden md:block bg-transparent border border-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition text-white"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIdClicked((prev) => !prev)}
            title={`Logged in as ${UserDetails.firstName}`}
            className="w-[5vh] h-[5vh] rounded-full bg-white text-black font-bold flex items-center justify-center cursor-pointer"
          >
            {UserDetails.firstName[0]}
          </div>
          {/* user options dropdown */}
          {idClicked && (
            <div className="absolute top-full mt-1 right-2 bg-gray-100 border rounded text-black text-lg">
              <div title="Your name" className="border-b px-4 py-2">
                {UserDetails.firstName} {UserDetails.lastName}
              </div>
              {/* email */}
              <div
                title="Your registered email"
                className="px-4 py-2 border-b "
              >
                {UserDetails.email}
              </div>
              <div
                onClick={handleLogout}
                title="Logout"
                className={`text-red-500 hover:cursor-pointer px-4 py-2 hover:bg-red-500 hover:text-white hover:font-semibold transition-all ${
                  loading && "bg-red-500"
                }`}
              >
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <Cliploader size={20} />{" "}
                  </div>
                ) : (
                  "Logout"
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
