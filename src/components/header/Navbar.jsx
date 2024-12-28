import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthCtx } from "../sessions/authWrapper";
import { signOut } from "firebase/auth";
import { auth } from "../../config/config";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthCtx();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log(auth)
      await signOut(auth);
      console.log("User signed out");
      alert("User Signed out.")
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };
  return (
    <nav className="w-full bg-primary flex items-center justify-between py-2 px-8 relative">
      {/* Logo Section */}
      <div className="max-w-48">

      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-4 md:static absolute top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent z-50 py-4 md:py-0 px-8 md:px-0`}
      >

        <Link
          to={"/notes"}
          className="font-bold text-white"
        >
          Create  Notes
        </Link>
        <Link to={"/all/notes"} className="font-bold text-white">
          All Notes
        </Link>
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="block text-lg p-2 bg-white rounded font-bold text-primary hover:text-secondary"
            >
              Logout
            </button></>
        )

          :
          (
            <>
              <Link
                to={"/register"}
                className="bg-white text-primary px-4 py-2 rounded-3xl font-bold w-fit "
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="bg-white text-primary px-4 py-2 rounded-3xl font-bold w-fit"
              >
                Login
              </Link>
            </>
          )

        }






      </div>
    </nav>
  );
};

export default Navbar;
