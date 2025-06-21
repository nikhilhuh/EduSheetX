import React from "react";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/api/apiCalls/common/logout";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import Cliploader from "../Loaders/Cliploader";
import { getOrCreateUserId } from "../../utils/getOrCreateUserId";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
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
          localStorage.removeItem("userId");
          setUserDetails(null);
          getOrCreateUserId();
          navigate("/");
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
    <nav className="w-full sticky top-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 flex justify-around items-center z-30">
      {success && <SuccessModal success={success} />}
      {error && <ErrorModal error={error} />}
      <Link to="/" className="cursor-pointer">
        <div title="Go to Home" className="text-2xl font-bold tracking-wide">
          EduSheetX
        </div>
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
          {/* User Options Dropdown */}
          {idClicked && (
            <div className="absolute top-full mt-2 right-2 bg-white shadow drop-shadow-2xl rounded-2xl border border-gray-200 z-40 animate-fade-in-up text-sm sm:text-base overflow-hidden">
              {/* Profile Section */}
              <div className="flex items-center gap-4 px-5 py-4 border-b bg-gray-50">
                <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                  {UserDetails.firstName?.[0]}
                  {UserDetails.lastName?.[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {UserDetails.firstName} {UserDetails.lastName}
                  </div>
                  <div className="text-xs text-gray-500 break-words">
                    {UserDetails.email}
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <div className="border-t border-black p-2">
                <button
                  title="Go to your dashboard"
                  onClick={() => navigate("/dashboard")}
                  className="w-full text-left px-3 py-2 hover:bg-yellow-200 text-gray-800 transition-all duration-200 cursor-pointer rounded-md"
                >
                  🧭 Dashboard
                </button>
              </div>

              {/* add test for teachers */}
              {UserDetails.role === "teacher" && (
                <div className="px-2 pb-2">
                  <button
                    title="Add a Test"
                    onClick={() => navigate("/teacher/addtest")}
                    className="w-full text-left px-3 py-2 hover:bg-yellow-200 text-gray-800 transition-all duration-200 cursor-pointer rounded-md"
                  >
                    ➕ Add Test
                  </button>
                </div>
              )}

              {/* Logout */}
              <div className="px-2 pb-2">
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className={`w-full text-left text-red-600 hover:text-white hover:bg-red-500 font-medium py-2 px-3 rounded-md transition-all duration-300 ${
                    loading ? "bg-red-100" : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <Cliploader size={18} />
                    </div>
                  ) : (
                    "🚪 Logout"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
