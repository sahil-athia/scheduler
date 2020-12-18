import {useState, useEffect} from 'react';
import axios from 'axios';
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
  })
  
  useEffect(() => {
    Promise.all([
      axios.get(process.env.REACT_APP_GET_DAYS),
      axios.get(process.env.REACT_APP_GET_APPOINTMENTS),
      axios.get(process.env.REACT_APP_GET_INTERVIEWERS),
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(e => console.log(e));
  }, [])

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // create a new appontments array for the state

    const elementsIndex = state.days.findIndex(element => element.name === state.day );
    let days = [...state.days]
    days[elementsIndex] = {...days[elementsIndex], spots: days[elementsIndex].spots - 1};
    // edit the "spots" in the correct day in days array to keep track of spots

    return (
      axios
        .put(`http://localhost:8001/api/appointments/${id}`, {interview})
        .then(() => {
          const notOnEdit = !state.appointments[id].interview ? {...state, appointments, days } : {...state, appointments }
          // if a user it editing a pre-existing appointment, dont change days

          return setState(() => (notOnEdit));
        })
      );
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // create a new appontments array for the state
    
    const elementsIndex = state.days.findIndex(element => element.name === state.day )
    let days = [...state.days]
    days[elementsIndex] = {...days[elementsIndex], spots: days[elementsIndex].spots + 1}
    // edit the spots in the correct day in days array to keep track of spots

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState(() => ({...state, appointments, days })))
  }
    return {state, setDay, bookInterview, cancelInterview}
}
