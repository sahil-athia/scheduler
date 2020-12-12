import React, { useState, useEffect } from "react";
// import { DayList } from './DayList.js'
import Appointment from './Appointment/index'
import DayList from './DayList'
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import useApplicationData from 'hooks/useApplicationData';




export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  console.log(state.days)
  
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)


  const spots = dailyAppointments.map((appointment) => {
    const interviews = getInterview(state, appointment.interview)
      return <Appointment
      key = {appointment.id}
      interview = {interviews}
      interviewers = {dailyInterviewers}
      bookInterview = {bookInterview}
      cancelInterview = {cancelInterview}
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
