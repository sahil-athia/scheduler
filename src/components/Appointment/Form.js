import React, {useState} from 'react'
import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props) {
  const [name, setName] = useState(props.name || ''); 
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log(interviewer)
  const reset =  () => {
    setInterviewer(null)
    setName('')
  }

  const cancel = () => {
    props.onCancel()
    reset()
  }

  const save = () => {
    props.save(name, interviewer)
    reset()
  }
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
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
      </section>
    </section>
  </main>)
}