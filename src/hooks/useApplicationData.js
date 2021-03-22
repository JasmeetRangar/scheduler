import { useState, useEffect } from "react";
const axios = require("axios");

export default function useApplicationData() {
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
	const bookInterview = (id, interview) => {
		const newAppointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: newAppointment,
		};
		console.log("bookinterview: ", interview);
		//console.log("appointments: ", appointments);
		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => {
				return setState({
					...state,
					appointments,
				});
			});
	};
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
		interviewersForDay: [],
	});
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

		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => {
				setState({ ...state, appointments });
			});
	};
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
