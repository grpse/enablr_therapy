import React, { FC } from "react";
import { TIconProps } from "./types";

const CheckboxUnchecked: FC<TIconProps> = ({
  color,
  width = 16,
  height = 16,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width={width - 1}
      height={height - 1}
      rx="1.5"
      stroke={color || "#000"}
    />
  </svg>
);

export default CheckboxUnchecked;