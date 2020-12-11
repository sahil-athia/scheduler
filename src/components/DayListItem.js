import React from "react";
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const formatSpots = (spots) => {
    const text = (spots === 1) ? 'spot' : 'spots'
    const number = spots ? spots : 'no'

    return `${number} ${text} remaining`
  }

  let dayClass = classNames({
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0),
    'day-list__item': true 
 });
  return (
    <li
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}