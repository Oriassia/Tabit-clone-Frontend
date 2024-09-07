import React, { useState } from "react";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { MdLaptop } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IRestaurant } from "@/types/restaurant";
import { Friend } from "../svg/Friend";
import VerificationCodeDialog from "./VerificationCodeDialog";
import ErrorModal from "./ErrorModal";
import CreditCardDialog from "./CreditCardDialog";

interface SummaryFormProps {
  handlePreviousStep: () => void;
  restaurant: IRestaurant | null;
  wayToSend: "phone" | "email";
  handleWayChange: (option: "phone" | "email") => void;
  recipientFirstName: string;
  recipientLastName: string;
  giftCardAmount: number;
  phoneNumber: string;
  email: string;
}

const SummaryForm: React.FC<SummaryFormProps> = ({
  handlePreviousStep,
  restaurant,
  wayToSend,
  handleWayChange,
  recipientFirstName,
  recipientLastName,
  giftCardAmount,
  phoneNumber,
  email,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // For error modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleResendCode = () => {
    alert("Code resent.");
  };

  const isFormValid = () => {
    // If sending via phone, check if the phone number is filled
    const isPhoneValid = wayToSend === "phone" && phoneNumber.trim() !== "";

    // If sending via email, check if the email is filled
    const isEmailValid = wayToSend === "email" && email.trim() !== "";

    // Terms must be accepted and either phone or email must be valid
    return (isPhoneValid || isEmailValid) && termsAccepted;
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
            phone: phoneNumber, // Pass phone number from state
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
    <>
      <div className="relative bg-black bg-opacity-75 max-w-[650px] rounded-3xl px-[6em] py-[4em] font-rubik">
        <div className="relative flex items-center justify-between text-white pb-[3em]">
          <button onClick={handlePreviousStep} className="mr-2 text-[1.5em]">
            <IoIosArrowBack />
          </button>
          <p className="absolute left-1/2 transform -translate-x-1/2 text-center pb-1 border-b-2 w-fit border-greenButton text-white text-[1.5em]">
            Summary
          </p>
        </div>

        {/* Image and Card Details */}
        <div className="text-center">
          <div className="relative">
            {/* The image */}
            <img
              src={restaurant?.mainPhoto}
              alt="Restaurant"
              className="rounded-md max-h-[250px] w-full object-cover"
            />

            {/* Overlay content */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <p className="text-white text-left text-[1.7em]">
                  {recipientFirstName} {recipientLastName}
                </p>
                <div>
                  <Friend isSelected={false} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white text-[3em]">
                  ₪{giftCardAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 py-[2em] text-[1.1em] "
          onSubmit={handleSubmit}
        >
          <div className="text-white">
            <p className="pb-2">Where should we send your receipt?</p>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={wayToSend === "phone"}
                  onChange={() => handleWayChange("phone")} // Call handleWayChange when the checkbox is toggled
                />
                <span>My Phone</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={wayToSend === "email"}
                  onChange={() => handleWayChange("email")} // Call handleWayChange when the checkbox is toggled
                />
                <span>My Email</span>
              </label>
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Phone number"
                value={phoneNumber} // Assuming this is a placeholder or actual data
                disabled={wayToSend !== "phone"} // Disable based on the selected way
                className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                  wayToSend !== "phone" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                disabled={wayToSend !== "email"}
                className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                  wayToSend !== "email" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>

          {/* Terms of Service */}
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
            disabled={!isFormValid()}
            className={`rounded-full items-center text-[1.5em] px-[1em] py-2 w-4/5 self-center bg-greyBg bg-opacity-75 text-white flex-grow ${
              isFormValid() ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          >
            <span className="flex-grow text-center">
              Pay ₪{giftCardAmount.toFixed(2)}
            </span>
          </button>
        </form>
        {/* Contact Information */}

        {/* Restaurant Information */}
        <p className="text-white text-center text-[0.9em] pt-[2em]">
          This voucher is valid for 5 years from date of purchase, as required
          by Consumer Protection Law 14(h)
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

      <VerificationCodeDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phone={phoneNumber}
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
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </>
  );
};

export default SummaryForm;
