const getAppointmentsForDay = (state, day) => {
  const days = [...state.days];
  const appointments = {...state.appointments};
  let results = [];
  const filteredDay = days.filter(element => element.name === day);
  const appointmentIds = (filteredDay.length !== 0) ? filteredDay[0].appointments : [];
  for (let appointment in appointments) {
    if (appointmentIds.includes(appointments[appointment].id)) {
      results.push(appointments[appointment]);
    }
  }

  return results;
}
const getInterview = (state, interview) => {
  const interviewers = { ... state.interviewers };
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  for (const interviewer in interviewers) {
    if (interviewers[interviewer]["id"] === interviewerId) {
      return { ... interview, interviewer: interviewers[interviewer] };
    }
  }
  return null;
}
export {getAppointmentsForDay, getInterview}