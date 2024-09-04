import { IoMdSearch } from "react-icons/io";
import PhoneInput from "./PhoneInput";

function ReservationForm() {
  return (
    <div className="w-full flex flex-col align-middle justify-center items-center">
      <div className="w-4/6 bg-greyNavbar text-center text-white my-5">
        <h1 className="text-xl">
          To complete the reservation, please fill in the following details.
        </h1>
        <div>{`You have ${"LeftTime"} minutes to complete the details`}</div>
      </div>
      <div className="w-4/6 my-4">
        <form className="grid grid-cols-2 w-full gap-x-3 gap-y-3 nx-4">
          <input
            type="text"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="firstName"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="lastName"
            placeholder="Last Name"
            required
          />
          <PhoneInput />
          {/* <div className="w-full flex">
            <input
              type="text"
              className="bg-transparent border-b-[1px] w-full border-greyHoverDropDownMenu"
              name="Phone"
              placeholder="First Name"
              required
            />
          </div> */}
          <input
            type="mail"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="text"
            className="bg-transparent col-span-2 border-b-[1px] border-greyHoverDropDownMenu"
            name="notes"
            placeholder="Notes"
          />
        </form>
      </div>
      <button className="flex bg-blueBtn px-4 py-3   w-52 rounded-full text-xl font-medium align-middle items-center justify-between my-4">
        <IoMdSearch className="w-6 h-6" /> Reserve
      </button>
    </div>
  );
}

export default ReservationForm;
