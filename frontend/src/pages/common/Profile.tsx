import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { useUser } from "../../context/UserContext";
import PlaceholderComponent from "../../components/Layout/PlaceholderComponent";
import { logout } from "../../services/api/apiCalls/common/logout";
import { useNavigate } from "react-router-dom";
import Cliploader from "../../components/Loaders/Cliploader";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import { EditableUserField } from "../../utils/constants";
import { Pencil, X } from "lucide-react";
import { updateUser } from "../../services/api/apiCalls/common/updateUser";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { getOrCreateUserId } from "../../utils/getOrCreateUserId";

const Profile: React.FC = () => {
  const { UserDetails, setUserDetails } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editField, setEditField] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<
    Partial<Record<EditableUserField, string | number>>
  >({
    firstName: UserDetails?.firstName || "",
    lastName: UserDetails?.lastName || "",
    class: UserDetails?.class || "",
    phoneNumber: UserDetails?.phoneNumber || "",
    gaurdianName: UserDetails?.gaurdianName || "",
    gaurdianPhoneNumber: UserDetails?.gaurdianPhoneNumber || "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
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
        setSuccess("You are Logged out");
        localStorage.removeItem("userId");
        await getOrCreateUserId();
        setTimeout(() => {
          navigate("/");
          localStorage.removeItem("user");
          setUserDetails(null);
          setSuccess("");
        }, 2000);
      } else {
        setError("Logout failed, try again later.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("Logout failed, try again later.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setShowConfirmModal(false);
      setLoading(false);
    }
  };

  const handleSave = async (field: EditableUserField) => {
    const newValue = editedValues[field];

    // Prevent empty update
    if (!newValue || loading) return;

    try {
      setLoading(true);

      // Construct payload like { firstName: "John" }
      const updatePayload = { [field]: newValue };

      const response = await updateUser(UserDetails._id, updatePayload);

      if (response.success) {
        const updatedUser = response.user;

        setUserDetails(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Close the edit mode only on success
        setEditField(null);
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 2000);
      } else {
        setError("Update failed, try again later.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("Update failed, try again later.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedValues({ ...UserDetails });
    setEditField(null);
  };

  const renderField = (label: string, field: EditableUserField) => {
    const isEditable = field !== "email";

    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-3 border-b text-lg">
        {/* Label */}
        <span className="text-gray-700 font-medium md:w-1/3">{label}</span>

        {/* Value or Edit input */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start md:items-center justify-end gap-2">
          {editField === field && isEditable ? (
            <>
              <input
                type="text"
                id={editField}
                className="border px-3 py-1 rounded-md w-full md:w-auto"
                value={editedValues[field]?.toString() || ""}
                onChange={(e) =>
                  setEditedValues((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(field)}
                  className="text-white hover:bg-green-600 transition bg-green-500 p-2 rounded-md text-xs"
                  title="Save"
                >
                  {loading ? "Saving.." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white hover:bg-red-600 transition bg-red-500 p-2 rounded-md"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-800">
                {UserDetails[field] || "N/A"}
              </span>
              {isEditable && (
                <button
                  onClick={() => {
                    setEditField(field);
                    setEditedValues((prev) => ({
                      ...prev,
                      [field]: UserDetails[field] || "",
                    }));
                  }}
                  className="text-gray-500 hover:text-blue-600 transition"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      {showConfirmModal && <ConfirmationModal message="Are you sure you want to logout from your account?"
      onCancel={()=> setShowConfirmModal(false)}
      onConfirm={handleLogout} />}
      <Navbar />
      <div className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2">
              Your Details
            </h2>
          </div>

          <div className="space-y-4">
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
            {renderField("Email", "email")}
            {renderField("Class", "class")}
            {renderField("Phone Number", "phoneNumber")}
            {renderField("Guardian Name", "gaurdianName")}
            {renderField("Guardian Phone", "gaurdianPhoneNumber")}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              title="Logout from your account"
              onClick={()=> setShowConfirmModal(true)}
              disabled={loading}
              className={`${
                loading ? "opacity-70" : "hover:bg-red-500 hover:cursor-pointer"
              } bg-red-400 px-6 py-2 flex items-center text-white font-semibold text-sm shadow-md`}
            >
              {loading ? <Cliploader size={15} /> : "Logout"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
