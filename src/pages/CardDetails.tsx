import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "@/services/api.services";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { MdLaptop } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import QRCode from "react-qr-code"; // Import QRCode

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

function CardDetails() {
  const [searchParams] = useSearchParams();
  const [cardData, setCardData] = useState<IGiftCard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const cardId = searchParams.get("cardId");

  async function getGiftCard() {
    if (cardId) {
      try {
        const { data } = await api.get(`/giftcard/${cardId}`);
        console.log(data); // Log the data to verify
        setCardData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    }
  }

  useEffect(() => {
    getGiftCard();
  }, [cardId]);

  if (isLoading) {
    // Show a loading spinner or placeholder
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Create a URL or a unique string to encode in the QR code

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full bg-cover bg-center shadow-inner"
      style={{
        backgroundImage: `url("${cardData?.mainphoto}")`, // Ensure quotes around the URL
        backgroundSize: "cover", // Cover the entire background
        backgroundPosition: "center",
        boxShadow: "inset 0 0 1rem #000",
      }}
    >
      <div className="w-full  flex flex-col align-middle items-center justify-center">
        <h1 className="text-black font-bold text-2xl">
          {cardData?.restaurant_name}
        </h1>
        <div className="bg-greyNavbar bg-opacity-90 rounded-3xl px-[4em] pb-[2em] font-rubik max-w-[650px] mx-auto my-[2em]">
          <div className="text-center flex flex-col justify-center items-center max-w-[650px] text-white pt-20">
            <h2 className="text-2xl text-orange py-4 font-bold">
              Your gift card balance:{" "}
            </h2>
            <span className="text-4xl text-orange font-extrabold">
              ₪{cardData?.balance}
            </span>

            <div className="flex flex-col justify-center items-center align-middle py-4">
              <h1 className="text-white font-extrabold text-2xl">
                Show QR code at the restaurant
              </h1>
              {/* Display QR code that encodes a URL to redeem the card */}
              {cardData?.cardId && (
                <QRCode
                  className="mt-4 border-white border-8"
                  value={`https://tabit-clone.vercel.app/gift-cards/redeem-card/${cardData?.cardId}`}
                  size={150}
                  level="H"
                />
              )}
              <h1 className="text-greyFooterText pt-2 ">Code</h1>
              <span className="text-white">{cardData?.cardId}</span>
            </div>
            {cardData?.senderName ? (
              <>
                <h1 className="text-2xl">Hey {cardData.firstName}!</h1>
                <h2>
                  You recieved ₪{cardData.balance} from {cardData.senderName}!
                </h2>
                <h2>Have Fun!</h2>
              </>
            ) : cardData ? (
              <>
                <h1>Hey {cardData.firstName}!</h1>
                <h2>Your Giftcard is ready to be Reedemed!</h2>
                <h2>Have Fun!</h2>
              </>
            ) : (
              ""
            )}
            <p className="text-center my-6">
              This voucher is valid for 5 years from date of purchase, as
              required by Consumer Protection Law 14(h)
            </p>
            <div className="flex text-white py-[1em] gap-[0.6rem]">
              <Link
                to="https://legal.tabit.cloud/accessibility-statement/il"
                className="flex items-center gap-2 w-2/5"
              >
                <BsUniversalAccessCircle />
                <p>Accessibility Statement</p>
              </Link>

              {cardData?.restaurant_website ? (
                <Link
                  to={cardData?.restaurant_website || "No website"}
                  className="flex items-center gap-2 w-1/5"
                >
                  {" "}
                  <MdLaptop />
                  {cardData?.restaurant_name}
                </Link>
              ) : (
                ""
              )}
              <div className="flex items-center gap-2 w-2/5">
                <FaHouse />
                <p className="text-left">
                  {cardData?.restaurant_address || "No address"}
                </p>
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
}

export default CardDetails;
