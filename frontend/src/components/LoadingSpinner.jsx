import { IoChatbubblesOutline } from "react-icons/io5";

const LoadingSpinner = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: {
      container: "p-4",
      spinner: "h-8 w-8",
      icon: "w-3 h-3",
      text: "text-sm",
      dots: "w-1 h-1",
    },
    medium: {
      container: "p-8",
      spinner: "h-16 w-16",
      icon: "w-6 h-6",
      text: "text-base",
      dots: "w-2 h-2",
    },
    large: {
      container: "p-12",
      spinner: "h-24 w-24",
      icon: "w-8 h-8",
      text: "text-lg",
      dots: "w-3 h-3",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`text-center bg-white rounded-2xl shadow-lg animate-pulse-slow ${currentSize.container}`}
    >
      <div className="relative mb-6">
        <div
          className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-500 mx-auto ${currentSize.spinner}`}
        ></div>
        <IoChatbubblesOutline
          className={`absolute inset-0 m-auto text-blue-500 ${currentSize.icon}`}
        />
      </div>
      <p className={`text-gray-600 font-medium ${currentSize.text}`}>
        {message}
      </p>
      <div className="mt-4 flex justify-center space-x-1">
        <div
          className={`bg-blue-500 rounded-full animate-bounce ${currentSize.dots}`}
        ></div>
        <div
          className={`bg-blue-500 rounded-full animate-bounce ${currentSize.dots}`}
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className={`bg-blue-500 rounded-full animate-bounce ${currentSize.dots}`}
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
