import React from "react";

export const CheckmarkIcon = ({
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
    strokeWidth: strokeWidth || "1px",
    width: width || 24,
    height: height || 24,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={style}
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );
};
