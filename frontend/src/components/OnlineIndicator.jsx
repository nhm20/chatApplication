const OnlineIndicator = ({ online }) => {
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
        online ? "bg-green-500" : "bg-gray-400"
      }`}
    ></span>
  );
};

export default OnlineIndicator;
