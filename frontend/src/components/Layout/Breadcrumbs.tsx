import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react"; // You can use any icon library here

const formatSegment = (segment: string) =>
  segment
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm tablet:text-lg text-gray-100 my-6 px-4">
      <ol className="flex flex-wrap items-center space-x-1 laptop-sm:space-x-2">
        {/* Home */}
        <li className="flex items-center gap-1">
          <Link
            to="/"
            title="Go back to Home"
            className="cursor-pointer hover:underline flex items-center gap-1"
          >
            <Home className="w-4 h-4 tablet:w-6 tablet:h-6" />
            <span className="hidden tablet:inline text-gray-100">Home</span>
          </Link>
        </li>

        {/* Breadcrumbs */}
        {paths.map((segment, index) => {
          const routeTo = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {/* Chevron separator */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {isLast ? (
                <span className="font-semibold text-yellow-300">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:underline cursor-pointer"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
