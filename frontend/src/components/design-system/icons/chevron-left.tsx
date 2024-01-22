import React, { FC } from "react";
import { TIconProps } from "./types";

const ChevronLeft: FC<TIconProps> = ({
  color,
  width = 11,
  height = 16,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5467 1.88L8.66666 0L0.666656 8L8.66666 16L10.5467 14.12L4.43999 8L10.5467 1.88Z"
      fill={color || "#000"}
    />
  </svg>
);

export default ChevronLeft;
