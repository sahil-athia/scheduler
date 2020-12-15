import React from "react";
import classNames from 'classnames';
import "./InterviewerListItem.scss";
import { prettyDOM } from "@testing-library/react";

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
      data-testid="interviewer"
    >
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}