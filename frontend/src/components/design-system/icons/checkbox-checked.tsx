import React, { FC } from "react";
import { TIconProps } from "./types";

const CheckboxChecked: FC<TIconProps> = ({
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
    <g clipPath="url(#clip0_218_6)">
      <path
        d="M5.99993 10.7997L3.19993 7.99973L2.2666 8.93306L5.99993 12.6664L13.9999 4.6664L13.0666 3.73306L5.99993 10.7997Z"
        fill={color || "#000"}
      />
    </g>
    <defs>
      <clipPath id="clip0_218_6">
        <rect width={width} height={height} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CheckboxChecked;
