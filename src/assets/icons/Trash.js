import React from "react";

export const TrashIcon = ({
  fill,
  stroke,
  strokeLinecap,
  strokeLineJoin,
  strokeWidth,
}) => {
  const style = {
    fill: fill || "none",
    stroke: stroke || "#000",
    strokeLinecap: strokeLinecap || "round",
    strokeLineJoin: strokeLineJoin || "round",
    strokeWidth: strokeWidth || "2",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={style}
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
};
