import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
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
    

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const day = {
        ...state.days[id - 1],
        spots: state.days[id - 1].spots - 1
      }
      const days = [...state.days]
      days.splice((id-1), 1, day)

      return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        setState(() => ({...state, appointments, days}))
      })

    }

    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const day = {
        ...state.days[id - 1],
        spots: state.days[id - 1].spots + 1
      }
      const days = [...state.days]
      days.splice((id-1), 1, day)

      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(() => ({...state, appointments, days}))
      })
    }
    return {state, setDay, bookInterview, cancelInterview}
  }
