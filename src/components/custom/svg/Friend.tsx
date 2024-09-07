export const Friend = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 69 69"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      style={{ transform: "translateX(6px)" }} // Adjust the value to move right
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0H68V68H0z"></path>
                <g
                  stroke={isSelected ? "#000" : "#FFF"} // Changes stroke color dynamically
                >
                  <circle cx="46.088" cy="9.943" r="2"></circle>
                  <circle cx="39.588" cy="20.443" r="1.5"></circle>
                  <path d="M21.761 24.943h22.327c.553 0 1 .447 1 1v27c0 .552-.447 1-1 1h-34c-.552 0-1-.448-1-1V32.23h0"></path>
                  <path d="M25 25H29V54H25z"></path>
                  <rect
                    width="41"
                    height="12"
                    x=".254"
                    y="12.559"
                    rx="1"
                    transform="translate(20.753521, 18.558615) rotate(-30.000000) translate(-20.753521, -18.558615)"
                  ></rect>
                  <path d="M49.588 15.443c.553 0 1 .447 1 1v2.499h2.5c.553 0 1 .448 1 1 0 .553-.447 1-1 1h-2.5v2.5c0 .553-.447 1-1 1-.552 0-1-.447-1-1v-2.5h-2.5c-.552 0-1-.447-1-1 0-.552.448-1 1-1h2.5v-2.5c0-.552.448-1 1-1z"></path>
                  <path d="M22.778 0l.182.011c4.381.534 5.484 3.968 5.484 7.143l-2.84 1.538c.537-3.65-.355-5.3-2.81-5.676l-.11-.015-.123.001c-.486.012-.834.066-1.176.212l-.147.069c-.998.503-1.661 1.767-1.707 4.365l-.003.295v4l-.035.023.182.093-1.583.872-1.564 1.078v-.216l-.033.02-4.217-2.122-.46-.248c-2.291-1.165-3.719-1.174-4.631-.529"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
