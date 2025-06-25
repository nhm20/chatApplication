const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`mb-4 ${isCurrentUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <div className="font-bold">{message.username}</div>
        <div className="break-words">{message.text}</div>
        <div className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;
