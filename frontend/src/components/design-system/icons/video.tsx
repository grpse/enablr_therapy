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
    <g clipPath="url(#clip0_0_396)">
      <path
        d="M12.5 6.66667V13.3333H4.16667V6.66667H12.5ZM13.3333 5H3.33333C2.875 5 2.5 5.375 2.5 5.83333V14.1667C2.5 14.625 2.875 15 3.33333 15H13.3333C13.7917 15 14.1667 14.625 14.1667 14.1667V11.25L17.5 14.5833V5.41667L14.1667 8.75V5.83333C14.1667 5.375 13.7917 5 13.3333 5Z"
        fill={color || "#000"}
      />
    </g>
    <defs>
      <clipPath id="clip0_0_396">
        <rect width={width} height={height} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Video;
