import React from "react";

export const ArrowLeft = ({
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  strokeWidth,
}) => {
  const style = {
    fill: fill || "none",
    stroke: stroke || "#000",
    strokeLinecap: strokeLinecap || "round",
    strokeLinejoin: strokeLinejoin || "round",
    strokeWidth: strokeWidth || "1px",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={style}
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
};
