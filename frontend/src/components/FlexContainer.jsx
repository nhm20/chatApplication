import { forwardRef } from "react";

const FlexContainer = forwardRef(
  ({ children, direction = "row", className = "", ...props }, ref) => {
    const directionClass = direction === "column" ? "flex-col" : "flex-row";

    return (
      <div
        ref={ref}
        className={`flex ${directionClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FlexContainer.displayName = "FlexContainer";

export default FlexContainer;
