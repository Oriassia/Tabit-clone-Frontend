import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import FriendForm from "@/components/custom/ComponentsForGiftItPage/FriendForm";
import MyselfForm from "@/components/custom/ComponentsForGiftItPage/MyselfForm";
import SummaryForm from "@/components/custom/ComponentsForGiftItPage/SummaryForm";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { MdLaptop } from "react-icons/md";
import { FaArrowRight, FaHouse } from "react-icons/fa6";
import CreditCard from "@/components/custom/svg/CreditCard";
import { Friend } from "@/components/custom/svg/Friend";

const InnerFirstGiftCardPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [selectedOption, setSelectedOption] = useState<"friend" | "myself">(
    "friend"
  );
  const [activeSection, setActiveSection] = useState<
    "chooseForWhom" | "fillingForm" | "summaryPage"
  >("chooseForWhom");

  const [wayToSend, setWayToSend] = useState<"phone" | "email">("phone");

  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [giftCardAmount, setGiftCardAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch restaurant data when the component mounts
  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantById(restaurantId);
    }
  }, [restaurantId]);

  const fetchRestaurantById = async (restaurantId: string) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`);
      if (response.status === 200) {
        setRestaurant(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to load restaurant", error);
    }
  };

  // Handlers for navigation between steps
  const handleNextStep = () => {
    setActiveSection("fillingForm");
  };

  const handlePreviousStep = () => {
    setActiveSection("chooseForWhom");
  };

  const handleGoToSummary = () => {
    setActiveSection("summaryPage");
  };

  const handleSelectOption = (option: "friend" | "myself") => {
    setSelectedOption(option);
  };

  const handleWayChange = (option: "phone" | "email") => {
    setWayToSend(option);
  };

  // Render content based on selected section
  const renderContent = () => {
    if (activeSection === "chooseForWhom") {
      return (
        <div className="bg-black bg-opacity-65 rounded-3xl px-[4em] pb-[6em] font-rubik">
          <div className="text-center flex flex-col justify-center items-center max-w-[650px] text-white">
            <p className="pt-[2.5em] pb-4 border-b-2 text-center w-fit border-greenButton justify-self-center text-white text-[1.5em]">
              Send Gift Card to...?
            </p>
            <div className="flex justify-center items-center gap-4 py-[2.5em] text-white text-[1.4em]">
              {/* Вариант Friend */}
              <div
                onClick={() => handleSelectOption("friend")}
                className={`${
                  selectedOption === "friend"
                    ? "bg-greenButton border border-greenButton"
                    : "border border-greenButton bg-transparent"
                } px-[1.8em] py-[1.3em] rounded-3xl flex items-center flex-col justify-center cursor-pointer`}
              >
                <Friend isSelected={selectedOption === "friend"} />
                <p>Friend</p>
              </div>
              {/* Вариант Myself */}
              <div
                onClick={() => handleSelectOption("myself")}
                className={`${
                  selectedOption === "myself"
                    ? "bg-greenButton"
                    : "border border-greenButton bg-transparent"
                } px-[1.8em] py-[1.3em] rounded-3xl flex items-center flex-col justify-center cursor-pointer`}
              >
                <CreditCard isSelected={selectedOption === "myself"} />
                <p>Myself</p>
              </div>
            </div>

            {/* Кнопка Next */}
            <button
              onClick={handleNextStep}
              className="rounded-full flex items-center text-[1.5em] px-[1em] py-2 w-2/3 self-center bg-greenButton text-white"
            >
              <span className="flex-grow text-center text-white">Next</span>
              <span className="text-white ">
                <FaArrowRight />
              </span>
            </button>

            <p className="text-white max-w-[450px] text-[0.9em] py-[1em]">
              This voucher is valid for 5 years from date of purchase, as
              required by Consumer Protection Law 14(h)
            </p>

            {/* Блок с ссылками и контактами */}
            <div className="flex gap-2 text-white py-[1em]">
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
        </div>
      );
    } else if (activeSection === "fillingForm") {
      return selectedOption === "friend" ? (
        <FriendForm
          handlePreviousStep={handlePreviousStep}
          wayToSend={wayToSend}
          handleWayChange={handleWayChange}
          restaurant={restaurant}
          goToSummary={handleGoToSummary}
          // Pass the state setters to update form values
          setRecipientFirstName={setRecipientFirstName}
          setRecipientLastName={setRecipientLastName}
          setGiftCardAmount={setGiftCardAmount}
          setPhoneNumber={setPhoneNumber}
        />
      ) : (
        <MyselfForm
          handlePreviousStep={handlePreviousStep}
          restaurant={restaurant}
          wayToSend={wayToSend}
          handleWayChange={handleWayChange}
        />
      );
    } else if (activeSection === "summaryPage") {
      return (
        <SummaryForm
          handlePreviousStep={() => setActiveSection("fillingForm")}
          restaurant={restaurant}
          wayToSend={wayToSend}
          handleWayChange={handleWayChange}
          recipientFirstName={recipientFirstName}
          recipientLastName={recipientLastName}
          giftCardAmount={giftCardAmount}
          phoneNumber={phoneNumber}
        />
      );
    }
  };

  // Section with animation
  return (
    <section
      className="relative flex flex-col  items-center pt-[6em] bg-cover bg-center shadow-inner"
      style={{
        backgroundImage: `url('${restaurant?.mainPhoto}')`,
        boxShadow: "inset 0 0 1rem #000",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default InnerFirstGiftCardPage;
