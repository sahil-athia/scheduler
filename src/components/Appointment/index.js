import React from "react";
import Empty from "./Empty";
import Header from './Header'
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";


import './styles.scss'


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // console.log(props)
  // const interviewTrue = props.interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />
  
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    transition(SAVING)
    setTimeout(() => {
      const interview = {
        student: name,
        interviewer
      };
  
      props.bookInterview(props.id, interview)
      .then(transition(SHOW))
    }, 1000)

  }
  return(
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === SAVING && <Status message="saving"/>}
      {mode === CREATE && <Form interviewer={props.interviewer} interviewers={props.interviewers} onCancel={back} save={save}/>}
    </article>
  )
}