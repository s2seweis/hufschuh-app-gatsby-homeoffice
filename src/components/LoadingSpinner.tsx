import BeatLoader from "react-spinners/BeatLoader";
import colors from "../constants/colors";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div
      style={{
        margin: "auto auto",
      }}
    >
      <BeatLoader color={colors.primary["170"]} loading size={30} />
    </div>
  );
};
