import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
   //console.log("Index: ", props);
   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
   function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
      props.bookInterview(props.id, interview);
	}
  return (
    <article className="appointment">
         <Header
            time={props.time}
         />
                  {mode === EMPTY && (
            <Empty
               onAdd={() => transition(CREATE)} 
            />
         )}
         {mode === SHOW && (
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer} 
            />
         )}
         {mode === CREATE && (
            <Form
               interviewers={props.interviewers}
               onCancel={() => back()}
               onSave={save}
            />
         )}
      </article>
  )
}