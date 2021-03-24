import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
		interviewersForDay: [],
	});
	useEffect(() => {
		Promise.all([
			axios.get("http://localhost:8001/api/days"),
			axios.get("http://localhost:8001/api/appointments"),
			axios.get("http://localhost:8001/api/interviewers"),
		])
			.then((data) => {
				setState((prev) => ({
					...prev,
					days: data[0].data,
					appointments: data[1].data,
					interviewers: data[2].data,
				}));
			})
			.catch((e) => console.log(e));
	}, []);
	function updateSpots(id, isBooking) {
    const days = [ ...state.days ];
    for (const day of days) {
      if (day.appointments.includes(id)) {
        (isBooking) ? day.spots-- : day.spots++;
      }
    }
    return days;
  }
	const bookInterview = (id, interview, isEdit) => {
		const newAppointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: newAppointment,
		};
		const days = isEdit ? [ ...state.days ] : updateSpots(id, true); 
		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => {
				return setState({
					...state,
					days,
					appointments,
				});
			});
	};
	
	const setDay = (day) => setState((prev) => ({ ...prev, day }));

	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		const days = updateSpots(id, false);
		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => {
				setState({ ...state, days, appointments });
			});
	};
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
