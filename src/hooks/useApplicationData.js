import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	//Set initial state
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
		interviewersForDay: [],
	});
	/**
	 * @param {appointment id} id
	 * @param {Boolean} isBooking
	 * @returns updated days with correct spots, -1 on new, +1 on delete, no change on edit
	 */
	function updateSpots(id, isBooking) {
		const days = [...state.days];
		// for (const day of days) {
		//   if (day.appointments.includes(id)) {
		//     (isBooking) ? day.spots-- : day.spots++;
		//   }
		// }

		return days;
	}
	/**
	 *
	 * @param {appointment id} id
	 * @param {*} interview
	 * @param {Boolean} isEdit
	 * @returns updated state after new/edit interview
	 */
	const bookInterview = (id, interview, isEdit) => {
		const newAppointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: newAppointment,
		};
		const days = isEdit ? [...state.days] : updateSpots(id, true);
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
	/**
	 * @param {appointment id} id
	 * @returns updated state after cancelled interview
	 */
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
	//Fetch data from API
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
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
