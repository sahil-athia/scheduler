export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(currDay => currDay.name === day);
  // returns first match

  if (!dayFound){
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(currDay => currDay.name === day);

  if (!dayFound){
    return [];
  }

  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
};


export function getInterview(state, interview) {
  const interviewerObj = {};

  if (!interview) {
    return null;
  } else {
    interviewerObj["student"] = interview.student
    for (const interviewer in state.interviewers) {
      if (Number(interviewer) === interview.interviewer) {
        interviewerObj["interviewer"] = state.interviewers[Number(interviewer)]
      }
    }
  }
  return interviewerObj;
};