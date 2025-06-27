import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  IoChatbubblesOutline,
  IoWarningOutline,
  IoArrowForwardOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { simpleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await simpleLogin(username.trim());
      navigate("/chat");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-md lg:max-w-lg w-full">
        <div className="bg-white p-6 lg:p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fade-in hover:shadow-3xl transition-all duration-300">
          <div className="text-center mb-8 lg:mb-10">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
              <IoChatbubblesOutline className="w-8 h-8 lg:w-10 lg:h-10 text-white group-hover:animate-pulse" />
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Enter your username to join the chat
            </p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-center animate-fade-in shadow-sm">
              <IoWarningOutline className="w-4 h-4 mr-2 animate-pulse" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div>
              <label
                className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base hover:border-blue-300 focus:scale-[1.02]"
                placeholder="Enter your username"
                required
                minLength="3"
                maxLength="20"
              />
              <p className="mt-2 text-xs lg:text-sm text-gray-500 leading-relaxed">
                Just enter a username - no password needed! If you're new, we'll
                create an account for you.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="w-full bg-blue-500 text-white py-3 px-4 lg:py-4 lg:px-6 rounded-xl hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base lg:text-lg font-semibold"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Joining Chat...
                </>
              ) : (
                <>
                  Join Chat
                  <IoArrowForwardOutline className="ml-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 lg:mt-8 text-center">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-500 font-medium transition-all duration-200 text-sm lg:text-base hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
          <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
            <div className="flex items-start">
              <IoInformationCircleOutline className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm lg:text-base font-medium text-green-900 mb-2">
                  How it works:
                </p>
                <ul className="text-xs lg:text-sm text-green-700 space-y-1.5 leading-relaxed">
                  <li>• Enter any username you like</li>
                  <li>• No password required - it's that simple!</li>
                  <li>• New users are automatically registered</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
