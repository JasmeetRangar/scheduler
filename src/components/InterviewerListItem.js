import React from "react";
import "./InterviewerListItem.scss";
let classnames = require("classnames");
export default function InterviewerListItem(props) {
  const InterviewerListItem = classnames("interviewers__item", {
    "interviewers__item--selected":props.selected,
  });
  const getName = () => {
  if(props.selected) {
    return props.name;
  } else {
    return null;
  }
}
  return <li className={InterviewerListItem} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {getName()}
</li>

}