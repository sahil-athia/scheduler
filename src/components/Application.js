import React, { useState, useEffect } from "react";
// import { DayList } from './DayList.js'
import Appointment from './Appointment/index'
import DayList from './DayList'
import axios from 'axios'
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";






export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(e => console.log(e))
  }, [])
  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  console.log(dailyInterviewers)

  const spots = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      interview={interview}
      interviewers={dailyInterviewers}
      {...appointment}
    />
    // ...appointment sends all the props outside of key in the array
  })


  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {spots}
      </section>
    </main>
  );
}
