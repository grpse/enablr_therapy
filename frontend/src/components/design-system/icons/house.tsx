import React, { FC } from "react";
import { TIconProps } from "./types";

const Video: FC<TIconProps> = ({ color, width = 20, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_0_393)">
      <path
        d="M10 4.74167L14.1667 8.49167V15H12.5V10H7.5V15H5.83333V8.49167L10 4.74167ZM10 2.5L1.66667 10H4.16667V16.6667H9.16667V11.6667H10.8333V16.6667H15.8333V10H18.3333L10 2.5Z"
        fill={color || "#000"}
      />
    </g>
    <defs>
      <clipPath id="clip0_0_393">
        <rect width={width} height={height} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Video;
