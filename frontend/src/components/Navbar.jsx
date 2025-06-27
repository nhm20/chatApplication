import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  IoChatbubblesOutline,
  IoPersonOutline,
  IoExitOutline,
} from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-indigo-600 shadow-xl border-b border-indigo-500/20 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 text-xl lg:text-2xl font-bold text-white hover:text-blue-100 hover:scale-105 transition-all duration-200 group"
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 shadow-lg">
            <IoChatbubblesOutline className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <span className="hidden sm:block text-white">ChatApp</span>
        </Link>
        <div className="flex flex-wrap justify-end items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4 lg:space-x-6">
          {user ? (
            <>
              <div className="flex items-center space-x-3 bg-white/10 rounded-2xl px-4 py-2 hover:bg-white/20 transition-all duration-200 border border-white/20">
                <div className="relative">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.username
                      )}&background=4f46e5&color=ffffff`
                    }
                    alt={`${user.username}'s profile`}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-white font-semibold text-sm lg:text-base block">
                    {user.username}
                  </span>
                  <span className="text-blue-200 text-xs">Online</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                {location.pathname !== "/chat" && (
                  <Link
                    to="/chat"
                    className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-sm lg:text-base border border-white/20"
                  >
                    <IoChatbubblesOutline className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Open Chat</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-white/80 hover:text-white px-3 py-2 lg:px-4 lg:py-3 rounded-xl hover:bg-red-500/30 active:bg-red-500/40 transition-all duration-200 group border border-white/10 hover:border-red-400/40"
                >
                  <IoExitOutline className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline text-sm lg:text-base font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className={`w-full sm:w-auto text-center bg-white text-indigo-600 px-6 py-3 lg:px-8 lg:py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm lg:text-base font-semibold border border-white/20 ${
                location.pathname === "/login" ? "bg-blue-50 scale-95" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <IoPersonOutline className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Join Chat</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
