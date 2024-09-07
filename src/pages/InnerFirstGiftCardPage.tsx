import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Friend } from "@/components/custom/svg/Friend";
import CreditCard from "@/components/custom/svg/CreditCard";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { MdLaptop } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { IRestaurant } from "@/types/restaurant";
import { IoIosArrowBack } from "react-icons/io";
import api from "@/services/api.services";

function InnerFirstGiftCardPage() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<"friend" | "myself">(
    "friend"
  ); // State for selected option
  const [activeSection, setActiveSection] = useState<
    "chooseForWhom" | "fillingForm"
  >("chooseForWhom"); // State for sections
  const [wayToSend, setWayToSend] = useState<"phone" | "email">("phone");

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantById(restaurantId)
        .then((data) => {
          if (data) {
            setRestaurant(data);
          } else {
            setError("Ресторан не найден.");
          }
        })
        .catch(() => setError("Не удалось загрузить ресторан"))
        .finally(() => setLoading(false));
    }
  }, [restaurantId]);

  const fetchRestaurantById = async (
    restaurantId: string
  ): Promise<IRestaurant | null> => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`);
      if (response.status !== 200) {
        console.error("Не удалось загрузить данные ресторана");
        return null;
      }
      return response.data[0];
    } catch (error) {
      console.error("Ошибка загрузки ресторана:", error);
      return null;
    }
  };

  const handleNextStep = () => {
    setActiveSection("fillingForm");
  };

  const handlePreviousStep = () => {
    setActiveSection("chooseForWhom");
  };

  const handleSelectOption = (option: "friend" | "myself") => {
    setSelectedOption(option);
  };

  const handleWayChange = (option: "phone" | "email") => {
    setWayToSend(option);
  };

  const [placeholder, setPlaceholder] = useState("0");

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setPlaceholder("0");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "chooseForWhom":
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

      case "fillingForm":
        return (
          <div className="bg-black bg-opacity-75 max-w-[650px] rounded-3xl px-[6em] py-[4em] font-rubik">
            <div className="relative flex items-center justify-between text-white pb-[3em]">
              <button
                onClick={handlePreviousStep}
                className="mr-2 text-[1.5em]"
              >
                <IoIosArrowBack />
              </button>
              <p className="absolute left-1/2 transform -translate-x-1/2 text-center  pb-1 border-b-2 w-fit border-greenButton text-white text-[1.5em]">
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
                    className="bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
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

              {/* Contact Options */}
              <div>
                <p className="text-white">
                  Where should we send the gift card?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center w-full  gap-2">
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
                      wayToSend !== "phone"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={wayToSend !== "phone"} // Disable if 'email' is selected
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className={`bg-greyDropDownMenu text-white px-4 py-2 rounded-lg w-full ${
                      wayToSend !== "email"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={wayToSend !== "email"} // Disable if 'phone' is selected
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
                    className="bg-transparent text-greenButton text-2xl text-center self-center justify-center w-[8em] items-center border-b border-greenButton no-arrows placeholder-greenButton focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <button className="rounded-full  items-center text-[1.5em] px-[1em] py-2 w-4/5 self-center text-center flex justify-center bg-greyBg bg-opacity-75 text-white flex-grow">
                <span className="flex-grow text-center text-white">Next</span>
                <span className="text-white ">
                  <FaArrowRight />
                </span>
              </button>
            </form>

            {/* Next Button */}

            <p className="text-white text-center text-[0.9em] pt-[2em]">
              This voucher is valid for 5 years from date of purchase, as
              required by Consumer Protection Law 14(h)
            </p>

            {/* Блок с ссылками и контактами */}
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
      default:
        return null;
    }
  };

  return (
    <section
      className="relative flex flex-col items-center pt-[6em] bg-cover bg-center shadow-inner"
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
}

export default InnerFirstGiftCardPage;
