import { Link } from "react-router-dom";

const ShowMore = () => {
  return (
    <Link to="#" className="text-white flex items-center text-lg font-medium">
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
        <p className="text-[3em] leading-none text-greenButton opacity-80">›</p>
      </div>
    </Link>
  );
};

export default ShowMore;
