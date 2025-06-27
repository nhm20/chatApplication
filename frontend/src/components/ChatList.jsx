import { useState, useMemo } from "react";
import UserItem from "./UserItem";
import { useAuth } from "../context/AuthContext";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const ChatList = ({
  users,
  selectedUser,
  onSelectUser,
  isMobile = false,
  onClose,
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    return users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const clearSearch = () => setSearchTerm("");

  const handleUserSelect = (u) => {
    onSelectUser(u);
    if (isMobile && onClose) onClose();
  };

  return (
    <div
      className={`${
        isMobile ? "w-full h-full pt-20" : "w-full h-full"
      } border-r border-gray-200 flex flex-col bg-white ${
        isMobile ? "animate-slide-in" : ""
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">Chats</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <IoCloseOutline className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <IoCloseOutline className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "conversation" : "conversations"}
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredUsers.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((u) => (
              <UserItem
                key={u._id}
                user={u}
                isSelected={selectedUser?._id === u._id}
                onClick={() => handleUserSelect(u)}
                currentUserId={user.id}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            {searchTerm ? (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoSearchOutline className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  No results found
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  No users found for "{searchTerm}"
                </p>
                <button
                  onClick={clearSearch}
                  className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoPeopleOutline className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  No conversations yet
                </p>
                <p className="text-xs text-gray-500">
                  Start a conversation with someone to see them here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
