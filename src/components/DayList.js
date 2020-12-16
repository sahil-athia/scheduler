import React from "react";
import DayListItem from './DayListItem';

export default function DayList(props){
  const { days: daysArr } = props;
  // set the array to a variable and rename it 

  const days = daysArr.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  });

  return(
    <ul>
      {days}
    </ul>
  );
}