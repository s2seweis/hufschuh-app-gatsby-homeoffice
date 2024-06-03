import React from "react";
import colors from "../../constants/colors";

export const AccountIcon = ({
  fill,
  stroke,
  strokeLinecap,
  strokeLineJoin,
  strokeWidth,
}) => {
  const style = {
    fill: colors.greys["600"] || fill || "none",
    stroke: colors.greys["600"] || stroke || "#000",
    strokeLinecap: strokeLinecap || "round",
    strokeLineJoin: strokeLineJoin || "round",
    strokeWidth: strokeWidth || "32px",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <path
        style={style}
        d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z"
      />
      <path
        style={style}
        d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z"
      />
    </svg>
  );
};
