import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import useVisualMode from "../hooks/useVisualMode";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "../helpers/selectors";

const axios = require("axios");

export default function Application(props) {
	const { transition } = useVisualMode();
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
		interviewersForDay: [],
	});
	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const setDay = (day) => setState((prev) => ({ ...prev, day }));
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
		console.log("appointments: ", appointments);
		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => {
				setState({
					...state,
					appointments,
				});
				console.log("after: ", state);
				//transition("SHOW");
			})
			.catch((e) => console.log(e));
	};

	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		axios
			.delete(`http://localhost:8001/api/appointments/${id}`, {
				interview: null,
			})
			.then(() => {
				setState({ ...state, appointments });
			})
			.catch(e => console.log(e));
	};
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
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{dailyAppointments.map((appointment) => {
					const interview = getInterview(state, appointment.interview);
					return (
						<Appointment
							key={appointment.id}
							id={appointment.id}
							time={appointment.time}
							interview={interview}
							interviewers={getInterviewersForDay(state, state.day)}
							bookInterview={bookInterview}
							cancelInterview={cancelInterview}
						/>
					);
				})}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
