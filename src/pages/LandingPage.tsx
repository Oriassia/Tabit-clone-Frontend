import { useState } from "react";

function LandingPage() {
  const [date, setDate] = useState("Friday 8/23");
  const [time, setTime] = useState("08:00");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("Tel Aviv-Jaffa area");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Reservation submitted:", { date, time, guests, area });
  };

  return (
    <div className="reservation-form">
      <h1>Reserve a table!</h1>
      <p>Just say when and which restaurant, and the rest is on us</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Hour</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Find a table
        </button>
      </form>

      <div className="area-selection">
        <span>{area}</span>
        <button className="area-button">Change</button>
      </div>
    </div>
  );
}

export default LandingPage;
