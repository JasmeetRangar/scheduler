import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
export default function Appointment(props) {
   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
  
  return (
    <article className="appointment">
        {props.time}
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
               interviewers={[]}
            />
         )}
      </article>
  )
}