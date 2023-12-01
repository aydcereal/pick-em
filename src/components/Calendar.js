import calsses from "./calendar.css";

const Calendar = () => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function getDaysInMonth(month, year) {
    // Since in JavaScript, months are zero-based, we'll increment the month by 1
    return new Date(year, month + 1, 0).getDate();
  }

  function generateCalendar(month, year) {
    const daysInMonth = getDaysInMonth(month, year);
    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  }

  // Usage:
  const dates = generateCalendar(11, 2023); // December 2023
  dates.forEach((date) => console.log(date));

  return (
    <div className="responsive-calendar">
      <div className="day-headers">
        {weekDays.map((day) => {
          return <div className="day header">{day}</div>;
        })}
      </div>
      <div className="days"></div>
    </div>
  );
};

export default Calendar;
