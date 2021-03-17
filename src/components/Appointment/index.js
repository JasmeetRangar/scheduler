import React from "react";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header"
export default function Appointment(props) {
  const interview = props.interview;
  return (
    <article className="appointment">
        {props.time}
         <Header
            time={props.time}
         />
         {props.interview ?
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer} 
            /> : <Empty />}
      </article>
  )
}