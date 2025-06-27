import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  IoFlashOutline,
  IoChatbubblesOutline,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoHeartOutline,
} from "react-icons/io5";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16 bg-white">
      <div className="text-center max-w-6xl mx-auto animate-fade-in">
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 text-gray-800 tracking-tight">
            Real-Time Chat
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {user
              ? `Welcome back, ${user.username}! Ready to connect with friends?`
              : "Connect instantly with anyone, anywhere. Just enter a username and start chatting - it's that simple!"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
              <IoFlashOutline className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
              Real-Time
            </h3>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              Instant messaging with live typing indicators
            </p>
          </div>
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-2 focus-within:ring-green-300 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300">
              <IoChatbubblesOutline className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
              No Password
            </h3>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              Just enter a username and start chatting instantly
            </p>
          </div>
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-2 focus-within:ring-orange-300 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300">
              <IoShieldCheckmarkOutline className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
              Modern
            </h3>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              Beautiful, responsive design for all devices
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
          {!user && (
            <Link
              to="/login"
              className="bg-blue-500 text-white py-3 sm:py-4 px-6 sm:px-8 lg:py-5 lg:px-12 rounded-full hover:bg-blue-600 active:bg-blue-700 shadow-xl hover:shadow-2xl text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-sm transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <IoRocketOutline className="w-5 h-5 lg:w-6 lg:h-6 group-hover:animate-bounce" />
              Start Chatting
            </Link>
          )}
          {user && (
            <Link
              to="/chat"
              className="bg-green-500 text-white py-3 sm:py-4 px-6 sm:px-8 lg:py-5 lg:px-12 rounded-full hover:bg-green-600 active:bg-green-700 shadow-xl hover:shadow-2xl text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-sm transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <IoHeartOutline className="w-5 h-5 lg:w-6 lg:h-6 group-hover:animate-pulse" />
              Continue Chatting
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
