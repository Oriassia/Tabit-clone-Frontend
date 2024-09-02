import { IoMdSearch } from "react-icons/io";

function ReserveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex bg-blueBtn px-4 py-3   w-52 rounded-full text-xl font-medium align-middle items-center justify-between my-4"
    >
      <IoMdSearch className="w-6 h-6" /> Reserve a table
    </button>
  );
}

export default ReserveBtn;
