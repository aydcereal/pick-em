import calsses from "./calendar.css";

const weekDates = [
  { week: 18, endDate: "2024-01-13T07:59Z" },
  { week: 17, endDate: "2024-01-03T07:59Z" },
  { week: 16, endDate: "2023-12-27T07:59Z" },
  { week: 15, endDate: "2023-12-20T07:59Z" },
  { week: 14, endDate: "2023-12-13T07:59Z" },
  { week: 13, endDate: "2023-12-06T07:59Z" },
  { week: 12, endDate: "2023-11-29T07:59Z" },
  { week: 11, endDate: "2023-11-22T07:59Z" },
  { week: 10, endDate: "2023-11-15T07:59Z" },
  { week: 9, endDate: "2023-11-08T07:59Z" },
  { week: 8, endDate: "2023-11-01T06:59Z" },
  { week: 7, endDate: "2023-10-25T06:59Z" },
  { week: 6, endDate: "2023-10-18T06:59Z" },
  { week: 5, endDate: "2023-10-11T06:59Z" },
  { week: 4, endDate: "2023-10-04T06:59Z" },
  { week: 3, endDate: "2023-09-27T06:59Z" },
  { week: 2, endDate: "2023-09-20T06:59Z" },
  { week: 1, endDate: "2023-09-13T06:59Z" },
];

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
  const dateObject = new Date(dates[0]);
  const dayOfWeek = dateObject.getDay();
  const today = new Date();
  let currentWeek;

  for (const weekDate of weekDates) {
    const endDate = new Date(weekDate.endDate);

    if (today < endDate) {
      currentWeek = weekDate.week;
    }
  }

  console.log(currentWeek);

  // Determine how many items to add based on the dayOfWeek
  const itemsToAdd = dayOfWeek;

  // Create a loop to add items to the beginning of the array
  for (let i = 1; i < itemsToAdd + 1; i++) {
    const newDate = new Date(dateObject);
    // Subtract i days to get previous days
    newDate.setDate(dateObject.getDate() - i);
    dates.unshift(newDate);
  }

  const lastDay = new Date(dates[dates.length - 1]); // 2/28
  const daysinMonth = dates.length; // 31
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (daysinMonth < 35) {
    const remainingDays = 35 - daysinMonth; // 4
    for (let i = 0; i < remainingDays; i++) {
      const newDate = new Date(lastDay);
      newDate.setDate(lastDay.getDate() + i + 1);
      dates.push(newDate);
    }
  }

  let daysOfMonth = [];

  for (const date of dates) {
    const dayOfMonth = new Date(date).getDate();
    const dayOfWeek = date.getDay();

    if (date.getDate() == today.getDate()) {
    }

    daysOfMonth.push({
      dayOfMonth,
      dayOfWeek: dayNames[dayOfWeek],
    });
  }

  return (
    <div className="responsive-calendar">
      <div className="day-headers">
        {weekDays.map((day) => {
          return <div className="day header">{day}</div>;
        })}
      </div>
      <div className="days">
        {daysOfMonth.map(({ dayOfMonth, dayOfWeek }) => {
          return (
            <div
              className={`day ${dayOfWeek} past`}
              style={{
                backfaceVisibility: "hidden",
                transition: "-webkit-transform 0.5s ease 0.02s",
                transform: "rotateY(0deg)",
              }}
            >
              <a>{dayOfMonth}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
