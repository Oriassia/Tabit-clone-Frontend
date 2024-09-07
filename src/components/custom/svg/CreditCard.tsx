const CreditCard = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70" // Adjust this size according to your design
      height="70"
      viewBox="0 0 69 69"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <g fill="none" fillRule="evenodd">
        <g stroke={isSelected ? "#000" : "#FFF"}>
          {" "}
          {/* Set the stroke dynamically */}
          <g>
            <g
              stroke={isSelected ? "#000" : "#FFF"} // Set the stroke dynamically again for nested elements
              transform="translate(-70.000000, -306.000000) translate(37.000000, 288.000000) translate(33.500000, 18.691114) translate(33.873981, 33.242975) rotate(-8.000000) translate(-33.873981, -33.242975) translate(11.373981, 8.059545)"
            >
              <rect
                width="45"
                height="27"
                y="23.367"
                strokeWidth="1.089"
                rx="1.089"
              ></rect>
              <circle cx="6.484" cy="2" r="2"></circle>
              <circle cx="2.984" cy="12.5" r="1.5"></circle>
              <path d="M12.984 7.5c.552 0 1 .448 1 1l-.001 2.499 2.5.001c.553 0 1 .448 1 1s-.447 1-1 1l-2.5-.001V15.5c0 .552-.447 1-1 1-.551 0-1-.448-1-1v-2.501l-2.5.001c-.551 0-1-.448-1-1s.449-1 1-1l2.5-.001V8.5c0-.552.449-1 1-1z"></path>
              <path strokeWidth="1.089" d="M0 29.847H45V34.167H0z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CreditCard;
