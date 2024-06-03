import React from "react";

export const CameraIcon = ({
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...style}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
};
