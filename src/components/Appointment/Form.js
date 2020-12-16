import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [name, setName] = useState(props.name || ""); 
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset =  () => {
    setInterviewer(null)
    setName('')
    setError("")
  }

  const cancel = () => {
    props.onCancel()
    reset()
  }

  const validate = () => {
    if (!name && !interviewer) {
      setError("Please fill in name and select an interviewer")
      return;
    }
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(!interviewer) {
      setError("Please select an interviewer")
      return;
    }    
    props.onSave(name, interviewer);
    reset()
  }
  // error handling for no user name or interviewer selected

  return(
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name='name'
          type="text"
          placeholder={name || "Enter Student Name"}
          value={name}
          onChange={event => setName(event.target.value)}
          data-testid= "student-name-input"
        />
      <section className="appointment__validation">{error}</section> 
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>)
}