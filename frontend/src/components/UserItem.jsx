import OnlineIndicator from "./OnlineIndicator";
import { formatDistanceToNow } from "date-fns";

const UserItem = ({
  user,
  isSelected,
  onClick,
  currentUserId,
  searchTerm = "",
}) => {
  const getLastSeenText = () => {
    if (user.online) return "Online";

    if (!user.lastSeen) return "Last seen unknown";

    const lastSeenDate = new Date(user.lastSeen);
    if (isNaN(lastSeenDate.getTime())) return "Last seen unknown";

    try {
      return `Last seen ${formatDistanceToNow(lastSeenDate)} ago`;
    } catch (error) {
      console.error("Error formatting last seen date:", error);
      return "Last seen unknown";
    }
  };

  const lastSeenText = getLastSeenText();

  const getLatestMessagePreview = () => {
    if (!user.latestMessage) return lastSeenText;

    const isOwnMessage = user.latestMessage.sender._id === currentUserId;
    const prefix = isOwnMessage ? "You: " : "";
    const content = user.latestMessage.content;
    const preview =
      content.length > 30 ? content.substring(0, 30) + "..." : content;

    return prefix + preview;
  };

  const getMessageTime = () => {
    if (!user.latestMessage) return "";

    const dateField =
      user.latestMessage.createdAt || user.latestMessage.timestamp;
    if (!dateField) return "";

    const messageDate = new Date(dateField);
    if (isNaN(messageDate.getTime())) return "";

    try {
      return formatDistanceToNow(messageDate, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <div
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 group ${
        isSelected
          ? "bg-gradient-to-r from-indigo-100 to-blue-100 border-r-4 border-indigo-500 shadow-sm"
          : ""
      } ${user.unreadCount > 0 ? "bg-indigo-25" : ""}`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.username}
          className={`w-12 h-12 rounded-full object-cover transition-all duration-200 group-hover:scale-105 ${
            isSelected ? "ring-2 ring-indigo-400 ring-offset-2" : ""
          }`}
        />
        <OnlineIndicator online={user.online} />
        {user.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {user.unreadCount > 9 ? "9+" : user.unreadCount}
            </span>
          </div>
        )}
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3
            className={`text-sm font-medium text-gray-900 truncate transition-colors ${
              user.unreadCount > 0 ? "font-bold text-gray-800" : ""
            } ${isSelected ? "text-blue-900" : ""}`}
          >
            {user.username}
          </h3>
          <div className="flex items-center space-x-2">
            {user.latestMessage && (
              <span
                className={`text-xs whitespace-nowrap transition-colors ${
                  isSelected ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                {getMessageTime()}
              </span>
            )}
          </div>
        </div>
        <p
          className={`text-xs truncate transition-colors ${
            user.unreadCount > 0
              ? "font-medium text-gray-700"
              : isSelected
              ? "text-indigo-700"
              : "text-gray-500"
          }`}
        >
          {getLatestMessagePreview()}
        </p>
        {user.unreadCount > 0 && (
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs font-medium text-indigo-600">
              {user.unreadCount} new message{user.unreadCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
