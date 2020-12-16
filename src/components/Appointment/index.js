import React from "react";
import Empty from "./Empty";
import Error from "./Error";
import Header from './Header'
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import './styles.scss';


export default function Appointment(props) {
  const interviewerId = (props.interview && props.interview.interviewer)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteConfirm() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function deleteCancel() {
    transition(SHOW);
  };

  function showConfirm() {
    transition(CONFIRM);
  };

  function onEdit() {
    transition(CREATE);
  };

  function onClose() {
    back();
  };

  function getInterviewerName(id, list){
    for (const people of list) {
      if (people.id === id){
        return people.name;
      }
    }
  }

  return(
    <article 
      className="appointment"
      data-testid="appointment"
      >
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={(props.interview && props.interview.student)}
          interviewer={(interviewerId && getInterviewerName(interviewerId, props.interviewers))}
          showConfirm={showConfirm}
          onEdit={onEdit}
        />
      )}
      {mode === SAVING && <Status message="saving"/>}
      {mode === ERROR_SAVE && <Error message="There was an error saving your appointment" onClose={onClose}/>}
      {mode === DELETING && <Status message="deleting"/>}
      {mode === ERROR_DELETE && <Error message="There was an error deleting your appointment" onClose={onClose}/>}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you want to delete?' 
          deleteConfirm={deleteConfirm}
          deleteCancel={deleteCancel}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewer={(props.interview && props.interview.interviewer)} 
          name={(props.interview && props.interview.student)} 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save}
        />
      )}
    </article>
  );
}