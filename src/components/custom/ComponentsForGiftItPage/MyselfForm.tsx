import React, { useState } from "react";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { MdLaptop } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IRestaurant } from "@/types/restaurant";
import CreditCardDialog from "./CreditCardDialog";
import ErrorModal from "./ErrorModal";
import VerificationCodeDialog from "./VerificationCodeDialog";

interface MyselfFormProps {
  handlePreviousStep: () => void;
  restaurant: IRestaurant | null;
  wayToSend: "phone" | "email";
  handleWayChange: (option: "phone" | "email") => void;
}

const MyselfForm: React.FC<MyselfFormProps> = ({
  handlePreviousStep,
  wayToSend,
  handleWayChange,
  restaurant,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // For error modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [amount, setAmount] = useState(0); // State for the gift card amount

  const handleFocus = () => setPlaceholder("");
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") setPlaceholder("0");
  };

  const handleResendCode = () => {
    alert("Code resent.");
  };

  const handleNameChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^[A-Za-z]*$/.test(value)) {
        setter(value);
      }
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow "+" for country code
    if (/^[0-9+]*$/.test(value)) {
      // Remove leading zeros if the user entered any
      if (value.startsWith("0")) {
        value = value.replace(/^0+/, "");
      }
      // Add country code if not already present
      if (!value.startsWith("+")) {
        value = "+972" + value; // Assuming it's an Israeli number, you can replace +972 with your country code.
      }

      setPhone(value); // Update phone with the formatted number
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10); // Convert string to number

    // Restrict the value to 0 - 600
    if (value > 600) {
      value = 600;
    } else if (value < 0 || isNaN(value)) {
      value = 0;
    }

    setAmount(value); // Set the amount as a number
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      ((wayToSend === "phone" && phone.trim() !== "") ||
        (wayToSend === "email" && email.trim() !== "")) &&
      termsAccepted
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming you want to send a confirmation code as SMS
    const generatedCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const message = `Your confirmation code is: ${generatedCode}`;
    setConfirmationCode(generatedCode);

    console.log(generatedCode);

    try {
      // Send SMS by calling the backend
      const response = await fetch(
        "http://localhost:3000/api/giftcard/send-sms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone, // Pass phone number from state
            message: message, // Pass the generated message
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("SMS sent successfully:", result);
        // alert("SMS sent successfully!");
      } else {
        console.error("Failed to send SMS:", result.message);
        // alert("Failed to send SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      //   alert("Error sending SMS.");
    }

    setIsModalOpen(true);
  };

  const handleCodeVerification = () => {
    if (inputCode === confirmationCode) {
      //   alert("Code verified successfully!");
      setIsModalOpen(false);
      setIsPaymentModalOpen(true);
    } else {
      setIsErrorModalOpen(true);
      setErrorMessage("Incorrect code. Please try again.");
    }
  };

  return (
    <div className="bg-black bg-opacity-75 max-w-[650px] rounded-3xl px-[6em] py-[4em] font-rubik">
      <div className="relative flex items-center justify-between text-white pb-[3em]">
        <button onClick={handlePreviousStep} className="mr-2 text-[1.5em]">
          <IoIosArrowBack />
        </button>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-center pb-1 border-b-2 w-fit border-greenButton text-white text-[1.5em]">
          Card Details
        </p>
      </div>
      <form
        className="flex flex-col gap-4 text-[1.1em] "
        onSubmit={handleSubmit}
      >
        {/* To Section */}
        <div className="pb-[2em]">
          <p className="text-white">To</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleNameChange(setFirstName)}
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleNameChange(setLastName)}
              className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-white pb-[0.5em]">
            Where should we send the gift card?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={wayToSend === "phone"}
                onChange={() => handleWayChange("phone")}
              />
              <span className="text-white">My Phone</span>
            </label>
            <label className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={wayToSend === "email"}
                onChange={() => handleWayChange("email")}
              />
              <span className="text-white">My Email</span>
            </label>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={handlePhoneChange}
              className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                wayToSend !== "phone" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={wayToSend !== "phone"}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              max={600} // UI restriction
              value={amount || ""} // Controlled input based on state
              placeholder={placeholder} // Placeholder is dynamic
              onChange={handleAmountChange} // Validate amount programmatically
              onFocus={handleFocus} // Clear placeholder on focus
              onBlur={handleBlur} // Restore placeholder on blur if empty
              className="bg-transparent text-greenButton text-2xl text-center self-center justify-center w-[8em] items-center border-b border-greenButton no-arrows placeholder-greenButton focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* TERMS OF SERVICE */}
        <label className="flex items-center w-full gap-2">
          <input
            type="checkbox"
            className="form-checkbox self-start"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <span className="text-white self-start">
            I have read and approved the{" "}
            <span className=" underline">Terms of Service </span> and{" "}
            <span className="underline">Privacy Notice </span>
          </span>
        </label>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={!isFormValid()} // Disable if form is invalid
          className={`rounded-full items-center text-[1.5em] px-[1em] py-2 w-4/5 self-center bg-greyBg bg-opacity-75 text-white flex-grow ${
            isFormValid() ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
        >
          <span className="flex-grow text-center">
            Pay ₪{amount.toFixed(2)}
          </span>
        </button>
      </form>

      {/* Restaurant Information */}
      <p className="text-white text-center text-[0.9em] pt-[2em]">
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

      <VerificationCodeDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phone={phone}
        inputCode={inputCode}
        setInputCode={setInputCode}
        errorMessage={errorMessage}
        handleCodeVerification={handleCodeVerification}
        handleResendCode={handleResendCode}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />

      <CreditCardDialog
        restaurantName={restaurant?.name}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        restaurantId={restaurant?.restId ?? 0} // Pass restaurantId
        firstName={firstName} // Pass firstName
        lastName={lastName} // Pass lastName
        phoneNumber={phone} // Pass phoneNumber
        email={email} // Pass email
        giftCardAmount={amount} // Pass gift card amount
      />
    </div>
  );
};

export default MyselfForm;
