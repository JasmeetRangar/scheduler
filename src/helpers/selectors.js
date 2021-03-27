/**
 * 
 * @param {current state} state 
 * @param {day to fetch} day 
 * @returns All appointments for selected day
 */
const getAppointmentsForDay = (state, day) => {
	const days = [...state.days];
	const appointments = { ...state.appointments };
	let results = [];
	const filteredDay = days.filter((element) => element.name === day);
	const appointmentIds =
		filteredDay.length !== 0 ? filteredDay[0].appointments : [];
	for (let appointment in appointments) {
		if (appointmentIds.includes(appointments[appointment].id)) {
			results.push(appointments[appointment]);
		}
	}

	return results;
};
/**
 * 
 * @param {current state} state 
 * @param {} interview 
 * @returns if booking exists return interview
 */
const getInterview = (state, interview) => {
	if (interview === null) {
    return null
  } else {

    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
};
/**
 * 
 * @param {current state} state 
 * @param {selected day} day 
 * @returns All interviews for selected day 
 */
const getInterviewersForDay = (state, day) => {
	const days = [...state.days];
	const interviewers = { ...state.interviewers };
	let results = [];
	const filteredDay = days.filter((item) => item.name === day);
	const interviewerIds =
		filteredDay.length !== 0 ? filteredDay[0].interviewers : [];
	for (const interviewer in interviewers) {
		if (interviewerIds.includes(interviewers[interviewer].id)) {
			results.push(interviewers[interviewer]);
		}
	}
	return results;
};
export { getAppointmentsForDay, getInterview, getInterviewersForDay };
