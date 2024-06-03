import React from "react";
import colors from "../../constants/colors";

export const PlusIcon = ({
  fill,
  stroke,
  strokeLinecap,
  strokeLineJoin,
  strokeWidth,
}) => {
  const style = {
    fill: fill || "none",
    // stroke: stroke || "#000",
    strokeLinecap: strokeLinecap || "round",
    strokeLineJoin: strokeLineJoin || "round",
    strokeWidth: "1px", //strokeWidth || "62px",
    height: "64px",
    width: "64px",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 52 52"
      style={style}
    >
      <path
        // style={style}

        d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"
      />
      <path
        // style={style}
        d="M38.5 25H27V14c0-.553-.448-1-1-1s-1 .447-1 1v11H13.5c-.552 0-1 .447-1 1s.448 1 1 1H25v12c0 .553.448 1 1 1s1-.447 1-1V27h11.5c.552 0 1-.447 1-1s-.448-1-1-1z"
      />
    </svg>
  );
};
