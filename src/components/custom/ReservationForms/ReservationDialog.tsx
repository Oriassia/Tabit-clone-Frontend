import WarningIcon from "../svg/WarningIcon";

function ReservationDialog() {
  return (
    <div>
      <WarningIcon />
      <h1>Oops...</h1>
      <p>
        More than 5 minutes have passed since your reservation was created and
        it has expired. Please create a new reservation
      </p>
      <p>For more assistance, please call the restaurant</p>
      <button>Create New Reservation</button>
      <a>Call Restaurant</a>
    </div>
  );
}

export default ReservationDialog;
