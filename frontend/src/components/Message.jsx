import { format } from "date-fns";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";

const Message = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      <div
        className={`message-bubble max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
          isOwnMessage
            ? "bg-indigo-500 text-white rounded-br-md shadow-indigo-200"
            : "bg-white text-gray-800 border-2 border-indigo-100 rounded-bl-md hover:border-indigo-200 shadow-indigo-50"
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div className="flex items-center justify-between mt-2">
          <p
            className={`text-xs ${
              isOwnMessage ? "text-indigo-100" : "text-gray-500"
            }`}
          >
            {format(new Date(message.timestamp), "h:mm a")}
          </p>
          {isOwnMessage && (
            <div className="ml-2 flex items-center">
              <span
                className={`text-xs ${
                  message.read ? "text-indigo-200" : "text-indigo-300"
                }`}
              >
                {message.read ? (
                  <IoCheckmarkDoneOutline className="w-4 h-4" />
                ) : (
                  <IoCheckmarkOutline className="w-4 h-4" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
