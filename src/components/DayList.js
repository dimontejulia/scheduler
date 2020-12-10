import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  console.log("daylist props", props);
  const dayList = props.days.map((day, dayID) => {
    return (
      <DayListItem
        key={dayID}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{dayList}</ul>;
}
