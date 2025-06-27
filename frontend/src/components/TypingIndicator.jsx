const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500 mr-2">typing</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-typing"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-typing"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
