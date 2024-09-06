import { Button } from "@/components/ui/button";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Friend } from "@/components/custom/svg/Friend";

function InnerFirstGiftCardPage() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantById(restaurantId)
        .then((data) => {
          if (data) {
            setRestaurant(data);
          } else {
            setError("Restaurant not found.");
          }
        })
        .catch(() => setError("Failed to fetch restaurant"))
        .finally(() => setLoading(false));
    }
  }, [restaurantId]);

  const fetchRestaurantById = async (
    restaurantId: string
  ): Promise<IRestaurant | null> => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`);
      if (response.status !== 200) {
        console.error("Failed to fetch restaurant data");
        return null;
      }
      console.log(response.data[0]);

      return response.data[0];
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      return null;
    }
  };

  return (
    <section
      className="relative flex flex-col items-center pt-[6em] bg-cover bg-center shadow-inner"
      style={{
        backgroundImage: `url(${restaurant?.mainPhoto})`,
        boxShadow: "inset 0 0 1rem #000",
      }}
    >
      {/* BEFORE MAIN PART */}
      <div className="">
        <p>Logo</p>
        <p>{restaurant?.name}</p>
      </div>

      {/* MAIN PART */}
      <div className=" bg-black bg-opacity-65 rounded-xl ">
        <div className="flex flex-col items-senter justify-center text-center max-w-[650px] px-[4em]">
          <p className="pt-[2.5em] pb-4 border-b-2 w-fit self-center border-greenButton text-white text-[1.5em]">
            Send Gift Card to...?
          </p>
          <div className="flex justify-center gap-4 py-[2.5em] text-white text-[1.4em]">
            <div className="bg-greenButton px-[1.8em] py-[1.5em] rounded-3xl flex items-center flex-col justify-center">
              <Friend />
              <p>Friend</p>
            </div>
            <div className="bg-greenButton px-[1.8em] py-[1.5em] rounded-3xl flex items-center flex-col justify-center">
              <Friend />
              <p>Myself</p>
            </div>
          </div>
          <Button className="rounded-full text-[1.3em] py-[1.25em] w-2/3 self-center">
            <span className="text-white">Next</span>
          </Button>
          <p>
            This voucher is valid for 5 years from date of purchase, as required
            by Consumer Protection Law 14(h)
          </p>
          <div className="flex gap-2">
            <div>
              <Link to="https://legal.tabit.cloud/accessibility-statement/il">
                <p>Icon</p>
                <p>Accessibility Statement</p>
              </Link>
            </div>
            <div>
              <p>Icon</p>
              <p>{restaurant?.website}</p>
            </div>
            <div>
              <p>Icon</p>
              <p>{restaurant?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InnerFirstGiftCardPage;
