import React, { useState } from "react";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { FaArrowRight, FaHouse } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdLaptop } from "react-icons/md";
import { Link } from "react-router-dom";
import { IRestaurant } from "@/types/restaurant";

interface FriendFormProps {
  handlePreviousStep: () => void;
  wayToSend: "phone" | "email";
  handleWayChange: (option: "phone" | "email") => void;
  restaurant: IRestaurant | null;
  goToSummary: () => void;
  setRecipientFirstName: React.Dispatch<React.SetStateAction<string>>;
  setRecipientLastName: React.Dispatch<React.SetStateAction<string>>;
  setGiftCardAmount: React.Dispatch<React.SetStateAction<number>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const FriendForm: React.FC<FriendFormProps> = ({
  handlePreviousStep,
  wayToSend,
  handleWayChange,
  restaurant,
  goToSummary,
  setRecipientFirstName,
  setRecipientLastName,
  setGiftCardAmount,
  setPhoneNumber,
}) => {
  const [placeholder, setPlaceholder] = useState("0");

  const handleFocus = () => setPlaceholder("");
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") setPlaceholder("0");
  };

  return (
    <div className="bg-black bg-opacity-75 max-w-[650px]  rounded-3xl px-[6em] py-[4em] font-rubik">
      <div className="relative flex items-center justify-between  text-white pb-[3em]">
        <button onClick={handlePreviousStep} className="mr-2 text-[1.5em]">
          <IoIosArrowBack />
        </button>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-center pb-1 border-b-2 w-fit border-greenButton text-white text-[1.5em]">
          Card Details
        </p>
      </div>
      <form className="flex flex-col gap-4 text-[1.1em]">
        {/* To Section */}
        <div>
          <p className="text-white">To</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setRecipientFirstName(e.target.value)}
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setRecipientLastName(e.target.value)}
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
          </div>
        </div>

        {/* From Section */}
        <div>
          <p className="text-white">From</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Message Section */}
        <div>
          <p className="text-white">Message (Optional)</p>
          <textarea
            placeholder="Type a few words"
            className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            rows={3}
          />
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-white">Where should we send the gift card?</p>
          <div className="flex gap-4">
            <label className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={wayToSend === "phone"}
                onChange={() => handleWayChange("phone")}
              />
              <span className="text-white">Phone</span>
            </label>
            <label className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={wayToSend === "email"}
                onChange={() => handleWayChange("email")}
              />
              <span className="text-white">Email</span>
            </label>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Phone number"
              className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                wayToSend !== "phone" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={wayToSend !== "phone"}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                wayToSend !== "email" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={wayToSend !== "email"}
            />
          </div>
        </div>

        {/* Gift Card Amount */}
        <div className="flex flex-col text-cente py-[1em]">
          <p className="text-white text-center pb-[1em]">
            Gift Card Amount (₪0 - ₪600)
          </p>
          <div className="flex items-center text-center self-center justify-center pb-[1em] gap-2">
            <span className="text-greenButton text-2xl ">₪</span>
            <input
              type="number"
              min={0}
              max={600}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setGiftCardAmount(Number(e.target.value))}
              className="bg-transparent text-greenButton text-2xl text-center self-center justify-center w-[8em] items-center border-b border-greenButton no-arrows placeholder-greenButton focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <button
          className="rounded-full items-center text-[1.5em] px-[1em] py-2 w-4/5 self-center text-center flex justify-center bg-greyBg bg-opacity-75 text-white flex-grow"
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission behavior
            goToSummary(); // Move to the summary page
          }} // Move to summary page // Move to summary page
        >
          <span className="flex-grow text-center text-white">Next</span>
          <span className="text-white ">
            <FaArrowRight />
          </span>
        </button>
      </form>

      {/* Restaurant Information */}
      <p className="text-white text-center max-w-[450px] text-[0.9em] pt-[2em]">
        This voucher is valid for 5 years from date of purchase, as required by
        Consumer Protection Law 14(h)
      </p>

      {/* Links and Contact Information */}
      <div className="flex flex-wrap text-center items-center justify-center gap-2 text-white py-[1em]">
        <div>
          <Link
            to="https://legal.tabit.cloud/accessibility-statement/il"
            className="flex items-center gap-2"
          >
            <BsUniversalAccessCircle />
            <p>Accessibility Statement</p>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <MdLaptop />
          <p>{restaurant?.website || "No website"}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaHouse />
          <p>{restaurant?.address || "No address"}</p>
        </div>
      </div>
      <div>
        <p className="text-[0.7em] italic text-zinc-600">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link to="https://policies.google.com/privacy">
            <span className="text-greenButton">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link to="https://policies.google.com/terms">
            <span className="text-greenButton">Terms of Service</span>
          </Link>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default FriendForm;
