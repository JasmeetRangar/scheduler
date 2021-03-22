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
const getInterview = (state, interview) => {
	console.log("getInterview: ", interview);
	const interviewers = { ...state.interviewers };
	if (!interview) return null;
	const interviewerId = interview.interviewer;
	for (const interviewer in interviewers) {
		if (interviewers[interviewer]["id"] === interviewerId) {
			return { ...interview, interviewer: interviewers[interviewer] };
		}
	}
	return null;
};
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
	console.log(results);
	return results;
};
export { getAppointmentsForDay, getInterview, getInterviewersForDay };
