import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/services/api.services";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { MdLaptop } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "lucide-react";

interface IGiftCard {
  cardId: string;
  restId: string;
  firstName: string;
  lastName: string;
  PhoneNumber?: number;
  email?: string;
  balance: number;
  senderName?: string;
  restaurant_name: string;
  restaurant_website?: string;
  restaurant_phone?: string;
  restaurant_address: string;
  mainphoto: string;
}

const RedeemCardPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<IGiftCard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function redeemCard() {
      if (cardId) {
        try {
          // Fetch the gift card details before redeeming
          const { data } = await api.get(`/giftcard/${cardId}`);
          setCardData(data); // Store the card data

          await api.delete(`/card/${cardId}`); // Redeem the card
          console.log("Card redeemed!");
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    redeemCard();
  }, [cardId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center shadow-inner"
      style={{
        backgroundImage: `url("${cardData?.mainphoto}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 1rem #000",
      }}
    >
      <div className="w-full h-full flex flex-col align-middle items-center justify-center">
        <h1 className="text-black font-bold text-2xl">
          Thank You for Redeeming Your Gift Card!
        </h1>
        <div className="bg-greyNavbar bg-opacity-90 rounded-3xl px-[4em] pb-[6em] font-rubik max-w-[650px] mx-auto mt-[2em]">
          <div className="text-center flex flex-col justify-center items-center max-w-[650px] text-white py-20">
            <h2 className="text-2xl text-orange py-4">
              {cardData?.restaurant_name}
            </h2>
            <span className="text-4xl text-orange">₪{cardData?.balance}</span>
            <p className="text-white text-lg py-4">
              Your gift card has been successfully redeemed. We hope you enjoy
              your experience at {cardData?.restaurant_name}!
            </p>

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
                <p>{cardData?.restaurant_website || "No website"}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaHouse />
                <p>{cardData?.restaurant_address || "No address"}</p>
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
      </div>
    </section>
  );
};

export default RedeemCardPage;
