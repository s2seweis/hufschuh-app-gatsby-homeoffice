import React from "react";

export const CrosshairIcon = ({
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
      <circle cx="12" cy="12" r="10"/>
      <line x1="22" y1="12" x2="18" y2="12"/>
      <line x1="6" y1="12" x2="2" y2="12"/>
      <line x1="12" y1="6" x2="12" y2="2"/>
      <line x1="12" y1="22" x2="12" y2="18"/>
    </svg>
  );
};
