import React from "react";
import classNames from 'classnames';
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let imgClass = classNames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected
 });

  let liClass = classNames('interviewers__item', {
  'interviewers__item--selected': props.selected
  });

  return(
    <li 
      className={liClass}
      onClick={props.setInterviewer}
    >
      <img
        className={imgClass}
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}