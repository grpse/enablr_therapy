import React, { FC } from "react";
import { TIconProps } from "./types";


const ChevronRight: FC<TIconProps> = ({
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
      d="M2.36047 0L0.480469 1.88L6.58714 8L0.480469 14.12L2.36047 16L10.3605 8L2.36047 0Z"
      fill={color || "#000"}
    />
  </svg>
);

export default ChevronRight;