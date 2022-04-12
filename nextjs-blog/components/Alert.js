import cn from "classnames";
import React from "react";

const Alert = ({ children }) => {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
};

export default Alert;
