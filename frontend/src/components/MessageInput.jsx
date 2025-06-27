import { IoSendOutline } from "react-icons/io5";

const MessageInput = ({
  value,
  onChange,
  onKeyDown,
  onSend,
  placeholder = "Type a message...",
}) => {
  return (
    <div className="flex items-end space-x-3 lg:space-x-4">
      <div className="flex-1 relative">
        <input
          type="text"
          className="w-full border-2 border-indigo-200 rounded-2xl py-3 px-5 lg:py-4 lg:px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-indigo-50/50 hover:bg-white text-sm lg:text-base hover:border-indigo-300 focus:scale-[1.01] placeholder-gray-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <button
        className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-3 lg:p-4 rounded-2xl hover:from-indigo-600 hover:to-blue-700 active:from-indigo-700 active:to-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 hover:-translate-y-0.5 disabled:transform-none"
        onClick={onSend}
        disabled={!value.trim()}
      >
        <IoSendOutline className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </div>
  );
};

export default MessageInput;
