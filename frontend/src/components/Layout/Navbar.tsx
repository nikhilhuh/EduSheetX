import React from "react";
import { useUser } from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface Menu {
  label: string;
  path: string;
}

const menuItems: Menu[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { UserDetails } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };

  return (
    <nav className="w-full sticky top-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white z-30 h-[8dvh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl laptop-sm:text-3xl font-extrabold tracking-wide"
        >
          EduSheetX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden tablet:flex items-center gap-4 laptop-sm:gap-6 text-lg font-semibold">
          {menuItems.map((item, idx) => {
            let active = isActive(item.path);
            return (
              <Link
                key={idx}
                to={item.path}
                className={`${
                  active
                    ? "text-yellow-300 underline underline-offset-2"
                    : "hover:text-yellow-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {UserDetails?.role === "teacher" && (
            <Link
              to="/addtest"
              className={`${
                isActive("/addtest")
                  ? "text-yellow-300 underline underline-offset-2"
                  : "hover:text-yellow-300"
              }`}
            >
              Add Test
            </Link>
          )}

          {UserDetails ? (
            <Link
              to="/profile"
              className={`${
                isActive("/profile")
                  ? "text-yellow-300 underline underline-offset-2"
                  : "hover:text-yellow-300"
              }`}
            >
              Profile
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-transparent border border-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <button onClick={toggleMobileMenu} className="tablet:hidden">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="tablet:hidden absolute top-full left-0 h-[92dvh] max-h-[92dvh] overflow-y-auto w-full py-4 px-6 bg-gradient-to-tr from-blue-500 to-blue-600">
          <div className="flex flex-col gap-5 text-xl font-semibold">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-yellow-300 underline underline-offset-2"
                    : "hover:text-yellow-300"
                }`}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {UserDetails?.role === "teacher" && (
              <Link
                to="/addtest"
                onClick={toggleMobileMenu}
                className={`${
                  isActive("/addtest")
                    ? "text-yellow-300 underline underline-offset-2"
                    : "hover:text-yellow-300"
                }`}
              >
                Add Test
              </Link>
            )}

            {UserDetails ? (
              <Link
                to="/profile"
                onClick={toggleMobileMenu}
                className={`${
                  isActive("/profile")
                    ? "text-yellow-300 underline underline-offset-2"
                    : "hover:text-yellow-300"
                }`}
              >
                Profile
              </Link>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition text-sm text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border border-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition text-sm text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
