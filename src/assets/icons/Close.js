import React from "react";

export const CloseIcon = ({
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  strokeWidth,
  height,
  width,
}) => {
  const style = {
    fill: fill || "none",
    stroke: stroke || "#000",
    strokeLinecap: strokeLinecap || "round",
    strokeLinejoin: strokeLinejoin || "round",
    strokeWidth: strokeWidth || "2px",
    height: height || "32px",
    width: width || "32px",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={style}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};
