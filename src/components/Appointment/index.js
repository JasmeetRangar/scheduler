import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
export default function Appointment(props) {
	const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
	//console.log("Index: ", props);
	//console.log("Mode: ", mode);
	//console.log("Transition: " , transition);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		console.log("Looking: ", interview);
		props.bookInterview(props.id, interview).then(() => { 
			console.log("Booked: ", props.interview);
			transition(SHOW)})
			.catch(() => transition("ERROR_SAVE"));
		//transition(SHOW);
	}
	function deleteInterview() {
		transition(DELETING, true);
		//console.log("delete props: ", props);
		props.cancelInterview(props.id).then(() => transition(EMPTY))
		.catch(() => transition("ERROR_DELETE", true));
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
			{mode === SAVING && <Status message="Saving" />}
			{mode === DELETING && <Status message="Deleting" />}
			{mode === CONFIRM && (
				<Confirm
					message="Are you sure you want to delete this interview?"
					onCancel={back}
					onConfirm={deleteInterview}
				/>
			)}
			{mode === EDIT && (
				<Form
					interviewers={props.interviewers}
					name={props.interview.student}
					interviewer={props.interview.interviewer.id}
					onCancel={back}
					onSave={save}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error message="Could not save appointment" onClose={back} />
			)}
			{mode === ERROR_DELETE && (
				<Error message="Could not delete appointment" onClose={back} />
			)}
		</article>
	);
}
