import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
   let obj = useVisualMode(
      props.interview ? SHOW : EMPTY
   );
   console.log("Index: ", props);
   console.log("Mode: " ,obj.mode);
   //console.log("Transition: " , obj.transition);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		obj.transition(SAVING);
		props.bookInterview(props.id, interview)
      .then(() => obj.transition(SHOW))      
      //obj.transition(SHOW);
	}
	function deleteInterview() {
		obj.transition(DELETING);
		props.cancelInterview(props.id, transition)
		.then(() => obj.transition(EMPTY));
 }
	return (
		<article className="appointment">
			<Header time={props.time} />
			{obj.mode === EMPTY && <Empty onAdd={() => obj.transition(CREATE)} />}
			{obj.mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
				/>
			)}
			{obj.mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onCancel={() => obj.back()}
					onSave={save}
				/>
			)}
			{obj.mode === SAVING && <Status message="Saving" />}
		</article>
	);
}
