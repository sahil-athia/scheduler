import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';

import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  const { interviewers: interviwersArr } = props

  const interviewers = interviwersArr.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={event => props.onChange(interviewer.id)}
    />
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
// esure the prop passed is an aray

export default InterviewerList;