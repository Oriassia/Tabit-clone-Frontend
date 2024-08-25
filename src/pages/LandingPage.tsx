import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdMyLocation } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";

interface Reservation {
  dateDay: string;
  dateDayNumber: string;
  time: string;
  guests: number;
  area: string;
}

interface ReservationSelectorProps {
  reservation: Reservation;
  onPartySizeChange: (newSize: number) => void;
}

function ReservationSelector({
  reservation,
  onPartySizeChange,
}: ReservationSelectorProps) {
  return (
    <div className="flex border-2 rounded-full font-bold font-rubik text-white border-greenBorder w-[400px] lg:min-w-[450px] bg-greenBg">
      <div className="flex flex-col items-center px-[37px] lg:px-[45px] py-[0.5em] text-[19px] border-r-2 border-greenBorder">
        <p className="text-sm font-medium">{reservation.dateDay}</p>
        <p>{reservation.dateDayNumber}</p>
      </div>
      <div className="flex flex-col text-[19px] px-[37px] lg:px-[45px] py-[0.5em] items-center border-r-2 border-greenBorder">
        <p className="text-sm font-medium">Hour</p>
        <p>{reservation.time}</p>
      </div>
      <div className="flex flex-col items-center justify-center text-[19px] px-[37px] lg:px-[45px] py-[0.5em]">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-sm font-medium">Guests</p>
            <p>{reservation.guests}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer and Edge
            }}
          >
            <DropdownMenuItem className="rounded-none font-bold px-4 py-0 pb-4 select-none">
              How Many Guests?
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((guestNum) => (
              <DropdownMenuItem
                key={guestNum}
                className={`hover:bg-greyHoverDropDownMenu rounded-none px-4 py-3 ${
                  guestNum === reservation.guests
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => onPartySizeChange(guestNum)} // Updates the state on click
              >
                <p>{guestNum}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function AreaDropdown({
  area,
  onAreaChange,
  onAddNewAddress,
}: {
  area: string;
  onAreaChange: (newArea: string) => void;
  onAddNewAddress: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2">
        <GoDotFill className="text-zinc-400 text-[19px]" />
        <span className="font-bold font-rubik text-white text-[19px]">
          {area}
        </span>
        <Button className="border border-greenBorderForIcon bg-transparent p-0 px-[1.5em] h-[2.9em] hover:bg-transparent rounded-full">
          <MdMyLocation className="size-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[250px] max-h-48 overflow-y-auto relative"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer and Edge
        }}
      >
        <DropdownMenuItem className="rounded-none select-none">
          <DropdownMenuLabel className="text-gray-400 font-thin">
            Actual location unavailable
          </DropdownMenuLabel>
        </DropdownMenuItem>
        {[
          "Tel Aviv-Jaffa area",
          "Jerusalem area",
          "Haifa area",
          "Center",
          "North",
          "South",
        ].map((location) => (
          <DropdownMenuItem
            key={location}
            className="hover:bg-greyHoverDropDownMenu"
            onClick={() => onAreaChange(location)}
          >
            <DropdownMenuLabel className="font-thin">
              {location}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="bg-greenButton flex gap-3 justify-center hover:bg-greenButtonDark text-center py-3 font-thin text-[1em] text-white cursor-pointer sticky bottom-0  font-rubik"
          onClick={onAddNewAddress}
        >
          <FaPlus />
          Add a new address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LandingPage() {
  const [reservation, setReservation] = useState<Reservation>({
    dateDay: "Friday",
    dateDayNumber: "23/08",
    time: "08:00",
    guests: 2,
    area: "Around you",
  });

  const handleAreaChange = (newArea: string) => {
    setReservation((prev) => ({ ...prev, area: newArea }));
  };

  const handlePartySizeChange = (newSize: number) => {
    setReservation((prev) => ({ ...prev, guests: newSize }));
  };
  const handleAddNewAddress = () => {
    console.log("Add a new address clicked");
    // Вы можете открыть модальное окно, перенаправить на другую страницу или выполнить другое действие
  };

  return (
    <>
      <section
        className="relative flex flex-col items-center py-[3em] min-w-[400px] lg:min-w-[450px] bg-cover bg-center shadow-inner"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.5) 60%, 
            rgba(0, 200, 200, 1) 100%
          ),
          url('https://tabitisrael.co.il/assets/images/dashboard-desktop.jpg?v=4_11_1')
        `,
          boxShadow: "inset 0 0 1rem #000",
        }}
      >
        <h1 className="lg:text-[3.55em] text-[2em] text-white font-rubik font-normal pt-14">
          Reserve a table!
        </h1>
        <p className="pb-4 text-white font-rubik px-[2.8em] lg:px-0 lg:text-[1.5em] w-[400px] lg:max-w-[450px] text-center">
          Just say when and which restaurant, and the rest is on us
        </p>

        <ReservationSelector
          reservation={reservation}
          onPartySizeChange={handlePartySizeChange}
        />

        <Button className="bg-greenButton text-black font-rubik font-bold w-[400px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3">
          Find a table
        </Button>

        <AreaDropdown
          area={reservation.area}
          onAreaChange={handleAreaChange}
          onAddNewAddress={handleAddNewAddress}
        />
      </section>

      <div className="bg-black">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 md:w-auto text-[2.25em] font-rubik text-white font-normal text-center md:flex-grow">
            Give the gift of good food
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-lg font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-[1em] font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 md:w-auto text-[2.25em] font-rubik text-white font-normal text-center md:flex-grow">
            Takeout or Delivery{" "}
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-lg font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-[1em] font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 md:w-auto text-[2.25em] font-rubik text-white font-normal text-center md:flex-grow">
            New Restaurants at Tabit
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-lg font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-[1em] font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 md:w-auto text-[2.25em] font-rubik text-white font-normal text-center md:flex-grow">
            Near Me{" "}
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-lg font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>

            <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center ">
              <img
                src="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
                alt="MASHAV Food Trucks"
                className="rounded-md h-[128px] w-full object-cover"
              />
              <div>
                <h3 className="text-[em] font-rubik pt-2 text-white font-normal">
                  MASHAV Food Trucks
                </h3>
                <p className="text-zinc-500">Bnei Brak</p>
              </div>
              <div>
                <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white py-2 px-4 rounded">
                  Get a gift card
                </Button>
                <Link to="#" className="block pt-2 text-greenButton underline">
                  More information
                </Link>
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <Link
              to="#"
              className="text-white flex items-center text-[1em] font-medium"
            >
              <p className="font-normal text-[1em] font-rubik self-center pt-2">
                Show More
              </p>
              <div className="flex items-center space-x-1 ml-2">
                <p
                  className="text-[3em] leading-none opacity-30"
                  style={{ color: "#b6e3e4" }}
                >
                  ›
                </p>
                <p
                  className="text-[3em] leading-none opacity-40"
                  style={{ color: "#6dc8ca" }}
                >
                  ›
                </p>
                <p className="text-[3em] leading-none text-greenButton opacity-80">
                  ›
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
