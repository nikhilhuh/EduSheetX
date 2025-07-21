import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { useUser } from "../../context/UserContext";
import PlaceholderComponent from "../../components/Layout/PlaceholderComponent";
import { logout } from "../../services/api/apiCalls/common/logout";
import { useNavigate } from "react-router-dom";
import Cliploader from "../../components/Loaders/Cliploader";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";

const Profile: React.FC = () => {
  const { UserDetails, setUserDetails } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!UserDetails)
    return (
      <PlaceholderComponent
        title="You are not signed in"
        message="Please sign in to see your profile."
      />
    );

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout(UserDetails._id);
      if (response.success) {
        setSuccess("Logged out");
        setTimeout(() => {
          setSuccess("");
          navigate("/");
          localStorage.removeItem("user");
          setUserDetails(null);
        }, 2000);
      } else {
        setError(
          response.message || "Cannot log you out, please try again later"
        );
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Cannot log you out, please try again later");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />
      <div className="min-h-screen bg-white py-10 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            👤 User Profile
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">First Name:</span>
              <span>{UserDetails.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Last Name:</span>
              <span>{UserDetails.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span>{UserDetails.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Role:</span>
              <span className="capitalize">{UserDetails.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Status:</span>
              <span
                className={
                  UserDetails.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {UserDetails.status}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            More profile details and edit options will be added soon.
          </div>

          <button
          onClick={handleLogout}
            disabled={loading}
            className={`${loading? "opacity-70" : "hover:cursor-pointer hoveR:bg-red-500"} bg-red-400 px-6 py-2 flex justify-center items-center text-white font-semibold text-sm`}
          >
            {loading ? <Cliploader size={15} /> : "Logout"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
