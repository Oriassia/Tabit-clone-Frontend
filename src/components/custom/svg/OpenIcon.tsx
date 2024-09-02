import React from "react";

const OpenIcon: React.FC = () => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.5 21.5"
      className="w-[15%] md:w-[%] lg:w-[16%] lg:h-[16%] "
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <title>open</title>
      <path
        id="Path"
        d="M15,25A10,10,0,1,1,25,15,10,10,0,0,1,15,25Z"
        transform="translate(-4.25 -4.25)"
        style={{ fill: "none", stroke: "#00C8C9", strokeWidth: "1px" }}
      />
      <polyline
        id="Path-2"
        points="10.75 5.75 10.75 11.75 15.71 11.75"
        style={{
          fill: "none",
          stroke: "#00C8C9",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1px",
        }}
      />
    </svg>
  );
};

export default OpenIcon;
