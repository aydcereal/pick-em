import classes from "./calendar.css";
import weekEndDates from "./weekEndDates.json";
import MatchDates from "./MatchDates";
import { useEffect, useState } from "react";

export const getCurrentWeek = () => {
  const today = new Date();
  let currentWeek;

  for (const weekDate of weekEndDates) {
    const endDate = new Date(weekDate.endDate);

    if (today < endDate) {
      currentWeek = weekDate.week;
    }
  }
  return currentWeek;
};

const Calendar = () => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [matchDates, setMatchDates] = useState({});
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after the component has mounted
    setIsAnimated(true);
  }, []);

  function getDaysInMonth(month, year) {
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

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const dates = generateCalendar(currentMonth, currentYear);
  const dateObject = new Date(dates[0]);
  const dayOfWeek = dateObject.getDay();

  console.log(currentYear);

  let currentWeek = getCurrentWeek();

  useEffect(() => {
    let isMounted = true;

    const matchDatesPromise = MatchDates(currentWeek);

    matchDatesPromise
      .then((result) => {
        const updatedDaysOfMonth = dates.map((date) => {
          const dayOfMonth = date.getDate();
          const dayOfWeek = weekDays[date.getDay()];
          const month = date.getMonth();
          const year = date.getFullYear();
          const dateString = date.toLocaleDateString();
          const matchingValue = result[dateString];

          console.log(dateString);

          return {
            dayOfMonth,
            dayOfWeek,
            month,
            year,
            current: month === currentMonth,
            dateString,
            numberOfMatches: matchingValue !== undefined ? matchingValue : 0,
            active: matchingValue !== undefined ? "Active" : "",
          };
        });

        if (isMounted) {
          setDaysOfMonth(updatedDaysOfMonth);
          setMatchDates(result);
        }
      })
      .catch((error) => {
        console.error("Error fetching match dates:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWeek, currentMonth]);

  const itemsToAdd = dayOfWeek;

  for (let i = 1; i < itemsToAdd + 1; i++) {
    const newDate = new Date(dateObject);
    newDate.setDate(dateObject.getDate() - i);
    dates.unshift(newDate);
  }

  const lastDay = new Date(dates[dates.length - 1]);
  const daysinMonth = dates.length;

  if (daysinMonth < 42) {
    const remainingDays = 42 - daysinMonth;
    for (let i = 0; i < remainingDays; i++) {
      const newDate = new Date(lastDay);
      newDate.setDate(lastDay.getDate() + i + 1);
      dates.push(newDate);
    }
  }

  console.log(daysOfMonth);

  return (
    <>
      <div className="widgetHeader">Week {currentWeek} Games</div>
      <div className="responsive-calendar">
        <div className="day-headers">
          {weekDays.map((day) => {
            return <div className="day header">{day}</div>;
          })}
        </div>
        <div className="days">
          {daysOfMonth.map(
            ({ dayOfMonth, dayOfWeek, current, dateString, active }, index) => {
              let classes = `day past item-${
                index + 1
              } ${dayOfWeek} ${active} ${isAnimated ? "animate" : ""}`;

              if (!current) {
                classes += " not-current";
              }
              return (
                <>
                  <div className={classes}>
                    <span className="badge">{matchDates[dateString]}</span>
                    <a>{dayOfMonth}</a>
                  </div>
                </>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
